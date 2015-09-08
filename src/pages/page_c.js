import './page_c.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_c';

    return `
        <div class="bg">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="el car anime fade-in" style="${elementRect(1045,665,0,235)}">
            <img src="${path}/car.jpg" />
        </div>
        <div class="el eagle anime fade-in" style="${elementRect(804,101,842,240)}">
            <img src="${path}/eagle.png" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car').animate({
            duration: 400
        });
    }).then(function() {
        return animation.get('.eagle').animate({
            duration: 400
        });
    });
}