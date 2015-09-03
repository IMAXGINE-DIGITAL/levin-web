import './page_ac.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var path = 'images/page_ac';

export function render() {
    return `
        <div class="bg">
            <img src="${path}/bg.jpg">
        </div>
        <div class="el text anime fade-in" style="${elementRect(762,95,31,189)}">
            <img src="${path}/text.png"/>
        </div>
        <div class="el car1 anime box-unfold" style="${elementRect(1450,577,140,323)}">
            <img src="${path}/car1.jpg"/>
        </div>
        <div class="el light anime fade-in" style="${elementRect(355,82,255,177)}">
            <img src="${path}/light.png"/>
        </div>
        <div class="el number1 anime fade-in" style="${elementRect(568,288,29,105)}">
            1660mm
        </div>
        <div class="el circle anime fade-in" style="${elementRect(69,68,783,754)}">
            <img src="${path}/circle.png"/>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 200
            });
        }).then(function(item) {
            return animation.get('.car1').animate({
                duration: 800,
                delay: 400,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                }
            });
        }).then(function(item) {
            return animation.get('.circle').animate({
                duration: 600,
                delay: 200
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.number1').animate({
                    duration: 600,
                    delay: 200
                }),
                animation.get('.light').animate({
                    duration: 600,
                    delay: 200
                })
            ]);
        });
}