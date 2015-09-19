import './home.less';
import $ from 'jquery';
import {Promise, defer, waitForEvent} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';
import * as pagewheel from '../lib/pagewheel';
import preloadImags from '../lib/preload';
import {isIE8} from '../lib/env';

var path = 'images/home';
var logoImg = require(`../../images/logo.jpg`);
var lightImg = isIE8 ? 'images/light.jpg' : require(`../../images/light.jpg`);
var lazystr = isIE8 ? 'lazyload="true"': '';

export function render() {
    return `
        <div class="bg"><img src="${path}/bg.jpg" lazyload="true"/></div>
        <div class="loading-wrap">
            <div class="el mask" style="${elementRect(1600,900,0,0)}" >
                <img src="${path}/mask.png" lazyload="true"/>
            </div>
            <div class="el bottom anime slide-in" style="${elementRect(1600,468,0,432)}">
                <img src="${path}/bottom.jpg" lazyload="true"/>
            </div>
            <div class="el logo anime zoom" style="${elementRect(1031,168,278,301)}">
                <img src="${logoImg}"/>
            </div>
            <div class="el light anime box-unfold" style="${elementRect(1236,197,166,358)}">
                <img src="${lightImg}" ${lazystr}/>
            </div>
            <div class="el text anime fade-in" style="${elementRect(408,59,594,527)}">
                时尚家庭中级车
            </div>
            <div class="el arrow-down anime flash" style="${elementRect(140,71,730,735)}">
                <img src="${path}/arrow-down.gif" lazyload="true"/>
            </div>
        </div>
        <div class="el car anime fade-in" style="${elementRect(1045,665,0,235)}">
            <img src="${path}/car.jpg" lazyload="true"/>
        </div>
        <div class="el eagle anime fade-in" style="${elementRect(804,101,842,240)}">
            <img src="${path}/eagle.png" lazyload="true"/>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.logo').animate({
            duration: 700,
            timingFunction: 'easeOut',
            zoom: {
                from: '400%',
                to: '100%'
            }
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
        var translateLogo = new Promise(function(resolve, reject) {
            $page.find('.logo').animate({
                top: '22.3333333%'
            }, {
                duration: 1000,
                ease: 'linear',
                complete: resolve
            });
        });

        var translateLight = new Promise(function(resolve, reject) {
            $page.find('.light').animate({
                top: '28.6777777%'
            }, {
                duration: 1000,
                ease: 'linear',
                complete: resolve
            });
        });

        return Promise.all([
            translateLogo,
            translateLight,
            animation.get('.bottom').animate({
                duration: 1000,
                timingFunction: 'linear',
                'slide-in': {
                    offset: '100%',
                    from: 'bottom'
                }
            })
        ])
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
    }).then(function() {
        $page.find('.bg img').show();
        $page.find('.bottom').hide();

        return Promise.race([
            waitForEvent($page.find('.arrow-down')[0], 'click'),
            pagewheel.wheel()
        ]);
    }).then(function() {
        return new Promise(function(resolve, reject) {
            $page.find('.loading-wrap').animate({
                top: '-100%'
            }, {
                duration: 500,
                complete: resolve
            });
        });
    }).then(function() {
        return animation.get('.car').animate({
            duration: 400
        });
    }).then(function() {
        return animation.get('.eagle').animate({
            duration: 400
        });
    })
}