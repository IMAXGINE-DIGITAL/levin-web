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
        <div class="el text1 anime box-unfold" style="${elementRect(467,127,70,223)}">
            <img src="${path}/text1.png">
        </div>
        <div class="el trigle1 anime box-unfold" style="${elementRect(816,250,537,242)}">
            <img src="${path}/trigle1.png">
        </div>
        <div class="el trigle2 anime box-unfold" style="${elementRect(816,535,537,242)}">
            <img src="${path}/trigle2.png">
        </div>
        <div class="el text2 anime fade-in" style="${elementRect(352,124,323,454)}">
            <img src="${path}/text2.png">
        </div>
        <div class="el text3 anime fade-in" style="${elementRect(296,122,1165,209)}">
            <img src="${path}/text3.png">
        </div>
        <div class="el text4 anime fade-in" style="${elementRect(368,124,1029,731)}">
            <img src="${path}/text4.png">
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