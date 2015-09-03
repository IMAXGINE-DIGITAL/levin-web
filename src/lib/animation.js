import './animation.less';
import $ from 'jquery';
import {Promise, delay} from './promise';
import ACTIONS from './animeActions';

function Item(element) {
    var $element = $(element);

    this.animate = function(options) {
        var actions = ACTIONS.map(function(tester) {
            if (typeof tester === 'function') {
                return tester($element, options);
            } else {
                return false;
            }
        });

        return Promise.all(actions);
    }

    this.action = function(name, options) {
        var file = name.replace(/\-[a-z0-9]/ig, function($1) {
            return $1.substr(1).toUpperCase();
        });
        var action = require('./animeActions/' + file);
        return action.get($element, {[name] : options});
    }
}

function Animation(root) {
    var elements = root.find('.anime');

    elements.each(function() {
        this.animationItem = new Item(this);
    });

    var ready = Promise.resolve(true);
    this.then = function(fn) {
        return ready.then.call(ready, fn);
    }

    this.get = function(selector) {
        var $element = root.find(selector);
        return $element.get(0).animationItem;
    }
}


$.fn.animation = function(seq) {
    var ins = new Animation(this);
    if (seq) {
        var promise = ins;
        seq.forEach(function(item) {
            promise = promise.then(function() {
                return Promise.all(Object.keys(item).map(function(selector) {
                    return ins.get(selector).animate(item[selector]);
                }));
            });
        });
        return promise;
    } else {
        return ins;
    }
};