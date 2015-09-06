import './number.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
'number': {
    from: 0, // 整数
    to: 100, // 整数
    format: '%3%02.%01%00' // %00代表输出一个0。%1为个位数，%2为十位数，以此类推，如果要补0，则为%01，%02等。
}
*/
export function get($element, options) {
    var numberOpt = options['number'] || {};
    var from = numberOpt.from || 0;
    var to = numberOpt.to || 100;
    var format = numberOpt.format || '%3%02.%01%00';
    var bits = format.match(/\%(0)?([0-9]+)/g);

    function getFormated(num) {
        var str = num + '';
        var newstr = format;
        bits.forEach(function(bit) {
            var n;
            if (bit === '%00') {
                n = '0';
            } else {
                var power = parseInt(bit.replace('%', ''));
                var n = parseInt(num % Math.pow(10, power) / Math.pow(10, power - 1));
                if (n === 0 && !bit.match(/^%0/)) {
                    n = '';
                } else {
                    n += '';
                }
                newstr = newstr.replace(new RegExp(bit), n);
            }
        });
        return newstr;
    }

    return {
        frame(i1, i2) {
            var num = parseInt(from + (to - from) * i2);

            $element.css({
                display: 'block'
            }).text(getFormated(num));
        },

        done() {}
    }
}

export default function number($element, options) {
    return $element.hasClass('number') && (
        function() {
            var {frame, done} = get($element, options);

            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }
            
            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'linear',
                    frame
                ).play();
            }).then(done);
        }
    )();
}