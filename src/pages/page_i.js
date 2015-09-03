import './page_i.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_i';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el bag anime fade-in" style="${elementRect(893,530,359,126)}">
            <img src="${path}/bag.jpg">
        </div>
        <div class="el text anime fade-in" style="${elementRect(614,84,904,713)}">
            <img src="${path}/text.png">
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.bag').animate({
                duration: 600,
                delay: 400
            });
        }).then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 200
            });
        });
}