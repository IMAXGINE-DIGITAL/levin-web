import {Promise, defer} from './promise';
import * as page from './page';

var queue = Promise.resolve();

function animation(curname, lastname, $pageRoot) {
    var curpage = page.get(curname);
    var lastpage = page.get(lastname);

    if (lastpage) {
        var top = page.indexOf(curname) > page.indexOf(lastname) ? 100 : -100;

        return Promise
            .all([curpage.root(), lastpage.root()])
            .then(function([$curRoot, $lastRoot]) {
                $curRoot.css({
                    display: 'block',
                    top: top + '%'
                });

                return new Promise(function(resolve, reject) {
                    $pageRoot.animate({
                        top: -top + '%'
                    }, {
                        duration: 400,
                        complete: function() {
                            $lastRoot.css({
                                display: 'none'
                            });
                            $curRoot.css({
                                top: 0
                            });
                            $pageRoot.css({
                                top: 0
                            });
                            resolve();
                        }
                    });
                });
            });
    } else {
        return curpage.root()
            .then(function($root) {
                $root.css({
                    display: 'block'
                });
            });
    }   
}


export function scroll($pageRoot, name) {
    var init = Promise.resolve();

    if (!page.has(name)) {
        init = page.add(name);
    }

    queue = Promise.all([init, queue])
        .then(function(ret) {
            var curpage = page.get(name);
            var lastpage = page.get(ret[1]);

            return curpage.render()
                .then(function() {
                    return animation(name, ret[1], $pageRoot);
                });
        }).then(function() {
            page.show(name);
            return name;
        });
        // .then(function() {
        //     return page.show(name);
        // }).then(function() {
        //     return name;
        // });

    return queue;
}