import './page_e.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_e';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el wind anime box-unfold" style="${elementRect(1600,533,0,251)}">
            <img src="${path}/wind.png">
        </div>
        <div class="el text anime fade-in" style="${elementRect(621,154,820,712)}">
            <img src="${path}/text.png">
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.wind').animate({
                duration: 600,
                'box-unfold': {
                    origin: [0.36, 0],
                    angle: 12
                }
            });
        }).then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 300
            });
        });
}