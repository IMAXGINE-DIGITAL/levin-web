import './fadeOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

export default function fadeOut($element, options) {
    return $element.hasClass('fade-out') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        $element.css({
                            display: 'block',
                            opacity: 1 - i2
                        });
                    }
                ).play();
            });
        }
    )();
}