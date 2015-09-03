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
            <div class="el goto-a" nav-to="2" style="${elementRect(251,250,66,327)}">
                <img src="${path}/goto_a.png">
            </div>
            <div class="el goto-b" nav-to="5" style="${elementRect(250,249,374,327)}">
                <img src="${path}/goto_b.png">
            </div>
            <div class="el goto-c" nav-to="8" style="${elementRect(250,250,681,327)}">
                <img src="${path}/goto_c.png">
            </div>
            <div class="el goto-d" nav-to="13" style="${elementRect(250,251,990,327)}">
                <img src="${path}/goto_d.png">
            </div>
            <div class="el goto-e" nav-to="15" style="${elementRect(250,251,1297,327)}">
                <img src="${path}/goto_e.png">
            </div>
            <div class="el top-menu-close" style="${elementRect(148,72,722,0)}">
                <img src="${path}/top-menu-close.png">
            </div>
        </div>
    `;
}

export function show() {
    ready().then(function($menu) {
        $menu.fadeIn();
    });
}

export function hide() {
    ready().then(function($menu) {
        $menu.fadeOut();
    });
}

export function navto() {
    return ready().then(function($menu) {
        return new Promise(function(resolve, reject) {
            $menu.on('click', '[nav-to]', function handler() {
                $menu.off('click', '[mav-to]', handler);
                hide();
                nav.show();
                resolve(parseInt($(this).attr('nav-to')));
            });
        });
    });
}

viewport.ready().then(function ($viewport) {
    var $menu = $(render());
    $viewport.append($menu);

    $menu.on('click', '.top-menu-close', function() {
        hide();
        nav.show();
    });

    deferred.resolve($menu);
});