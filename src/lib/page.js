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

    var $root = $(`<div id="${name}" class="page"></div>`);
    var $html = $(page.render());
    var renderPromise = [];

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
                renderPromise.push(promise);
            }
        }
    });

    $root.append($html);

    var shown;
    pages[name] = {
        $root: $root,
        show: function() {
            if (!shown) {
                shown = Promise.all(renderPromise).then(function(){
                    return page.show($root);
                });
            }
            return shown;
        }
    };

    ready().then(function($pages) {
        $pages.append($root);
        deferred.resolve();
    });

    return deferred.promise;
}

export function get(name) {
    return pages[name];
}

export function prev(name) {
    var i = indexOf(name);
    if (i > 0 && seq[i - 1]) {
        return seq[i - 1];
    }
}

export function next(name) {
    var i = indexOf(name);
    if (i > -1 && seq[i + 1]) {
        return seq[i + 1];
    }
}

export function has(name) {
    return !!pages[name];
}

export function show(name) {
    var page = get(name);
    return page.show();
}

var seq = [
    'home',   // 加载
    'page_c', // 首页
    // 外观组
    'page_d', // 外观
    'page_aa', // 大灯前脸
    'page_ab', // 尾灯
    // 内饰组
    'page_b',  // 内饰
    'page_a', // 变速器
    'page_e', // 空调
    // 空间组
    'page_ad', // 天窗
    'page_ac', // 轴距
    'page_f', // 后排
    'page_g', // 座椅
    'page_i', // 后备箱
    // 操控
    'page_j', // 油耗
    'page_k', // 换挡
    // 安全
    'page_ag', // 五星安全
    'page_af', // GOA车身
    'page_ae', // 主动安全配置
    'page_h' // 主动安全系统

]
export function indexOf(name) {
    return seq.indexOf(name);
}

export function fromIndex(i) {
    return seq[i];
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