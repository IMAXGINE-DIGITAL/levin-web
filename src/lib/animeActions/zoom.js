import './zoom.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';

/*
zoom: {
    zoom: '150%' // 比例，从0~无限
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
            var zoom = parseFloat(zoomOpt.zoom || '200%') / 100;

            return ready.then(function() {
                return fa(options.duration, 
                    options.timingFunction || 'easeIn',
                    function(i1, i2) {
                        var curWidth = originWidth * (1 + (zoom - 1) * i2);
                        var curHeight = originHeight * (1 + (zoom - 1) * i2);
                        var curLeft = originLeft - (curWidth - originWidth) / 2;
                        var curTop = originTop - (curHeight - originHeight) / 2;

                        $element.css({
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