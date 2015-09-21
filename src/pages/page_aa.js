import './page_aa.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_aa';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el car anime zoom" style="${elementRect(166,114,715,402)}">
            <img src="${path}/car.png"/>
        </div>
        <div class="el light-small anime flash" style="${elementRect(160,18.6,720,442)}">
            <img src="${path}/light.png"/>
        </div>
        <div class="el mask anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/mask.png"/>
        </div>
        <div class="el four-light anime fade-in" style="${elementRect(1600,532,0,298)}">
            <img src="${path}/four-light.png"/>
        </div>
        <div class="el grid anime box-unfold" style="${elementRect(1088,326,250,553)}">
            <img src="${path}/grid.png"/>
        </div>
        <div class="el line anime box-unfold" style="${elementRect(1438,277,75,248)}">
            <img src="${path}/line.png"/>
        </div>
        <div class="el light anime flash" style="${elementRect(1600,186,0,298)}">
            <img src="${path}/light.png"/>
        </div>
        <div class="el text anime text-wrap slide-in" style="${elementRect(669,154,300,209)}">
            <span class="text_a" style="${elementRect(667,100,0,0,[669,154])}">
                我的型，我的范
            </span>
            <span class="text_b" style="${elementRect(520,39,0,115,[669,154])}">
                够前卫，才能成为路上的焦点！
            </span>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            $page.find('.car').show();
            return animation.get('.light-small')
                .animate({
                    flash: {
                        loop: 1,
                        interval: 600
                    }
                }).then(function() {
                    $page.find('.light-small').hide();
                })
        }).then(function(item){
            return animation.get('.car')
                    .animate({
                        duration: 400,
                        delay: 300,
                        zoom: {
                            from: '100%',
                            to: '1000%'
                        }
                    });
        }).then(function(item) {
            return Promise.all([
                    animation.get('.mask')
                        .animate({
                            duration: 200
                        }),
                    animation.get('.four-light')
                        .animate({
                            duration: 300,
                            delay: 200,
                        }),
                    animation.get('.grid')
                        .animate({
                            duration: 300,
                            'box-unfold': {
                                origin: [0,0],
                                angle: 0
                            }
                        })
                ]);
        }).then(function() {
            return animation.get('.line')
                        .animate({
                            duration: 500,
                            delay: 100,
                            'box-unfold': {
                                origin: [0,0],
                                angle: 0
                            }
                        });
        }).then(function() {
            return Promise.all([
                        animation.get('.light')
                            .animate({
                                flash: {
                                    loop: 3,
                                    interval: 500
                                }
                            }),
                        animation.get('.text')
                            .animate({
                                duration: 400,
                                delay: 600,
                                timingFunction: 'easeOut',
                                'slide-in': {
                                    from: 'left',
                                    offset: '50%'
                                }
                            })
                    ]);
        });
        
}