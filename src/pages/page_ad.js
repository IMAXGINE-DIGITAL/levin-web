import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();
/**
 * 1760 × 977
 * 
 */
export function render() {
    var path = 'images/page_ad';

    return `        

         <div class="el tianchuang anime zoom" style="${elementRect(1600,900,-30,-38)}">
            <img src="${path}/tianchuang.jpg"/>
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
            return animation.get('.tianchuang').animate({
                duration:400,
                'zoom': {
                    from: '90%',
                    to: '100%'
                }
            })
        })

        .then(function(item) {
            return animation.get('.mask').animate({
                duration: 400
            });
        })

        
}