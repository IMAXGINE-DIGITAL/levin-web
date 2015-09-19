import './page_f.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_f';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(581,117,106,222)}">
            <span class="text_a" style="${elementRect(581,80,0,0,[581,117])}">
                媲美B级后车排
            </span>
            <span class="text_b" style="${elementRect(581,30,0,87,[581,117])}">
                地台平整化设计，身心尽情舒展
            </span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 400
            });
        });
}