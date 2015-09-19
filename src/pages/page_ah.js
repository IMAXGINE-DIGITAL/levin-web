import './page_ah.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_ah';

    return `
        <div class="el car" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car.jpg"/>
        </div>
        <div class="el lg rotate" style="${elementRect(196,189,225,581)}">
            <img src="${path}/lg.png"/>
        </div>
        <div class="el lg rotate" style="${elementRect(196,189,1019,585)}">
            <img src="${path}/lg.png"/>
        </div>
        <div class="el dl anime box-unfold" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/dl.png"/>
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(570,113,90,220)}">
            <span class="text_a" style="${elementRect(570,113,0,0,[570,113])}">F1空气动力学</span>
        </div>
    `;
}



export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
        return animation.get('.dl').animate({
                delay: 400,
                duration:400,
                'box-unfold':{
                    origin: ['100%', 0], 
                    angle:0
                }
            }) 
        })
        .then(function(item){
           return animation.get('.text').animate({
                delay: 400,
                duration:400
            })
        });
}
