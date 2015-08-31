import './global.less';
import * as jQuery from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';

var $ = jQuery.noConflict();
var deferred = defer();

export function ready() {
    return deferred.promise;
}

var path = 'images';

function render() {
    return `
        <div id="global">
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
    var $global = $(render());
    $viewport.append($global);
    deferred.resolve($global);
});