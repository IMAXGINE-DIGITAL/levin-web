import $ from 'jquery';
import {Promise, defer} from './promise';
import mousewheel from './mousewheel';
mousewheel($);

var ua = window.navigator.userAgent;
var isFirefox = !!ua.match(/Firefox/);
var isIE = !!ua.match(/MSIE/);
var isChrome = !!ua.match(/Chrome/);

var flickDeltaY;
if (isFirefox) {
  flickDeltaY = 5;
} else if (isIE) {
  flickDeltaY = 70;
} else if (isChrome) {
  flickDeltaY = 100;
} else {
  flickDeltaY = 100;
}

export function listenWheel() {
  var wheeling;
  var deltaY = 0;
  var $body = $(document.body);

  $body.on('mousewheel', function(e) {
    e.preventDefault();

    var y = e.originalEvent.deltaY;
    if (y * deltaY >= 0) {
      deltaY += y;
    } else {
      clearTimeout(wheeling);
      deltaY = 0;
    }

    wheeling = setTimeout(function() {
      if (Math.abs(deltaY) >= flickDeltaY) {
        $body.trigger('wheelflick', deltaY);
      }
      deltaY = 0;
    }, 50);
  });
}

export function wheelPage() {
  var deferred = defer();

  var $body = $(document.body);

  $body.on('wheelflick', function handler(e, deltaY) {
    $body.off('wheelflick', handler);
    deferred.resolve(deltaY > 0?'next':'prev');
  });

  return deferred.promise;
}