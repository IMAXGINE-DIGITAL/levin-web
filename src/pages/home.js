import './home.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';
import preloadImags from '../lib/preload';

var path = 'images/home';
var logoImg = require(`../../images/logo`);
var lightGrayImg = require(`../../images/light_gray.gif`);
var lightImg = require(`../../images/light.jpg`);

export function render() {
    return `
        <div class="bg"></div>
        <div class="el bottom anime slide-in" style="${elementRect(1600,468,0,432)}">
            <img src="${path}/bottom.jpg" lazyload="true"/>
        </div>
        <div class="el eagle anime slide-in" style="${elementRect(796,335,0,536)}">
            <img src="${path}/eagle.png" lazyload="true"/>
        </div>
        <div class="el light-gray anime fade-in" style="${elementRect(1236,197,166,258)}">
            <img src="${lightGrayImg}" />
        </div>
        <div class="el light anime box-unfold" style="${elementRect(1236,197,166,258)}">
            <img src="${lightImg}" />
        </div>
        <div class="el logo anime zoom" style="${elementRect(1031,168,278,201)}">
            <img src="${logoImg}" />
        </div>
        <div class="el text anime fade-in" style="${elementRect(408,59,594,527)}">
            <img src="${path}/text.gif" lazyload="true"/>
        </div>
        <div class="el arrow-down anime flash" style="${elementRect(140,71,730,735)}">
            <img src="${path}/arrow-down.gif" lazyload="true"/>
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
                from: '400%'
            }
        });
    }).then(function() {
        return animation.get('.light-gray').animate({
            duration: 50
        });
    }).then(function() {
        var {frame, done} = animation.get('.light')
            .action('box-unfold', {
                origin: [0, 0],
                angle: 0
            });

        function progress($image, 
            $allImages, 
            $properImages, 
            $brokenImages, 
            isBroken, 
            percentage) {

            frame(percentage / 100, percentage / 100);
        }
        return preloadImags(progress)
            .done().then(done);
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