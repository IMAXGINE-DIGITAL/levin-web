import './page_a.less';
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

        <div class="el text anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/text.png"/>
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