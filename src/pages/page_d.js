import './page_d.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_d';

    return `
        <div class="bg">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="el car anime slide-in" style="${elementRect(1045,425,475,369)}">
            <img src="${path}/car.png" />
        </div>
        <div class="el eagle anime fly-in" style="${elementRect(643,200,149,112)}">
            <img src="${path}/eagle.png" />
        </div>
        <div class="el text anime fade-in" style="${elementRect(627,153,83,299)}">
            <img src="${path}/text.png" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car').animate({
            duration: 800,
            timingFunction: 'easeOut',
            'slide-in': {
                offset: '100%',
                from: 'right'
            }
        });
    }).then(function() {
        return animation.get('.eagle').animate({
            duration: 1000,
            timingFunction: [0,0,0,1],
            'fly-in': {
                from: 'right'
            }
        });
    }).then(function() {
        return animation.get('.text').animate({
            duration: 400
        });
    });
}