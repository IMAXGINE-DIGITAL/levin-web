import './page_h.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_h';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(1036,113,98,232)}">
            <img src="${path}/bar.gif">
            <span class="text_a" style="${elementRect(1036,60,0,5,[1036,113])}">
                博世第9代ABS+EBD+EBA+TRC+VSC主动安全系统
            </span>
            <span class="text_b" style="${elementRect(1036,60,0,70,[1036,113])}">
                先进的安全驾驶系统，并对刹车系统定向调教，实现最佳制动感。
            </span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 300
            });
        });
}