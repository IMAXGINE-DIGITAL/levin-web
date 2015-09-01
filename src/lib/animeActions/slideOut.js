import './slideOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
    'slide-out': {
        offset: '5%', //  增减的偏移量，0~100%,
        to: 'top' // top/bottom/left/right
    }
*/

const POS_MAP = {
    'top': ['top', -1],
    'bottom': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function slideIn($element, options) {
    return $element.hasClass('slide-out') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var slideOutOpt = options['slide-out'] || {};
            var offset = parseFloat(slideOutOpt.offset || '10%') / 100;
            var to = slideOutOpt.to || 'top';

            var elStyle = $element[0].style;
            var origin = {
                left: parseFloat(elStyle.left) / 100,
                top: parseFloat(elStyle.top) / 100
            };

            return ready.then(function() {
                var [prop, sign] = POS_MAP[to];

                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        $element.css({
                            [prop]: (origin[prop] + offset * i2 * sign) * 100 + '%'
                        });
                    }
                ).play();
            });
        }
    )();
}