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

export function render(catId, length) {
    return ready().then(function($indicator) {
        if (catId === parseInt($indicator.attr('cat-id'))) {
            return;
        }

        var data = new Array(length).join(',').split(',');
        var items = `${repeat(data, renderItem)}`;

        $indicator.attr('cat-id', catId).html('').append(items);
        var elementHeight = $indicator.height();
        var windowHeight = $(window).height();
        $indicator.css({
            top: (windowHeight - elementHeight) / 2 + 'px'
        });
    });
}

export function highlight(index) {
    return ready().then(function($indicator) {
        $indicator.find('.highlight').removeClass('highlight');
        $indicator.find('.item:nth-child(' + (index + 1) + ')').addClass('highlight');
    });
}

export function navto() {
    return ready().then(function($indicator) {
        return new Promise(function(resolve, reject) {
            $indicator.on('click', '[index]', function handler() {
                $indicator.off('click', '[index]', handler);
                var catId = parseInt($indicator.attr('cat-id'));
                var index = parseInt($(this).attr('index'));
                resolve([catId, index]);
            });
        });
    });
}

export function init(length) {
    var $indicator = $('<div id="indicator"></div>');
    $(document.body).append($indicator);
    deferred.resolve($indicator);
}