import './main.less';
import $ from 'jquery';
import {Promise, defer} from './lib/promise';
import './lib/viewport';
import './lib/global';
import * as page from './lib/page';
import {scrollPage} from './lib/pagescroll';
import {listenWheel, wheelPage} from './lib/pagewheel';

page.ready().then(function ($pageRoot) {

    function getHashName() {
        var hash = location.hash.replace('#', '');
        var name = hash || 'loading';
        return name;
    }

    function hashchange() {
        var deferred = defer();

        $(window).on('hashchange', function handler() {
            $(window).off('hashchange', handler);
            var name = getHashName();
            deferred.resolve(name);
        });

        return deferred.promise;
    }

    function circle(curName) {
        Promise.race([hashchange(), wheelPage()])
            .then(function(ret) {
                var direction;
                var name;
                if (['next', 'prev'].indexOf(ret) > -1) {
                    direction = ret;
                } else {
                    name = ret;
                }

                if (!name) {
                    name = page[direction](curName);
                }
                if (name) {
                    return scrollPage($pageRoot, name);
                }
            }).then(function(name) {
                // location.replace('#' + name);
                return circle(name);
            });
    }

    listenWheel();
    var name = getHashName();
    scrollPage($pageRoot, name).then(circle);
});
