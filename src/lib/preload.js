import $ from 'jquery';
import imgpreloader from './imgpreloader';
imgpreloader($);

import {Promise, defer} from '../lib/promise';
import imagelist from '../imagelist';

var loaderDeferred = defer();
var doneDeferred = defer();

export function done() {
    return doneDeferred.promise;
}

export default function preloadImags(progress) {
    var loader = $.imgpreloader({
        paths: imagelist
    });

    loader.progress(progress);

    loader.done(function($allImages) {
        var images = {};
        $allImages.each(function() {
            images[this.src] = this;
        });
        doneDeferred.resolve(images);
    });

    loaderDeferred.resolve(loader);

    return module.exports;
}