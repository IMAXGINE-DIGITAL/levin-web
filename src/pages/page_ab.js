import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();
/*
car 中间线811
车灯 218 1856
 */
export function render() {
    var path = 'images/page_ab';

    return `
        <div class="el car anime" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car.jpg"/>
        </div>

        <div class="el logo anime box-unfold" style="${elementRect(277,59,386,172)}">
            <img src="${path}/logo.png"/>
        </div>

        <div class="el light anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/light.png"/>
        </div>

        <div class="el light2 anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/light2.png"/>
        </div>

        <div class="el mask anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/mask.png"/>
        </div>

        <div class="el text1 anime fly-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/text.png"/>
        </div>
        

    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.mask').animate({
                duration:400
            })
        })
        .then(function(item){
            return animation.get('.logo').animate({
                duration:400,
                'box-unfold':{
                    origin: [0, 0],
                    angle: 0
                }
            });
        })
        .then(function(item){
            return animation.get('.light2').animate({
                duration:400
            });
        })
        .then(function(item){
            return animation.get('.light').animate({
                duration:400
            });
        })
        .then(function(item){
            return animation.get('.text1').animate({
                duration:400,
                'fly-in':{
                    direction: 'left'
                }
            });
        })

}