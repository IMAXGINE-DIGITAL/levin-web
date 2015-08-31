import './home.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/home';

    return `
        <div class="bg"></div>
        <div class="el bottom anime slide-in" style="${elementRect(1600,468,0,432)}">
            <img src="${path}/bottom.jpg" />
        </div>
        <div class="el eagle anime slide-in" style="${elementRect(796,335,0,536)}">
            <img src="${path}/eagle.png" />
        </div>
        <div class="el light-gray anime fade-in" style="${elementRect(1236,197,166,258)}">
            <img src="${path}/light_gray.png" />
        </div>
        <div class="el light anime box-unfold" style="${elementRect(1236,197,166,258)}">
            <img src="${path}/light.png" />
        </div>
        <div class="el logo anime zoom" style="${elementRect(1031,168,278,201)}">
            <img src="${path}/logo.png" />
        </div>
        <div class="el text anime fade-in" style="${elementRect(408,59,594,527)}">
            <img src="${path}/text.gif" />
        </div>
        <div class="el arrow-down anime flash" style="${elementRect(140,71,730,735)}">
            <img src="${path}/arrow-down.gif" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    $page.find('.arrow-down').on('click', function() {
        $(document).trigger('pagechange', 'next');
    });

    return animation.then(function() {
        return animation.get('.logo').animate({
            duration: 700,
            timingFunction: 'easeOut',
            zoom: {
                zoom: '400%'
            }
        });
    }).then(function() {
        return animation.get('.light-gray').animate({
            duration: 50
        });
    }).then(function() {
        return animation.get('.light').animate({
            duration: 800,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        });
    }).then(function() {
        return Promise.all([
            animation.get('.bottom').animate({
                duration: 1000,
                timingFunction: 'easeOut',
                'slide-in': {
                    offset: '100%',
                    from: 'bottom'
                }
            }),
            animation.get('.eagle').animate({
                duration: 1000,
                timingFunction: 'easeOut',
                'slide-in': {
                    offset: '100%',
                    from: 'left'
                }
            })
        ]);
    }).then(function() {
        return Promise.all([
            animation.get('.text').animate({
                duration: 400
            }), 
            animation.get('.arrow-down').animate({
                delay: 200,
                flash: {
                    loop: Infinity,
                    interval: 800
                }
            })
        ]);
    });
}