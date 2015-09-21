import './page_af.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_af';

    return `
        <div class="el bg" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/bg.jpg"/>
        </div> 
        <div class="el car anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car.jpg"/>
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(780,117,51,192)}">
            <span class="text_a" style="${elementRect(780,70,0,0,[780,117])}">
                享誉全球的丰田独有GOA车身
            </span>
            <span class="text_b" style="${elementRect(780,20,0,70,[780,117])}">
                大量运用高抗拉强度钢板，打造轻量化、高强度车身。其中，门内
            </span>
            <span class="text_b" style="${elementRect(780,20,0,97,[780,117])}">
                防撞杆梁的抗拉强度高达1470兆帕，同级罕见。
            </span>
        </div>
        <div class="el goa anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/goa.png"/>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.car').animate({
                delay: 200,
                duration:400
            })
        })
        .then(function(item){
            return animation.get('.text').animate({
                delay:200,
                duration:400
            })
        })
        .then(function(item){
            return animation.get('.goa').animate({
                delay:200,
                duration:400
            })
        })
        

}