import './page_j.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_j';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el shadow anime fade-in" style="${elementRect(612,156,926,705)}">
            <img src="${path}/shadow.jpg">
        </div>
        <div class="el engine anime fly-in" style="${elementRect(502,494,997,284)}">
            <img src="${path}/engine.png">
        </div>
        <div class="el table anime fade-in" style="${elementRect(893,284,44,246)}">
            <img src="${path}/table.png">
        </div>
        <div class="el red-line1 anime box-unfold" style="${elementRect(250,35,129,343)}">
            <img src="${path}/red-line1.png">
        </div>
        <div class="el blue-line1 anime box-unfold" style="${elementRect(247,146,133,316)}">
            <img src="${path}/blue-line1.png">
        </div>
        <div class="el red-line2 anime box-unfold" style="${elementRect(258,40,597,320)}">
            <img src="${path}/red-line2.png">
        </div>
        <div class="el blue-line2 anime box-unfold" style="${elementRect(259,161,597,288)}">
            <img src="${path}/blue-line2.png">
        </div>
        <div class="el fue anime fade-in" style="${elementRect(892,169,60,558)}">
            <img src="${path}/fue.png">
        </div>
        <div class="el number1 anime number" style="${elementRect(133,91,73,614)}">
            5.9
        </div>
        <div class="el number2 anime number" style="${elementRect(133,91,555,614)}">
            6.1
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.shadow').animate({
                duration: 400
            });
        }).then(function(item) {
            return animation.get('.engine').animate({
                duration: 600,
                delay: 200,
                timeingFunction: 'easeOut',
                'fly-in': {
                    from: 'bottom'
                }
            });
        }).then(function(item) {
            return animation.get('.table').animate({
                duration: 400,
                delay: 300
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.blue-line1').animate({
                    duration: 600,
                    delay: 300,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                }),
                animation.get('.red-line1').animate({
                    duration: 600,
                    delay: 500,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                })
            ]);
        }).then(function(item) {
            return Promise.all([
                animation.get('.blue-line2').animate({
                    duration: 600,
                    delay: 300,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                }),
                animation.get('.red-line2').animate({
                    duration: 600,
                    delay: 500,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                })
            ]);
        }).then(function(item) {
            return animation.get('.fue').animate({
                duration: 400,
                delay: 300
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.number1').animate({
                    duration: 400,
                    delay: 300,
                    timeingFunction: 'linear',
                    'number': {
                        from: 10,
                        to: 59,
                        format: '%02.%01'
                    }
                }),
                animation.get('.number2').animate({
                    duration: 400,
                    delay: 300,
                    timeingFunction: 'linear',
                    'number': {
                        from: 10,
                        to: 61,
                        format: '%02.%01'
                    }
                })
            ]);
        });
}