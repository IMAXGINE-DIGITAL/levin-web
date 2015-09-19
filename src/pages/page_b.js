import './page_b.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_b';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el line1 anime box-unfold" style="${elementRect(642,598,39,167)}">
            <img src="${path}/line1.png">
        </div>
        <div class="el line2 anime box-unfold" style="${elementRect(671,39,560,220)}">
            <img src="${path}/line2.png">
        </div>
        <div class="el line3 anime box-unfold" style="${elementRect(489,186,722,411)}">
            <img src="${path}/line3.png">
        </div>
        <div class="el text anime fly-in text-wrap" style="${elementRect(571,178,957,501)}">
            <img src="${path}/light.png">
            <span class="text_a" style="${elementRect(429,130,0,0,[571,178])}">高质感</span>
            <span class="text_b" style="${elementRect(113,48,412,82,[571,178])}">内饰</span>
            <span class="text_c" style="${elementRect(571,34,0,144,[571,178])}">
                前卫直切式中控台，宽适乘坐质感，无需妥协
            </span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.line1').animate({
            duration: 300,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line1')
                .removeClass('box-unfold')
                .addClass('box-fold')
        });
    }).then(function() {
        return animation.get('.line1').animate({
            duration: 300,
            delay: 200,
            'box-fold': {
                origin: ['100%', 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line1').hide();
        });
    }).then(function() {
        return animation.get('.line2').animate({
            duration: 200,
            'box-unfold': {
                origin: ['100%', '100%'],
                angle: 0
            }
        }).then(function() {
            $page.find('.line2')
                .removeClass('box-unfold')
                .addClass('box-fold');
        });
    }).then(function() {
        return animation.get('.line3').animate({
            duration: 200,
            delay: 200,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line3')
                .removeClass('box-unfold')
                .addClass('box-fold');
        });
    }).then(function() {
        return animation.get('.line2').animate({
            duration: 200,
            'box-fold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line2').hide();
        })
    }).then(function() {
        return animation.get('.line3').animate({
            duration: 200,
            delay: 200,
            'box-fold': {
                origin: ['100%', 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line3').hide();
        });
    }).then(function() {
        return animation.get('.text').animate({
            duration: 400,
            timingFunction: 'easeOut',
            'fly-in': {
                from: 'bottom'
            }
        });
    });
}