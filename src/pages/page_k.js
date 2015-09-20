import './page_k.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';
import fa from '../lib/frameAnimation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_k';

    return `
        <div class="bg"></div>
        <div class="el road anime" style="${elementRect(1600,1570,0,-785)}">
            <div style="width: 100%; height: 50%; top: 0; left: 0;">
                <img src="${path}/road.jpg">
            </div>
            <div style="width: 100%; height: 50%; top: 50%; left: 0;}">
                <img src="${path}/road.jpg">
            </div>
        </div>
        <div class="el car1 anime fade-in" style="${elementRect(214,470,837,158)}">
            <img src="${path}/car1.png">
        </div>
        <div class="el car2 anime" style="${elementRect(214,492,837,-492)}">
            <img src="${path}/car2.png">
        </div>
        <div class="el shift anime" style="${elementRect(1600,900,0,0)}">
            <img src="${path}/shift.png">
        </div>
        <div class="el shiftdown anime flash" style="${elementRect(137,214,262,415)}">
            <img src="${path}/shiftdown.png">
        </div>
        <div class="el shiftup anime flash" style="${elementRect(141,216,1201,413)}">
            <img src="${path}/shiftup.png">
        </div>
        <div class="el text anime fade-in text-wrap" style="${elementRect(422,116,98,284)}">
            <span class="text_a" style="${elementRect(422,70,0,0,[422,116])}">运动换挡拨片</span>
            <span class="text_b" style="${elementRect(422,40,0,76,[422,116])}">换挡时间0.35秒，比心跳还快</span>
        </div>
    `;
}

var shiftNumber = 0;
var startDriving = false;
var speedInterval = [0, 40, 35, 30, 25, 20, 15, 10, 5];

function driving($road, originTop) {
    setTimeout(function() {
        var top = parseFloat($road[0].style.top);
        top -= originTop / 22;
        if (top >= 0) {
            top = originTop;
        }
        $road[0].style.top = top + '%';
        driving($road, originTop);
    }, speedInterval[shiftNumber]);
}

function overtaking($car1, $car2) {
    var car1OriginLeft = $car1.origin.left;
    var car2OriginTop = $car2.origin.top;

    var car1DestLeft = 35.5;
    var car2DestTop1 = -38.8;
    var car2DestTop2 = 60;

   return fa(100, 'linear', function(i1, i2) {
        $car1.css({
            left: (car1OriginLeft + (car1DestLeft - car1OriginLeft) * i2) + '%'
        });

        $car2.css({
            top: (car2OriginTop + (car2DestTop1 - car2OriginTop) * i2) + '%'
        });
    }).play().then(function() {
        return fa(300, 'linear', function(i1, i2) {
            $car2.css({
                top: (car2DestTop1 + (car2DestTop2 - car2DestTop1) * i2) + '%'
            });
        }).play();
    }).then(function() {
        return fa(300, 'linear', function(i1, i2) {
            $car1.css({
                left: (car1DestLeft + (car1OriginLeft - car1DestLeft) * i2) + '%'
            });
        }).play();
    });
}

function chnageShift($page, count) {

    if (count > 0 && shiftNumber === 8 ||
            count < 0 && shiftNumber === 1) {
        return true;
    }

    shiftNumber += count;

    if (shiftNumber === 1 && !startDriving) {
        startDriving = true;
        var $road = $page.find('.road');
        var originTop = parseFloat($road[0].style.top);
        driving($road, originTop);
        return true;
    } else if (shiftNumber === 8) {
        var $car1 = $page.find('.car1');
        $car1.origin = {
            top: parseFloat($car1[0].style.top),
            left: parseFloat($car1[0].style.left)
        };
        var $car2 = $page.find('.car2').css({
            top: '-55%'
        });
        $car2.origin = {
            top: parseFloat($car2[0].style.top),
            left: parseFloat($car2[0].style.left)
        };
        overtaking($car1, $car2);
        return true;
    } else {
        return true;
    }
}

function listenShift($page, type) {
    return new Promise(function(resolve, reject) {
        $page.on('click', '.shift' + type, function handler() {
            $page.off('click', '.shift' + type, handler);
            resolve(type === 'down' ? -1 : 1);
        });
    });
}

function interactive($page) {
    Promise.race([
        listenShift($page, 'up'),
        listenShift($page, 'down')
    ]).then(function(count) {
        return chnageShift($page, count)
    }).then(function(ret) {
        if (ret) {
            interactive($page);
        }
    });
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 300
            });
        }).then(function(item) {
            return animation.get('.car1').animate({
                    duration: 600,
                    delay: 300
                });
        }).then(function(item) {
            Promise.all([
                animation.get('.shiftdown').animate({
                    delay: 300,
                    flash: {
                        loop: 3,
                        interval: 1000
                    }
                }),
                animation.get('.shiftup').animate({
                    delay: 300,
                    flash: {
                        loop: 3,
                        interval: 1000
                    }
                })
            ]).then(function() {
                $page.find('.shiftup, .shiftdown').find('img').remove();
            });
        }).then(function() {
            interactive($page);
            $page.find('.shiftup').trigger('click');
        });
}