import './page_d.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var path = 'images/page_d';

export function render() {
    return `
        <div class="bg">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="el car anime slide-in" style="${elementRect(1045,425,475,369)}">
            <img src="${path}/car.png" />
        </div>
        <div class="el eagle anime fly-in" style="${elementRect(643,200,149,162)}">
            <img src="${path}/eagle.png" />
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(627,153,83,349)}">
            <img src="${path}/text.png" />
            <span class="text_a" style="${elementRect(445,111,0,0,[627,153])}">新锐领潮</span>
            <span class="text_b" style="${elementRect(139,53,435,58,[627,153])}">的造型</span>
            <span class="text_c" style="${elementRect(320,41,0,111,[627,153])}">极具辨识度与独特存在感</span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car').animate({
            duration: 800,
            timingFunction: 'easeOut',
            'slide-in': {
                offset: '100%',
                from: 'right'
            }
        });
    }).then(function() {
        return animation.get('.eagle').animate({
            duration: 1000,
            timingFunction: [0,0,0,1],
            'fly-in': {
                from: 'right'
            }
        });
    }).then(function() {
        return animation.get('.text').animate({
            duration: 400
        });
    });
}