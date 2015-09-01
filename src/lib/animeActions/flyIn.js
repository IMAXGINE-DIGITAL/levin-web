import './flyIn.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
'fly-in': {
    from: 'top' // top/bottom/left/right
}
*/
const POS_MAP = {
    'top': ['top', -1],
    'bottom': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function flyIn($element, options) {
    return $element.hasClass('fly-in') && (
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

            var flyInOpt = options['fly-in'] || {};
            var from = flyInOpt.from || 'top';

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        var [prop, sign] = POS_MAP[from];
                        $wrap.css({
                            display: 'block',
                            [prop]: (1 - i2) * sign * 100 + '%'
                        });
                    }
                ).play();
            }).then(function() {
                $img.css({
                    display: 'block'
                }).appendTo($element);
                $wrap.remove();
            });

            return ready;
        }
    )();
}