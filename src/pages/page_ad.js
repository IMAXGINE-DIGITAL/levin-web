import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_ad';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        

         <div class="el zj anime box-unfold" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/zj.jpg"/>
        </div>
        <div class="el text anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/text.png"/>
        </div>

       


    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration:400
            })
        })
        
        .then(function(item){
            return animation.get('.zj').animate({
                duration:400,
                'zoom': {
                    zoom: 1000
                }
            })
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
            // return Promise.all([
            //     animation.get('.car-front').animate({
            //         duration: 400,
            //         'box-unfold':{
            //             origin: [0, 0],
            //             angle: 0
            //         }
            //     }),

            //     animation.get('.mask').animate({
            //         duration: 400
            //     })
            // ]);
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
                    direction: 'left'
                }
            });
        })

}