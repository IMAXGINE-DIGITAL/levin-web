import './nav.less';
import * as jQuery from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as menu from './menu';

var _elementRect = function(w, h, l, t) {
    return elementRect(w, h, l, t, [1600, 121]);
}

var $ = jQuery.noConflict();
var deferred = defer();

export function ready() {
    return deferred.promise;
}

export function show() {
    ready().then(function($nav) {
        $nav.fadeIn();
    });
}

export function hide() {
    ready().then(function($nav) {
        $nav.fadeOut();
    });
}

export function setMenuText(text) {
    ready().then(function($nav) {
        $nav.find('.top-menu span').text(text);
    });
}

var path = 'images/nav';

function render() {
    return `
        <div id="nav">
            <div class="wrap">
                <div class="el toyota-logo" style="${_elementRect(291,25,35,25)}">
                    <img src="${path}/toyota-logo.png">
                </div>
                <div class="el levin-logo" style="${_elementRect(242,121,1331,36)}">
                    <img src="${path}/levin-logo.png">
                </div>
                <div class="el top-menu text-wrap" style="${_elementRect(148,72,722,0)}">
                    <img src="${path}/top-menu.png">
                    <span>首页</span>
                </div>
            </div>
        </div>
    `;
}


const WIDTH =  1600;
const HEIGHT = 121;
function resizeHandler($nav) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var wRatio = WIDTH / width;
    // var hRatio = HEIGHT / height;
    // var ratio = Math.max(wRatio, hRatio);

    var rWidth = WIDTH / wRatio;
    var rHeight = HEIGHT / wRatio;
    $nav.find('.wrap').css({
        width: rWidth,
        height: rHeight
    });
}

viewport.ready().then(function ($viewport) {
    var $nav = $(render());
    $(document.body).append($nav);

    $(window).on('resize', function() {
        resizeHandler($nav);
    });

    $nav.on('click', '.top-menu', function() {
        hide();
        menu.show();
    });

    resizeHandler($nav);

    deferred.resolve($nav);
});