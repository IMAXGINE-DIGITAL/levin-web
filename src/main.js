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

    const INDICATOR_LENGHT = page.catLength();
    function highlightIndicator(name) {
        var pageIndex = page.indexOf(name);
        var cat = page.catFromPageIndex(pageIndex);
        if (cat) {
            indicator.render(cat.index, cat.period[1] - cat.period[0] + 1)
                .then(function() {
                    indicator.highlight(pageIndex - cat.period[0]);
                });
        }
    }

    function setMenuText(name) {
        var pageIndex = page.indexOf(name);
        var cat = page.catFromPageIndex(pageIndex);
        if (cat) {
            nav.setMenuText(cat.name);
        } else {
            nav.setMenuText('首页');
        }
    }

    function toCatIndex(catIndex) {
        return page.pageFromCatIndex(catIndex);
    }

    function toPageIndex([catIndex, index]) {
        return page.pageFromCatIndex(catIndex) + index;
    }

    function debuggerLog(name) {
        if (location.search.indexOf('debug') > 0) {
            console.debug(name);
            location.replace('#' + name);
        }
    }

    function circle(curName) {
        if (curName === 'home') {
            // nav.hide();
            indicator.hide();
        } else {
            // nav.show();
            indicator.show();
        }
        nav.show();

        Promise.race([
                hashchange(), 
                pagechange(), 
                menu.navto().then(toCatIndex), 
                indicator.navto().then(toPageIndex),
                pagewheel.wheel()
            ])
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
                    highlightIndicator(name);
                    setMenuText(name);
                    debuggerLog(name);
                    return pagescroll.scroll($pageRoot, name);
                } else {
                    return curName;
                }
            }).then(function(name) {
                return circle(name);
            });
    }

    pagewheel.listen();
    indicator.init(INDICATOR_LENGHT);

    var name = getHashName();
    pagescroll.scroll($pageRoot, 'home')
        .then(function() {
            if (name !== 'home') {
                highlightIndicator(name);
                setMenuText(name);
                debuggerLog(name);
                return pagescroll.scroll($pageRoot, name);
            } else {
                return name;
            }
        }).then(circle);
});
