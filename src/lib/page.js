import './page.less';
import * as jQuery from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';

var $ = jQuery.noConflict();

var deferred = defer();
var pages = {};

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
    $root.append(page.render());

    var shown;
    pages[name] = {
        $root: $root,
        show: function() {
            if (!shown) {
                shown = Promise.resolve(page.show($root));
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
    'page_d', // 外观
    'page_aa', // 大灯前脸
    'page_ab', // 尾灯
    'page_b',  // 内饰
    'page_a', // 变速器
    'page_ad', // 天窗
    'page_e', // 空调
    'page_ac', // 轴距
    'page_f', // 后排
    'page_g', // 座椅
    'page_i', // 后备箱
    'page_j', // 油耗
    'page_k', // 换挡
    'page_ag', // 五星安全
    'page_af', // GOA车身
    'page_ae', // 主动安全配置
    'page_h' // 主动安全系统

]
export function indexOf(name) {
    return seq.indexOf(name);
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