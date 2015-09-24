import './page_ah.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_ah';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el car anime slide-in" style="${elementRect(1281,431,110,348)}">
            <img src="${path}/car.png"/>
        </div>
        <div class="el lg1 anime slide-in rotate" style="${elementRect(130,130,255,613)}">
            <img src="${path}/lg.png"/>
        </div>
        <div class="el lg2 anime slide-in rotate" style="${elementRect(138,138,1040,621)}">
            <img src="${path}/lg1.png"/>
        </div>
        <div class="el dl anime box-unfold" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/dl.png"/>
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(750,113,90,220)}">
            <span class="text_a" style="${elementRect(750,113,0,0,[750,113])}">
                与其追风，不如破风而行
            </span>
            <span class="text_b" style="${elementRect(750,30,0,83,[750,113])}">
                F1空气动力学设计，风阻系数只有0.29
            </span>
        </div>
    `;
}



export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
        return Promise.all([
                    animation.get('.car').animate({
                        duration: 600,
                        'slide-in': {
                            from: 'left',
                            offset: '50%'
                        }
                    }),
                    animation.get('.lg1').animate({
                        duration: 600,
                        'slide-in': {
                            from: 'left',
                            offset: '50%'
                        }
                    }),
                    animation.get('.lg2').animate({
                        duration: 600,
                        'slide-in': {
                            from: 'left',
                            offset: '50%'
                        }
                    })
                ]).then(function() {
                    $page.find('.car1').show();
                });
    }).then(function(item){
       return Promise.all([
            animation.get('.dl').animate({
                delay: 400,
                duration:400,
                'box-unfold':{
                    origin: ['100%', 0], 
                    angle: 0
                }
            }), 
            animation.get('.text').animate({
                delay: 400,
                duration:400
            })
        ]);
    });
}
