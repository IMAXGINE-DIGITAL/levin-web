import './page_aa.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();
/*

1641,1133,-20,-110

car 1641 1133


(1641-1600)/2
 */
export function render() {
    var path = 'images/page_aa';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>

        <div class="el car anime zoom" style="${elementRect(164.1,113.3,724,400)}">
            <img src="${path}/car-total.png"/>
        </div>

        <div class="el car-light-small anime flash" style="${elementRect(158,51,726,440)}">
            <img src="${path}/car-light.png"/>
        </div>

        <div class="el mask anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/mask.png"/>
        </div>
        
        <div class="el car-light-big anime flash" style="${elementRect(1600,505,0,296)}">
            <img src="${path}/car-light.png"/>
        </div>

        <div class="el car-front anime box-unfold" style="${elementRect(1600,900,3,0)}">
            <img src="${path}/car-front.png"/>
        </div>

        <div class="el geshan anime box-unfold" style="${elementRect(1096,329,250,554)}">
            <img src="${path}/geshan.png"/>
        </div>
        
        <div class="el text anime fly-in text-wrap" style="${elementRect(669,154,225,160)}">
            <span class="text_a" style="${elementRect(669,95,0,0,[669,154])}">我的型，我的范</span>
            <span class="text_b" style="${elementRect(491,36,0,118,[669,154])}">够前卫，才能成为路上的焦点！</span>
        </div>


    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            $page.find('.car').show();
            return animation.get('.car-light-small').animate({
                duration:400
            }).then(function() {
                $page.find('.car-light-small').hide();
            });
            
        })

        .then(function(item){
           return animation.get('.car').animate({
                delay: 400,
                duration:400,
                'zoom': {
                    from: '100%',
                    to: '1000%'
                }
            })
             
        })

        .then(function(item){
            $('.car-light-small').hide();
        })

        .then(function(item) {
            return animation.get('.mask').animate({
                duration: 400
            });
        })
        .then(function(item){
            return animation.get('.car-front').animate({
                duration:400,
                'box-unfold':{
                    origin: [0, 0],
                    angle: 0
                }
            });
            
        })
        .then(function(item){
            return animation.get('.car-light-big').animate({
                duration:400
            });
        })
        .then(function(item){
            return animation.get('.geshan').animate({
                duration:400,
                'box-unfold':{
                    origin: [0, 0],
                    angle: 0
                }
            });
        })
        .then(function(item){
            return animation.get('.text').animate({
                duration:400,
                'fly-in':{
                    from: 'left'
                }
            });
        })

}