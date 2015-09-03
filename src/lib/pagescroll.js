import {Promise, defer} from './promise';
import * as page from './page';

var queue = Promise.resolve();

export function scroll($pageRoot, name) {
    var init = Promise.resolve();

    if (!page.has(name)) {
        init = page.add(name);
    }

    queue = Promise.all([init, queue])
        .then(function(ret) {
            var curpage = page.get(name);

            var lastname = ret[1];
            if (lastname) {
                var lastpage = page.get(lastname);

                var top = page.indexOf(name) > page.indexOf(lastname) ? 100 : -100;

                curpage.$root.css({
                    display: 'block',
                    top: top + '%'
                });

                return new Promise(function(resolve, reject) {
                    $pageRoot.animate({
                        top: -top + '%'
                    }, {
                        duration: 400,
                        complete: function() {
                            lastpage.$root.css({
                                display: 'none'
                            });
                            curpage.$root.css({
                                top: 0
                            });
                            $pageRoot.css({
                                top: 0
                            });
                            resolve();
                        }
                    });
                });
            } else {
                curpage.$root.css({
                    display: 'block'
                });
            }
        })
        .then(function() {
            return page.show(name);
        }).then(function() {
            return name;
        });

    return queue;
}