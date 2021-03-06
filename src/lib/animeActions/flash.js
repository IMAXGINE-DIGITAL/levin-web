import './flash.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transferEeasing} from '../util';

/*
'flash': {
    loop: 4,   // 1~Infinity
    interval: 200 // ms
}
*/
export default function flash($element, options) {
    return $element.hasClass('flash') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var flashOpt = options['flash'] || {};
            var loop = flashOpt.loop || 2;
            var interval = flashOpt.interval || 200;

            function blink() {
                $element.css({
                    display: 'block',
                    opacity: 0
                });

                return (new Promise(function(resolve, reject) {
                    $element.animate({
                        opacity: 1
                    }, {
                        duration: interval / 2,
                        easing: transferEeasing(options.timingFunction),
                        complete: resolve
                    });
                })).then(function() {
                    $element.css({
                        display: 'block',
                        opacity: 1
                    });

                    return (new Promise(function(resolve, reject) {
                        $element.animate({
                            opacity: 0
                        }, {
                            duration: interval / 2,
                            easing: transferEeasing(options.timingFunction),
                            complete: resolve
                        });
                    }));
                });


                // return fa(interval / 2, 
                //     options.timingFunction || 'easeIn',
                //     function(i1, i2) {
                //         $element.css({
                //             opacity: 1 * i2
                //         });
                //     }
                // ).play()
                // .then(function() {
                //     return fa(interval / 2, 
                //         options.timingFunction || 'easeIn',
                //         function(i1, i2) {
                //             $element.css({
                //                 opacity: 1 * (1 - i2)
                //             });
                //         }
                //     ).play();
                // });
            }

            return ready.then(function() {
                if (loop === Infinity) {
                    void function circle() {
                        blink().then(circle);
                    }();
                    return true;
                } else {
                    var promise = blink();
                    for (var i = 0; i < loop - 1; i++) {
                        promise = promise.then(function() {
                            return blink();
                        });
                    }
                    promise.then(function() {
                        $element.css({
                            opacity: 1
                        });
                    });
                    return promise;
                }
            });
        }
    )();
}