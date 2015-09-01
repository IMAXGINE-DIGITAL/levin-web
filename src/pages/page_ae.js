import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_ae';

    return `
        <div class="bg"><img src="${path}/car.jpg"></div>
        

        <div class="el car anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car2.jpg"/>
        </div>

        <div class="el text anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/text.png"/>
        </div>

       


    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.car').animate({
                duration:400
            })
        })
        .then(function(item){
            return animation.get('.text').animate({
                duration:400
            })
        })
        

}