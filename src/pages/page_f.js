import './page_f.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_f';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el text anime fade-in" style="${elementRect(581,87,106,222)}">
            <img src="${path}/text.png">
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 400
            });
        });
}