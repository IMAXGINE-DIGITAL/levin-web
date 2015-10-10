import './page_z.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_z';

    return `
        <div class="el form-wrap" style="${elementRect(1600,900,0,0)}">
            <iframe id="form" framebolder="0" src="form/camryNodListed.html">
        </div>
    `;
}

export function show($page) {
    // var contentDocument = $('#form')[0].contentDocument;
    // var $contentDoc = $(contentDocument);

    // $contentDoc.find('.header, .footer').hide();
    // $contentDoc.find('html, body').css({
    //         width: '100%',
    //         height: '100%',
    //         overflow: 'hidden'
    //     });
}