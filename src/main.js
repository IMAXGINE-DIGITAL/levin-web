import './main.less';
import $ from 'jquery';
import {Promise, defer} from './lib/promise';
import './lib/viewport';
import * as nav from './lib/nav';
import * as menu from './lib/menu';
import * as page from './lib/page';
import * as indicator from './lib/indicator';
import * as pagescroll from './lib/pagescroll';
import * as pagewheel from './lib/pagewheel';

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
        if (curName === 'home') {
            nav.hide();
            indicator.hide();
        } else {
            nav.show();
            indicator.show();
        }

        Promise.race([hashchange(), pagechange(), menu.navto(), pagewheel.wheel()])
            .then(function(ret) {
                var name;
                if (['next', 'prev'].indexOf(ret) > -1) {
                    name = page[ret](curName);
                } else if (typeof ret === 'number'){
                    name = page.fromIndex(ret);
                } else {
                    name = ret;
                }

                if (name && name !== curName) {
                    var index = page.indexOf(name);
                    indicator.highlight(index);
                    if (location.search.indexOf('debug') > 0) {
                        console.debug(name);
                        location.replace('#' + name);
                    }
                    return pagescroll.scroll($pageRoot, name);
                } else {
                    return curName;
                }
            }).then(function(name) {

                return circle(name);
            });
    }

    pagewheel.listen();
    indicator.init(page.length() - 1);

    var name = getHashName();
    pagescroll.scroll($pageRoot, 'home')
        .then(function() {
            if (name !== 'home') {
                var index = page.indexOf(name);
                indicator.highlight(index);
                return pagescroll.scroll($pageRoot, name);
            } else {
                return name;
            }
        }).then(circle);
});
