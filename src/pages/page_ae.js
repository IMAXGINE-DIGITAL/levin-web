import './page_ae.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_ae';

    return `
        <div class="bg"><img src="${path}/car.jpg"></div>
        <div class="el car anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car2.jpg"/>
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(618,89,125,734)}">
            <span class="text_a" style="${elementRect(618,89,0,0,[618,89])}">准备万全，才够安全</span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return Promise.all([
                animation.get('.car').animate({
                    delay: 400,
                    duration:400
                }),
                animation.get('.text').animate({
                    delay: 400,
                    duration:400
                })
            ]);
        });
}