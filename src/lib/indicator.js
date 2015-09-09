import './indicator.less';
import $ from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';

var deferred = defer();

export function ready() {
    return deferred.promise;
}

export function show() {
    ready().then(function($indicator) {
        $indicator.css({
            visibility: 'visible'
        });
    });
}

export function hide() {
    ready().then(function($indicator) {
        $indicator.css({
            visibility: 'hidden'
        });
    });
}

var path = 'images/nav';

function repeat(data, tpl) {
    return data.map(tpl).join('');
}

function renderItem(val, index) {
    return `<div class="item" index="${index}"></div>`;
}

function render(length) {
    var data = new Array(length).join(',').split(',');
    return `
        <div id="indicator">
            ${repeat(data, renderItem)}
        </div>
    `;
}

export function highlight(index) {
    ready().then(function($indicator) {
        $indicator.find('.highlight').removeClass('highlight');
        $indicator.find('.item:nth-child(' + index + ')').addClass('highlight');
    });
}

export function init(length) {
    var $indicator = $(render(length));
    
    $(document.body).append($indicator);

    var elementHeight = $indicator.height();
    var windowHeight = $(window).height();
    $indicator.css({
        top: (windowHeight - elementHeight) / 2 + 'px'
    });

    deferred.resolve($indicator);
}