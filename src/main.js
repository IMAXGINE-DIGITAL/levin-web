import './main.less';
import $ from 'jquery';
import {Promise, defer} from './lib/promise';
import './lib/viewport';
// import './lib/global';
import * as page from './lib/page';
import {scrollPage} from './lib/pagescroll';
import {listenWheel, wheelPage} from './lib/pagewheel';

page.ready().then(function ($pageRoot) {
    var $win = $(window);
    var $doc = $(window.document);


    function getHashName() {
        var hash = location.hash.replace('#', '');
        var name = hash || 'home';
        return name;
    }

    function hashchange() {
        var deferred = defer();

        $win.on('hashchange', function handler() {
            $win.off('hashchange', handler);
            var name = getHashName();
            deferred.resolve(name);
        });

        return deferred.promise;
    }

    function pagechange() {
        var deferred = defer();

        $doc.on('pagechange', function handler(e, name) {
            $doc.off('pagechange', handler);
            deferred.resolve(name);
        });

        return deferred.promise;
    }

    function circle(curName) {
        Promise.race([hashchange(), pagechange(), wheelPage()])
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
