import './slideIn.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
    'slide-in': {
        offset: '5%', //  增减的偏移量，0~100%,
        from: 'top' // top/bottom/left/right
    }
*/

const POS_MAP = {
    'top': ['top', -1],
    'bottom': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function slideIn($element, options) {
    return $element.hasClass('slide-in') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var slideInOpt = options['slide-in'] || {};
            var offset = parseFloat(slideInOpt.offset || '10%') / 100;
            var from = slideInOpt.from || 'top';

            var elStyle = $element[0].style;
            var origin = {
                left: parseFloat(elStyle.left) / 100,
                top: parseFloat(elStyle.top) / 100
            };

            return ready.then(function() {
                var prop = POS_MAP[from][0];
                var sign = POS_MAP[from][1];

                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        $element.css({
                            display: 'block',
                            [prop]: (origin[prop] + offset * (1 - i2) * sign) * 100 + '%'
                        });
                    }
                ).play();
            });
        }
    )();
}