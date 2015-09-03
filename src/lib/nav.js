import './nav.less';
import * as jQuery from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as menu from './menu';

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

var path = 'images/nav';

function render() {
    return `
        <div id="nav">
            <div class="el toyota-logo" style="${elementRect(292,23,35,25)}">
                <img src="${path}/toyota-logo.png">
            </div>
            <div class="el levin-logo" style="${elementRect(242,121,1331,36)}">
                <img src="${path}/levin-logo.png">
            </div>
            <div class="el top-menu" style="${elementRect(148,72,722,0)}">
                <img src="${path}/top-menu.png">
            </div>
        </div>
    `;
}

viewport.ready().then(function ($viewport) {
    var $nav = $(render());
    $viewport.append($nav);

    $nav.on('click', '.top-menu', function() {
        hide();
        menu.show();
    });

    deferred.resolve($nav);
});