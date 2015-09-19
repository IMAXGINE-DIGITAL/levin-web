import './page.less';
import $ from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as preloadImags from './preload';

var placeHolderImg = require('../../images/placeholder');

var deferred = defer();
var pages = {};

var a = $('<a></a>');
function getUrl(path) {
    return a.attr('href', path).attr('href');
}

export function ready() {
    return deferred.promise;
}

export function add(name) {
    var page = require('../pages/' + name);
    var deferred = defer();

    if (!page) {
        deferred.reject();
        return;
    }

    function render() {
        return ready().then(function($pages) {
            $pages.find(`#${name}`).remove();
            var $root = $(`<div id="${name}" class="page"></div>`);
            var $html = $(page.render());

            var promises = [];

            $html.find('img').each(function() {
                var $img = $(this);
                var src = getUrl($img.attr('src'));
                if (!src.match(/^data:image/) && 
                    $img.attr('preload') !== 'false') {

                    $img.attr('src', placeHolderImg);

                    var promise = preloadImags.done().then(function(images) {
                        if (images[src]) {
                            $img.replace(images[src]);
                        } else {
                            $img.attr('src', src);
                        }
                    });

                    if ($img.attr('lazyload') !== 'true') {
                        promises.push(promise);
                    }
                }
            });

            $root.append($html);
            $pages.append($root);

            return Promise.all(promises).then(function() {
                return $root;
            });
        });
    }

    // var shown;
    var rootDeferred;
    pages[name] = {
        root: function() {
            return rootDeferred.promise;
        },
        render: function() {
            rootDeferred = defer();

            return render().then(function($root) {
                rootDeferred.resolve($root);
            });

            return rootDeferred.promise;
        },
        show: function() {
            return rootDeferred.promise
                .then(function($root) {
                    return page.show($root);
                });
        }
    };

    deferred.resolve();
    return deferred.promise;
}

export function get(name) {
    return pages[name];
}

export function prev(name) {
    var i = indexOf(name);
    if (i > 0 && pageSeq[i - 1]) {
        return pageSeq[i - 1];
    }
}

export function next(name) {
    var i = indexOf(name);
    if (i > -1 && pageSeq[i + 1]) {
        return pageSeq[i + 1];
    }
}

export function has(name) {
    return !!pages[name];
}

export function show(name) {
    var page = get(name);
    return page.show();
}

var pageSeq = [
    'home',   // 0: 加载
    // 外观组
    'page_c', // 1:首页
    'page_d', // 外观
    'page_aa', // 大灯前脸
    'page_ab', // 尾灯
    'page_ah', // 空气导流
    // 内饰组
    'page_b',  // 6:内饰
    'page_ad', // 天窗
    'page_e', // 空调
    // 空间组
    'page_ac', // 9:轴距
    'page_f', // 后排
    'page_g', // 座椅
    'page_i', // 后备箱
    // 操控
    'page_j', // 13:油耗
    'page_a', // 变速器
    'page_k', // 换挡
    // 安全
    'page_ag', // 16:五星安全
    'page_af', // GOA车身
    'page_ae', // 主动安全配置
    'page_h' // 主动安全系统
];

var catSeq = [
    {name: '外观', period: [1, 5], index: 0},
    {name: '内饰', period: [6, 8], index: 1},
    {name: '轴距', period: [9, 12], index: 2},
    {name: '操控', period: [13, 15], index: 3},
    {name: '安全', period: [16, 19], index: 4}
];
export function indexOf(name) {
    return pageSeq.indexOf(name);
}

export function fromIndex(index) {
    return pageSeq[index];
}

export function length() {
    return pageSeq.length;
}

export function catFromPageIndex(index) {
    for (var i = 0; i < catSeq.length; i++) {
        if (index >= catSeq[i].period[0] && 
                index <= catSeq[i].period[1]) {
            return catSeq[i];
        }
    } 
}

export function pageFromCatIndex(index) {
    if (catSeq[index]) {
        return catSeq[index].period[0];
    }
}

export function IndexOfCat(name) {
    for (var i = 0; i < catSeq.length; i++) {
        if (catSeq[i].name === name) {
            return catSeq[i];
        }
    }
}

export function fromCatIndex(index) {
    return catSeq[index];
}

export function catLength() {
    return catSeq.length;
}

function render() {
    return `
        <div id="pages"></div>
    `;
}

viewport.ready().then(function ($viewport) {
    var $pages = $(render());
    $viewport.append($pages);
    deferred.resolve($pages);
});