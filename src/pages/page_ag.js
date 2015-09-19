import './page_a.less';
import * as jQuery from 'jquery';
import {
    Promise, defer
}
from '../lib/promise';
import * as page from '../lib/page';
import {
    elementRect
}
from '../lib/util';
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
        <div class="el text anime fade-in" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/text.png"/>
        </div>
        <div class="el text_5star anime fade-in" style="${elementRect(1600,900,0,100)}">
            <img src="${path}/text_5star.png"/>
        </div>
    `;
}

export function show($page) {

    return $page.animation([{
            '.car2': {
                duration: 1000,
                delay: 300,
                timingFunction: 'bounceInOut'
            }
        },{
            '.text_5star': {
                delay:300,
                duration: 600
            }
        },{
            '.text': {
                delay: 300,
                duration: 600
            }
        }

    ]);

}
