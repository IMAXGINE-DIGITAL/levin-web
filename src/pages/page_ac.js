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
        <div class="el text anime fade-in" style="${elementRect(762,95,31,189)}">
            <img src="${path}/text.png"/>
        </div>
        <div class="el car1 anime box-unfold" style="${elementRect(1450,577,140,323)}">
            <img src="${path}/car1.jpg"/>
        </div>
        <div class="el car2 anime box-unfold" style="${elementRect(1344,452,140,323)}">
            <img src="${path}/car2.jpg"/>
        </div>
        <div class="el light anime fade-in" style="${elementRect(355,82,255,177)}">
            <img src="${path}/light.png"/>
        </div>
        <div class="el number1 anime fade-in" style="${elementRect(568,288,29,105)}">
            1660mm
        </div>
        <div class="el range anime fade-in" style="${elementRect(554,68,783,754)}">
            <input type="range" value="0" min="0" max="100"/>
            <img src="${path}/circle.png" />
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
            var car2Action = animation.get('.car2')
                .action('box-unfold', {
                    origin: [0, 0],
                    angle: 0
                });

            var number1Action = animation.get('.number1')
                .action('number', {
                    from: 1660,
                    to: 2700,
                    format: '%04%03%02%01mm'
                });

            $page.find('.range input[type="range"]').rangeslider({
                polyfill: false,
                rangeClass: 'rangeslider',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',

                // Callback function
                onSlide: function(position, value) {
                    ready.promise.then(function() {
                        car2Action.frame(value / 100, value / 100);
                        number1Action.frame(value / 100, value / 100);
                    });
                },

                // Callback function
                onSlideEnd: function(position, value) {
                    ready.promise.then(function() {
                        if (value === 100) {
                            car2Action.done();
                            number1Action.done();

                            $page.find('.car1, .range').hide();

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
                            });
                        }
                    });
                }
            })
            
            $page.find('.range .rangeslider__handle')
                .append($page.find('.range img'));

            return animation.get('.range').animate({
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
        }).then(function() {
            return ready.resolve();
        });
}