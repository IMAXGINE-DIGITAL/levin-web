import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();


/**
 * text :周全呵护
 * text1: 五星认证
 */
export function render() {
    var path = 'images/page_ag';

    return `
        
        <div class="el car" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car.jpg"/>
        </div>

        <div class="el car2 anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/car2.jpg"/>
        </div>

        <div class="el text anime slide-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/text.png"/>
        </div>
        <div class="el text2 anime slide-in" style="${elementRect(1600,900,0,0)}">

            <img src="${path}/text2.png"/>
        </div>


    `;
}

export function show($page) {

    
   var animation = $page.animation();

    return animation.then(function(item) {
            return animation.get('.car2').animate({
                duration:400
            })
        })
        .then(function(item){

            return animation.get('.text').animate({
                duration:400,
                timingFunction: 'bounceInOut',
                'slide-in':{
                  offset:'30%',
                  direction:'left'
                }
            })
        })
        .then(function(item){

            return animation.get('.text2').animate({
                duration:400,
                timingFunction: 'bounceInOut',
                'slide-in': {
                    offset: '30%',
                    direction: 'left'
                }

            })
        })
        


    // return $page.animation([
    //     {
    //         '.car2': {
    //             duration: 400,
    //             timingFunction: 'bounceInOut'
    //         }
    //     },
    //     {
    //         '.text': {
    //             duration: 400,
    //             'slide-in': {
    //                 offset: '55%',
    //                 direction: 'left'
    //             }
    //         }
    //     },
    //     {
    //         '.text2': {
    //             duration: 400,
    //             'slide-in':{
    //               direction: 'left',
    //               offset: '45%'
    //             }
    //         }
    //     }

    // ]);

}