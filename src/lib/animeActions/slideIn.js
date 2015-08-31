import './slideIn.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
    'slide-in': {
        offset: '5%', //  增减的偏移量，0~100%,
        direction: 'up' // up/down/left/right
    }
*/

const POS_MAP = {
    'up': ['top', -1],
    'down': ['top', 1],
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
            var direction = slideInOpt.direction || 'up';

            var elStyle = $element[0].style;
            var origin = {
                left: parseFloat(elStyle.left) / 100,
                top: parseFloat(elStyle.top) / 100
            };

            return ready.then(function() {
                var prop = POS_MAP[direction][0];
                var sign = POS_MAP[direction][1];

                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        $element.css({
                            [prop]: (origin[prop] + offset * (1 - i2) * sign) * 100 + '%'
                        });
                    }
                ).play();
            });
        }
    )();
}