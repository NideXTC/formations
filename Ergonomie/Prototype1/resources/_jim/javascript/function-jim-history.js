/*!
 * @original-license
 * jQuery Mobile Framework 1.1.0 db342b1f315c282692791aa870455901fdb46a55
 * http://jquerymobile.com
 *
 * Copyright 2011 (c) jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */
(function (window, undefined) {
  window.urlHistory = {
    /* Array of pages that are visited during a single page load. Each has a url and optional transition */
    "stack": [],
    /* maintain an index number for the active page in the stack */
    "activeIndex": 0,
    "getActive": function() {
      return urlHistory.stack[urlHistory.activeIndex];
    },
    "getPrev": function() {
      return urlHistory.stack[urlHistory.activeIndex - 1];
    },
    "getNext": function() {
      return urlHistory.stack[urlHistory.activeIndex + 1];
    },
    "addNew": function(url, transition) {
      /* if there's forward history, wipe it */
      if(urlHistory.getNext()) {
        urlHistory.clearForward();
      }
      urlHistory.stack.push({"url": url});
      urlHistory.activeIndex = urlHistory.stack.length - 1;
      urlHistory.ignoreNextHashChange = true;
      jimMain.path.set(url);
    },
    /* wipe urls ahead of active index */
    "clearForward": function() {
      urlHistory.stack = urlHistory.stack.slice(0, urlHistory.activeIndex + 1);
    },
    "update": function(opts) {
      var back , forward, newActiveIndex, prev = urlHistory.getActive();
      jQuery.each(urlHistory.stack, function(i, historyEntry) {
        if(opts.currentUrl === historyEntry.url) {
          back = i < urlHistory.activeIndex;
          forward = !back;
          newActiveIndex = i;
        }
      });
      /* save new page index, null check to prevent false 0 result */
      urlHistory.activeIndex = (newActiveIndex !== undefined) ? newActiveIndex : urlHistory.activeIndex;
      if(back && opts.isBack) {
        (opts.isBack)();
      } else if(forward && opts.isForward) {
        (opts.isForward)();
      } else if(opts.either) {
        (opts.either)();
      }
    },
    "handleHashChange": function(hash) {
      var url = jimMain.path.stripHash(hash), historyDir = 0, transition, historyEntry, options = {};
      /* if listening is disabled (either globally or temporarily) */
      if(!urlHistory.hashListeningEnabled || urlHistory.ignoreNextHashChange) {
        urlHistory.ignoreNextHashChange = false;
        return;
      }
      if(url) {
        urlHistory.update({
          "currentUrl": url,
          "isBack": function() { historyDir = -1; },
          "isForward": function() { historyDir = 1; },
          "either": function() { historyDir = 0 }
        });
        if(historyDir !== 0) {
          historyEntry = urlHistory.stack[urlHistory.activeIndex];
          options = {
            "historyDir": historyDir
          };
        }
        jimMain.handleNavigation(url, options);
      }
    },
    "hashListeningEnabled": true,
    /* disable hashchange event listener internally to ignore one change, toggled internally when location.hash is updated to match the url of a successful page load */
    "ignoreNextHashChange": false
  };
  
  /* START EVENTS */
  jQuery(window).bind("hashchange", function(event, data) {
    if(urlHistory.ignoreNextHashChange === false) {
      urlHistory.handleHashChange(location.hash);
    } else {
      urlHistory.ignoreNextHashChange = false;
    }
  });
  /* END EVENTS */
})(window);