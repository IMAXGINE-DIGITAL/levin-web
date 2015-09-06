import './zoom.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
zoom: {
    from: '150%', // 相对于元素的初始比例，从0~无限，默认100%
    to: '50%'     // 相对于元素的初始比例，从0~无限，默认100%
}
*/
export default function zoom($element, options) {
    return $element.hasClass('zoom') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var elStyle = $element[0].style;
            var originWidth = parseFloat(elStyle.width) / 100;
            var originHeight = parseFloat(elStyle.height) / 100 ;
            var originLeft = parseFloat(elStyle.left) / 100;
            var originTop = parseFloat(elStyle.top) / 100;
            var zoomOpt = options['zoom'] || {};
            var from = parseFloat(zoomOpt.from || '100%') / 100;
            var to = parseFloat(zoomOpt.to || '100%') / 100;

            var startWidth = originWidth * from;
            var startHeight = originHeight * from;
            var startLeft = originLeft - (startWidth - originWidth) / 2;
            var startTop = originTop - (startHeight - originHeight) / 2;        

            var endWidth = originWidth * to;
            var endHeight = originHeight * to;
            var endLeft = originLeft - (endWidth - originWidth) / 2;
            var endTop = originTop - (endWidth - originWidth) / 2;

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        var curWidth = startWidth + (endWidth - startWidth) * i2;
                        var curHeight = startHeight + (endHeight - startHeight) * i2;
                        // var curLeft = originLeft - (curWidth - startWidth) / 2;
                        // var curTop = originTop - (curHeight - originHeight) / 2;
                        var curLeft = startLeft + (endLeft - startLeft) * i2;
                        var curTop = startTop + (endTop - startTop) * i2;

                        $element.css({
                            display: 'block',
                            width: curWidth * 100 + '%',
                            height: curHeight * 100 + '%',
                            left: curLeft * 100 + '%',
                            top: curTop * 100 + '%'
                        });
                    }
                ).play();
            });
        }
    )();
}