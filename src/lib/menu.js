import './menu.less';
import * as jQuery from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as nav from './nav';

var $ = jQuery.noConflict();
var deferred = defer();

export function ready() {
    return deferred.promise;
}

var path = 'images/menu';

function render() {
    return `
        <div id="menu">
            <div class="wrap">
                <div class="el goto-a" cat-id="0" style="${elementRect(251,250,66,327)}">
                    <img src="${path}/goto_a.png">
                </div>
                <div class="el goto-b" cat-id="1" style="${elementRect(250,249,374,327)}">
                    <img src="${path}/goto_b.png">
                </div>
                <div class="el goto-c" cat-id="2" style="${elementRect(250,250,681,327)}">
                    <img src="${path}/goto_c.png">
                </div>
                <div class="el goto-d" cat-id="3" style="${elementRect(250,251,990,327)}">
                    <img src="${path}/goto_d.png">
                </div>
                <div class="el goto-e" cat-id="4" style="${elementRect(250,251,1297,327)}">
                    <img src="${path}/goto_e.png">
                </div>
                <div class="el top-menu-close" style="${elementRect(148,72,722,0)}">
                    <img src="${path}/top-menu-close.png">
                </div>
            </div>
        </div>
    `;
}

export function show() {
    ready().then(function($menu) {
        $menu.fadeIn(function() {
            $menu.css({
                opacity: '',
                display: 'block'
            });
        })
    });
}

export function hide() {
    ready().then(function($menu) {
        $menu.fadeOut(function() {
            $menu.css({
                opacity: '',
                display: 'none'
            });
        });
    });
}

export function navto() {
    return ready().then(function($menu) {
        return new Promise(function(resolve, reject) {
            $menu.on('click', '[cat-id]', function handler() {
                $menu.off('click', '[cat-id]', handler);
                hide();
                nav.show();
                resolve(parseInt($(this).attr('cat-id')));
            });
        });
    });
}

const WIDTH =  1600;
const HEIGHT = 900;
function resizeHandler($menu) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var wRatio = WIDTH / width;
    var hRatio = HEIGHT / height;
    var ratio = Math.max(wRatio, hRatio);

    var rWidth = WIDTH / ratio;
    var rHeight = HEIGHT / ratio;
    $menu.find('.wrap').css({
        width: rWidth,
        height: rHeight
    });
}

viewport.ready().then(function ($viewport) {
    var $menu = $(render());
    $(document.body).append($menu);

    $(window).on('resize', function() {
        resizeHandler($menu);
    });

    $menu.on('click', '.top-menu-close', function() {
        hide();
        nav.show();
    });

    resizeHandler($menu);

    deferred.resolve($menu);
});