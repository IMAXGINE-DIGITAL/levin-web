import './flyOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transferEeasing} from '../util';

/*
'fly-out': {
    to: 'top' // top/bottom/left/right
}
*/
const POS_MAP = {
    'top': ['top', -1],
    'bottom': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function flyOut($element, options) {
    return $element.hasClass('fly-out') && (
        function() {
            var elWidth = $element.width();
            var elHeight = $element.height();

            var $children = $element.children();
            var $wrap = $('<div></div>')
                    .append($children)
                    .appendTo($element);

            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var flyOutOpt = options['fly-out'] || {};
            var to = flyOutOpt.to || 'up';

            return ready.then(function() {
                var [prop, sign] = POS_MAP[to];

                $wrap.css({
                    display: 'block',
                    [prop]: 0
                });

                return new Promise(function(resolve, reject) {
                    $wrap.animate({
                        [prop]: sign * 100 + '%'
                    }, {
                        duration: options.duration,
                        easing: transferEeasing(options.timingFunction),
                        complete: resolve
                    });
                });
            }).then(function() {
                $children.appendTo($element);
                $wrap.remove();
            });

            return ready;
        }
    )();
}