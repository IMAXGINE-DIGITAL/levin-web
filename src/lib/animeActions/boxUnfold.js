import './boxUnfold.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
'box-unfold': {
    origin: [0, '100%'], //变化的原点，0~100%
    angle: 15 //变换的角度，0~360deg
}
*/
export function get($element, options) {
    var elWidth = $element.width();
    var elHeight = $element.height();

    var $wrap = $('<div></div>');
    var $img = $element.find('img').css({
        width: elWidth + 'px',
        height: elHeight + 'px'
    });

    $wrap.
        append($img).
        appendTo($element);

    var boxUnfoldOpt = options['box-unfold'] || {};

    var originX = 0;
    var originY = 0;
    if (!!boxUnfoldOpt.origin) {
        originX = elWidth * parseFloat(boxUnfoldOpt.origin[0]) / 100;
        originY = elHeight * parseFloat(boxUnfoldOpt.origin[1]) / 100;
    }

    var t = 0;
    if (!!boxUnfoldOpt.angle) {
        t = Math.PI * 2 * boxUnfoldOpt.angle / 360;
    }
    var sinT = Math.sin(t).toFixed(5) + 0;
    var cosT = Math.cos(t).toFixed(5) + 0;
    var h = Math.max(elWidth / cosT, elHeight / sinT);

    return { 
        frame(i1, i2) {
            var width;
            var height;

            if (sinT == 0) {
                width = elWidth * i2;
                height = elHeight;
            } else if (cosT == 0) {
                width = elWidth;
                height = elHeight * i2;
            } else {
                width = Math.min(h * i2 * cosT, elWidth);
                height = Math.min(h * i2 * sinT, elHeight);
            }
            
            var left = originX - originX * i2;
            var top = originY - originY * i2;

            $wrap.css({
                width: width + 'px',
                height: height + 'px',
                left: left + 'px',
                top: top + 'px'
            });

            $img.css({
                left: -left + 'px',
                top: -top + 'px'
            });
        },

        done() {
            $img.css({
                width: '100%',
                height: '100%'
            }).appendTo($element);
            $wrap.remove();
        }
    };
}

export default function boxUnfold($element, options) {
    return $element.hasClass('box-unfold') && (
        function() {
            var {frame, done} = get($element, options);

            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    frame
                ).play();
            }).then(done);
        }
    )();
}