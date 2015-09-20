import './page_g.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_g';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el shadow anime fade-in" style="${elementRect(368,23,514,857)}">
            <img src="${path}/shadow.png">
        </div>
        <div class="el text1 anime box-unfold text-wrap" style="${elementRect(467,187,70,223)}">
            <img src="${path}/light.png">
            <span class="text_c number-text" style="${elementRect(467,120,0,0,[467,187])}">6</span>
            <span class="text_d" style="${elementRect(467,120,70,50,[467,187])}">向电动调节座椅</span>
            <span class="text_e" style="${elementRect(467,60,0,127,[467,187])}">不同身高，一样惬意</span>
        </div>
        <div class="el trigle1 anime box-unfold" style="${elementRect(816,250,537,242)}">
            <img src="${path}/trigle1.png">
        </div>
        <div class="el trigle2 anime box-unfold" style="${elementRect(816,535,537,242)}">
            <img src="${path}/trigle2.png">
        </div>
        <div class="el text2 anime fade-in text-wrap" style="${elementRect(352,164,323,454)}">
            <span class="text_a number-text" style="${elementRect(352,120,0,0,[352,164])}">260mm</span>
            <span class="text_b" style="${elementRect(352,40,0,110,[352,164])}">前后滑动&nbsp;&nbsp;</span>
        </div>
        <div class="el text3 anime fade-in text-wrap" style="${elementRect(296,162,1165,209)}">
            <span class="text_a number-text" style="${elementRect(296,120,0,0,[296,162])}">83mm</span>
            <span class="text_b" style="${elementRect(296,40,0,110,[296,162])}">垂直调节&nbsp;&nbsp;</span>
        </div>
        <div class="el text4 anime fade-in text-wrap" style="${elementRect(368,164,1029,731)}">
            <span class="text_a number-text" style="${elementRect(368,120,0,0,[368,164])}">10mm/<b>个</b></span>
            <span class="text_b" style="${elementRect(368,40,0,110,[368,164])}">滑动锁点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div class="el seat anime fly-in" style="${elementRect(503,675,520,194)}">
            <img src="${path}/seat.png">
        </div>
        <div class="el seat-back1 anime fade-in" style="${elementRect(286,530,776,225)}">
            <img src="${path}/seat-back1.png">
        </div>
        <div class="el seat-back2 anime fade-in" style="${elementRect(333,487,800,269)}">
            <img src="${path}/seat-back2.png">
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.shadow').animate({
                duration: 400
            });
        }).then(function(item) {
            return animation.get('.seat').animate({
                duration: 700,
                timingFunction: 'easeOut',
                'fly-in': {
                    from: 'bottom'
                }
            }).then(function() {
                $page.find('.seat')
                    .removeClass('fly-in')
                    .addClass('slide-out')
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.seat').animate({
                    duration: 700,
                    delay: 400,
                    timingFunction: 'easeOut',
                    'slide-out': {
                        to: 'left',
                        offset: '3%'
                    }
                }),
                animation.get('.text2').animate({
                    duration: 700,
                    delay: 400
                })
            ]);
        }).then(function(item) {
            return Promise.all([
                animation.get('.seat-back1').animate({
                    duration: 400,
                    delay: 100
                }),
                animation.get('.seat-back2').animate({
                    duration: 400,
                    delay: 500
                }),
                animation.get('.trigle1').animate({
                    duration: 400,
                    delay: 100,
                    'box-unfold': {
                        origin: [0, '100%'],
                        angle: 20
                    }
                }),
                animation.get('.text3').animate({
                    duration: 400,
                    delay: 500
                })
            ]);
        }).then(function(item) {
            return animation.get('.trigle2').animate({
                duration: 600,
                delay: 300,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 80
                }
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.text4').animate({
                    duration: 400,
                    delay: 100
                }),
                animation.get('.text1').animate({
                    duration: 400,
                    delay: 100,
                    'box-unfold': {
                        origin: ['50%', '50%'],
                        angle: 0
                    }
                })
            ]);
        });
}