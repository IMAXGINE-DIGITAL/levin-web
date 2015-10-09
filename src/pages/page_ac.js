import './page_ac.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';
import rangeslider from '../lib/rangeslider';
rangeslider($);

var path = 'images/page_ac';

export function render() {
    return `
        <div class="bg">
            <img src="${path}/bg.jpg">
        </div>
        <div class="el car1 anime box-unfold" style="${elementRect(1450,577,140,323)}">
            <img src="${path}/car1.jpg"/>
        </div>
        <div class="el car2 anime box-unfold" style="${elementRect(1450,577,140,323)}">
            <img src="${path}/car2.jpg"/>
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(762,95,31,239)}">
            <span class="text_a" style="${elementRect(762,60,0,0,[762,95])}">
                超长轴距
            </span>
            <span class="text_b" style="${elementRect(762,35,0,60,[762,95])}">
                媲美B级车，在车里尽情舒展
            </span>
        </div>
        <div class="el light anime fade-in" style="${elementRect(355,82,255,237)}">
            <img src="${path}/light.png"/>
        </div>
        <div class="el number1 anime fade-in number-text" style="${elementRect(568,288,29,155)}">
            2700mm
        </div>
        <div class="el rule anime fade-in" style="${elementRect(1115,86,247,776)}">
            <img src="${path}/rule.png"/>
        </div>
        <div class="el range anime fade-in" style="${elementRect(554,68,783,754)}">
            <input type="range" value="0" min="0" max="100" class="range-input"/>
            <img src="${path}/circle.png" />
        </div>
        <div class="el number2 anime fade-in text-wrap" style="${elementRect(554,30,770,704)}">
            <span class="anime number-text" style="${elementRect(120,30,0,0,[554,30])}">1600mm</span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    var ready = defer();
    
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
            return animation.get('.rule').animate({
                duration: 600,
                delay: 200
            });
        }).then(function(item) {
            var carAction = animation.get('.car2')
                    .action('box-unfold', {
                        origin: [0, 0],
                        angle: 0
                    });

            var numberAction = animation.get('.number2 span')
                    .action('number', {
                        from: 1660,
                        to: 2700,
                        format: '%04%03%02%01mm'
                    });

            var slideCompelte = false;
            $page.find('.range .range-input').rangeslider({
                polyfill: false,
                rangeClass: 'rangeslider',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',

                // Callback function
                onSlide: function(position, value) {
                    if (slideCompelte) {
                        $page.find('.car2')
                            .removeClass('box-fold')
                            .addClass('fade-in');

                        ready = defer();

                        animation.get('.car2').animate({
                            duration: 600
                        }).then(function() {
                            $page.find('.car1').show();

                            $page.find('.car2')
                                .removeClass('fade-in')
                                .addClass('box-unfold');

                            carAction = animation.get('.car2')
                                .action('box-unfold', {
                                    origin: [0, 0],
                                    angle: 0
                                });
                                
                            carAction.frame(1, 1);

                            ready.resolve();
                        });

                        slideCompelte = false;
                    }

                    ready.promise.then(function() {
                        carAction.frame(value / 100, value / 100);
                        numberAction.frame(value / 100, value / 100);
                        $page.find('.number2 span').css({
                            left: value + '%'
                        });
                    });
                },

                // Callback function
                onSlideEnd: function(position, value) {
                    ready.promise.then(function() {
                        if (value === 100) {
                            slideCompelte = true;

                            $page.find('.car1').hide();                           

                            $page.find('.car2')
                                .removeClass('box-unfold')
                                .addClass('box-fold');
                        
                            animation.get('.car2').animate({
                                duration: 800,
                                delay: 400,
                                'box-fold': {
                                    origin: ['100%', 0],
                                    angle: 0
                                }
                            }).then(function() {
                                $page.find('.car2').hide();
                                carAction.frame(0, 0);
                            });
                        }
                    });
                }
            })
            
            $page.find('.range .rangeslider__handle')
                .append($page.find('.range img'));

            return Promise.all([
                animation.get('.range').animate({
                    duration: 600,
                    delay: 200
                }),
                animation.get('.number2').animate({
                    duration: 600,
                    delay: 200
                })
            ]);
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
        }).then(function() {
            return ready.resolve();
        });
}