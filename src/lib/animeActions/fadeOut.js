import './fadeOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transferEeasing} from '../util';

export default function fadeOut($element, options) {
    return $element.hasClass('fade-out') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            return ready.then(function() {
                $element.css({
                    display: 'block',
                    opacity: 1
                });

                return new Promise(function(resolve, reject) {
                    $element.animate({
                        opacity: 0
                    }, {
                        duration: options.duration,
                        easing: transferEeasing(options.timingFunction),
                        complete: function() {
                            $element.css({
                                opacity: ''
                            }).removeClass('fade-out');
                            resolve();
                        }
                    });
                });
            });
        }
    )();
}