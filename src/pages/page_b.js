import './page_a.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_b';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el text anime slide-in" style="${elementRect(511,178,957,501)}">
            <img src="${path}/text.png">
        </div>
        <div class="el text-light anime box-unfold" style="${elementRect(356,82,1172,564)}">
            <img src="${path}/light.png">
        </div>
        <div class="el line1 anime box-unfold" style="${elementRect(642,598,39,167)}">
            <img src="${path}/line1.png">
        </div>
        <div class="el line2 anime box-unfold" style="${elementRect(671,39,560,220)}">
            <img src="${path}/line2.png">
        </div>
        <div class="el line3 anime box-unfold" style="${elementRect(489,186,722,411)}">
            <img src="${path}/line3.png">
        </div>
    `;
}

export function show($page) {
    return $page.animation([
        {
            '.text': {
                duration: 400,
                timingFunction: 'bounceInOut',
                'slide-in': {
                    offset: '30%',
                    direction: 'up'
                }
            }
        },
        {
            '.text-light': {
                duration: 400,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                },
                'slide-in': {
                    offset: '15%',
                    direction: 'left'
                }
            }
        },
        {
            '.line1': {
                duration: 600,
                'box-unfold': {
                    origin: [0, '100%'],
                    angle: 0
                }
            }
        },
        {
            '.line2': {
                duration: 600,
                'box-unfold': {
                    origin: [0, '100%'],
                    angle: 0
                }
            },
            '.line3': {
                duration: 600,
                delay: 200,
                'box-unfold': {
                    origin: [0, '100%'],
                    angle: 0
                }
            }
        }
    ]);
}