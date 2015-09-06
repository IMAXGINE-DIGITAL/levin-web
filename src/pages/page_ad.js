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
 * 1760 × 977

 */
export function render() {
    var path = 'images/page_ad';

    return `        

        <div class="el bg" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/tianchuang.jpg"/>
        </div>

        <div class="el tianchuang2 anime box-unfold" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/tianchuang2.jpg"/>
        </div>

        <div class="el kuang anime box-unfold" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/kuang.png"/>
        </div>

        <div class="el text anime zoom" style="${elementRect(1400,787.5,0,0)}">
            <img src="${path}/text.png"/>
        </div>

        

    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function(item) {
        return animation.get('.kuang').animate({
            duration: 400,
            delay: 200,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        })
    })

    .then(function(item) {
        return animation.get('.tianchuang2').animate({
            duration: 400,
            delay: 600,
            'box-unfold': {
                origin: [0.5, 0.5],
                angle: 0
            }
        })
    })

    .then(function(item) {
        return animation.get('.text').animate({
            duration: 400,
            'zoom': {
                from: '100%',
                to: '114%'
            }
        })
    })


}
