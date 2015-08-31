import './viewport.less';
import * as jQuery from 'jquery';
import {Promise, domReady, defer} from '../lib/promise';

var $ = jQuery.noConflict();
var deferred = defer();

export function ready() {
    return deferred.promise;
}

var $win = $(window);
var $doc = $(document);
var $body;
var $viewport;
var size;
var vw;
var vh;
var resizeHandlers = [];
export function onresize(fn) {
    $(document).on('viewport:resize', fn);
}

function resize(e) {
    var width = $win.width();
    var height = $win.height();

    var wRatio = vw / width;
    var hRatio = vh / height;
    var ratio;

    if (size === 'contain') {
        ratio = Math.max(wRatio, hRatio);
    } else if (size === 'cover') {
        ratio = Math.min(wRatio, hRatio);
    } else {
        ratio = 1;
    }

    var rWidth = vw / ratio;
    var rHeight = vh / ratio;
    var rLeft = ((width - rWidth) / 2).toFixed(3);
    var rTop = ((height - rHeight) / 2).toFixed(3);

    $viewport.css({
        width: rWidth + 'px',
        height: rHeight + 'px',
        left: rLeft + 'px',
        top: rTop + 'px'
    });

    if (e !== false) {
        resizeHandlers.forEach(function (fn) {
            $(document).trigger('viewport:resize');
        });
    }
}

domReady().then(function () {
    $body = $('body');
    $viewport = $('body > #viewport');

    var vp = $body.attr('viewport') || [width, height].join(',');
    vp = vp.split(/\s*,\s*/).map(function(i) {return parseInt(i)});
    vw = vp[0];
    vh = vp[1];

    size = $body.attr('size') || 'contain';

    $(window).on('resize', resize);
    resize(false);

    deferred.resolve($viewport);
});


