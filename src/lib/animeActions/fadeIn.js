import './fadeIn.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transferEeasing} from '../util';

export default function fadeIn($element, options) {
    return $element.hasClass('fade-in') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            return ready.then(function() {
                $element.css({
                    display: 'block',
                    opacity: 0
                });

                return new Promise(function(resolve, reject) {
                    $element.animate({
                        opacity: 1
                    }, {
                        duration: options.duration,
                        easing: transferEeasing(options.timingFunction),
                        complete: resolve
                    });
                });


                // return fa(options.duration, 
                //     options.timingFunction || 'easeIn',
                //     function(i1, i2) {
                //         $element.css({
                //             display: 'block',
                //             opacity: 1 * i2
                //         });
                //     }
                // ).play();
            });
        }
    )();
}