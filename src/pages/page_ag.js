import './page_ag.less';
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
        <div class="el text anime fade-in text-wrap" style="${elementRect(594,301,12,556)}">
            <img src="${path}/bar.png"/>
            <span class="text_a" style="${elementRect(594,150,60,0,[594,301])}">周全呵护</span>
            <span class="text_b" style="${elementRect(594,100,60,150,[594,301])}">出发，然后从容到达</span>
            <span class="text_c" style="${elementRect(594,25,60,240,[594,301])}">
                雷凌配置顶级安全系统，让向前的每一步都从容。
            </span>
            <span class="text_c" style="${elementRect(594,25,60,265,[594,301])}">
                车体结构更坚固，主动安全和被动安全的设置更周全。
            </span>
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
