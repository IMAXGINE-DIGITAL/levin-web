import './page_ad.less';
import $ from 'jquery';
import { Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_ad';

    return `        
        <div class="el bg">
            <img src="${path}/bg.jpg"/>
        </div>
        <div class="el kuang anime box-unfold" style="${elementRect(1420,655,0,161)}">
            <img src="${path}/kuang.png"/>
        </div>
        <div class="el blue1 anime box-unfold" style="${elementRect(1444,768,0,86)};">
            <img src="${path}/blue1.jpg"/>
        </div>
        <div class="el text anime box-unfold text-wrap" style="${elementRect(609,155,410,483)}">
            <img src="${path}/light.png"/>
            <span class="text_a" style="${elementRect(263,52,0,62,[609,155])}">比普通天窗大</span>
            <span class="text_c" style="${elementRect(608,34,0,129,[609,155])}">窄边框设计,采光充足,增强通透感和车辆空间感。</span>
        </div>
        <div class="el blue2 anime fade-in" style="${elementRect(1444,768,0,86)}">
            <img src="${path}/blue2.png"/>
        </div>
        <div class="el number1 anime number number-text" style="${elementRect(281,105,680,483)}">
            15%
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function(item) {
        return animation.get('.kuang').animate({
            duration: 400,
            delay: 200,
            'box-unfold': {
                origin: ['20%', 0],
                angle: 15
            }
        })
    }).then(function(item) {
        return animation.get('.blue1').animate({
            duration: 600,
            delay: 300,
            'box-unfold': {
                origin: ['30%', '20%'],
                angle: 15
            }
        })
    }).then(function(item) {
        return animation.get('.text').animate({
            duration: 400,
            delay: 200,
            'box-unfold': {
                origin: ['50%', '50%'],
                angle: 15
            }
        });
    }).then(function(item) {
        return Promise.all([
            animation.get('.blue2').animate({
                duration: 300,
                delay: 300
            }),
            animation.get('.number1').animate({
                duration: 300,
                delay: 300,
                number: {
                    from: 0,
                    to: 15,
                    format: '%02%01%'
                }
            })
        ]).then(function() {
            $page.find('.blue2').toggleClass('fade-in fade-out');
        })
    }).then(function(item) {
        return animation.get('.blue2').animate({
            duration: 300,
            delay: 100
        });
    });
}
