import './flyOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
'fly-out': {
    direction: 'up' // up/down/left/right
}
*/
const POS_MAP = {
    'up': ['top', -1],
    'down': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function flyOut($element, options) {
    return $element.hasClass('fly-out') && (
        function() {
            var elWidth = $element.width();
            var elHeight = $element.height();

            var $img = $element.find('img');
            var $wrap = $('<div></div>')
                    .append($img)
                    .appendTo($element);

            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var flyOutOpt = options['fly-out'] || {};
            var direction = flyOutOpt.direction || 'up';

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        var [prop, sign] = POS_MAP[direction];

                        $wrap.css({
                            display: 'block',
                            [prop]: i2 * sign * 100 + '%'
                        });
                    }
                ).play();
            }).then(function() {
                $img.appendTo($element);
                $wrap.remove();
            });

            return ready;
        }
    )();
}