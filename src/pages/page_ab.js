import './page_ab.less';
import * as jQuery from 'jquery';
import {
    Promise, defer
}
from '../lib/promise';
import * as page from '../lib/page';
import {
    elementRect
}
from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();
/*
car 中间线811
车灯 218 1856
<div class="el mask anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/mask.png"/>
        </div>
 */
export function render() {
    var path = 'images/page_ab';

    return `
        <div class="wrap">
            <div class="el car anime" style="${elementRect(1600,900,0,0)}">
                <img src="${path}/car.jpg"/>
            </div>

            <div class="el car-gray anime fade-in" style="${elementRect(1600,900,0,0)}">
                <img src="${path}/car-gray.jpg"/>
            </div>

            <div class="el logo anime box-unfold" style="${elementRect(314,61,487,127)}">
                <img src="${path}/logo.png"/>
            </div>

            <div class="el light anime fade-in" style="${elementRect(1600,900,0,0)}">
                <img src="${path}/car-light.jpg"/>
            </div>

            <div class="el light2 anime fade-in" style="${elementRect(1600,900,0,0)}">
                <img src="${path}/car-light2.jpg"/>
            </div>

            <div class="el text anime fly-in text-wrap" style="${elementRect(478,157,1012,602)}">
                <img src="${path}/light.png"/>
                <span class="text_a" style="${elementRect(190,56,246,58,[478,157])}">LED灯泡</span>
                <span class="text_b" style="${elementRect(311,30,0,127,[478,157])}">即便是背影，也是范儿！</span>
            </div>

            <div class="el number-text anime number" 
                style="${elementRect(304,144,998,580)}">
            </div>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function(item) {
            return animation.get('.car-gray').animate({
                duration: 400
            })
        })
        .then(function(item) {
            return animation.get('.logo').animate({
                duration: 800,
                delay: 200,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                }
            });
        })
        .then(function(item) {
            return animation.get('.light').animate({
                duration: 400
            });
        })
        .then(function(item) {
            return animation.get('.light2').animate({
                duration: 400
            });
        })
        .then(function(item) {
            return animation.get('.text').animate({
                duration: 400,
                'fly-in': {
                    from: 'bottom'
                }
            });
        })
        .then(function(item) {
            $('.number-text').show();

            return animation.get('.number-text').animate({
                duration: 400,
                'number': {
                    from: 0,
                    to: 51,
                    format: '%02%01+' // %00代表输出一个0。%1为个位数，%2为十位数，以此类推，如果要补0，则为%01，%02等。
                }
            })
        })

}
