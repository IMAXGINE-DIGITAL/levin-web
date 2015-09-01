import './boxFold.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
'box-fold': {
    origin: [0, '100%'], //变化的原点，0~100%
    angle: 15 //变换的角度，0~360deg
}
*/
export default function boxfold($element, options) {
    return $element.hasClass('box-fold') && (
        function() {
            var elWidth = $element.width();
            var elHeight = $element.height();

            var $wrap = $('<div></div>');
            var $img = $element.find('img').css({
                width: elWidth + 'px',
                height: elHeight + 'px'
            });

            $wrap.append($img).appendTo($element);

            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var boxFoldOpt = options['box-fold'] || {};

            var originX = 0;
            var originY = 0;
            if (!!boxFoldOpt.origin) {
                originX = elWidth * parseFloat(boxFoldOpt.origin[0]) / 100;
                originY = elHeight * parseFloat(boxFoldOpt.origin[1]) / 100;
            }

            var t = 0;
            if (!!boxFoldOpt.angle) {
                t = Math.PI * 2 * boxFoldOpt.angle / 360;
            }
            var sinT = Math.sin(t).toFixed(5) + 0;
            var cosT = Math.cos(t).toFixed(5) + 0;
            var h = Math.max(elWidth / cosT, elHeight / sinT);

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        var width;
                        var height;

                        if (sinT == 0) {
                            width = elWidth * (1 - i2);
                            height = elHeight;
                        } else if (cosT == 0) {
                            width = elWidth;
                            height = elHeight * (1 - i2);
                        } else {
                            width = Math.min(h * (1 - i2) * cosT, elWidth);
                            height = Math.min(h * (1 - i2) * sinT, elHeight);
                        }
                        
                        var left = originX * i2;
                        var top = originY * i2;

                        $wrap.css({
                            width: width + 'px',
                            height: height + 'px',
                            left: left + 'px',
                            top: top + 'px'
                        });

                        $img.css({
                            left: -left + 'px',
                            top: -top + 'px'
                        });
                    }
                ).play();
            }).then(function() {
                $img.css({
                    width: '',
                    height: ''
                }).appendTo($element);
                $wrap.remove();
            });

            return ready;
        }
    )();
}