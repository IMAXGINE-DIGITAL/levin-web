import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_a';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el text anime fade-in" style="${elementRect(511,200,394,272)}">
            <img src="${path}/img_11.png">
        </div>
        <div class="el text-light anime box-unfold" style="${elementRect(356,82,603,356)}">
            <img src="${path}/img_14.png">
        </div>
        <div class="el shift anime box-unfold" style="${elementRect(499,182,556,685)}">
            <img src="${path}/img_15.png">
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 400
            });
        })
        .then(function(item) {
            return animation.get('.text-light').animate({
                duration: 400,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                }
            });
        })
        .then(function(item) {
            return animation.get('.shift').animate({
                duration: 600,
                'box-unfold': {
                    origin: [0, '100%'],
                    angle: 20
                }
            });
        });
}