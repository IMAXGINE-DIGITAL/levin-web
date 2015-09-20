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
        <div class="el text anime fade-in text-wrap" style="${elementRect(614,134,904,713)}">
            <span class="text_a" style="${elementRect(614,80,0,0,[614,134])}">超大行李空间</span>
            <span class="text_b" style="${elementRect(614,40,0,104,[614,134])}">梦想再大，行囊再多，也能装载自如</span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return Promise.all([
                animation.get('.bag').animate({
                    duration: 600,
                    delay: 400
                }),
                animation.get('.text').animate({
                    duration: 600,
                    delay: 400
                })
            ]);
        });
}