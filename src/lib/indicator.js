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
    return `<div class="item" cat-id="${index}"></div>`;
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
        $indicator.find('.item[cat-id="' + index + '"]').addClass('highlight');
    });
}

export function navto() {
    return ready().then(function($indicator) {
        return new Promise(function(resolve, reject) {
            $indicator.on('click', '[cat-id]', function handler() {
                $indicator.off('click', '[cat-id]', handler);
                resolve(parseInt($(this).attr('cat-id')));
            });
        });
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