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
  var jimMain,
      $navigationTree = jQuery("#navigationtree"),
      defaults = {
        "canvasContainer": jQuery("#simulation"),
        "activePageClass": "ui-page-active"
      },
      path;

  /* START NAVIGATION */
  path = {
    "urlParseRE": /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
    "parseUrl": function(url) {
      var matches;
      if(typeof(url) === "string") {
        /*
         * [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
         * [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
         * [2]: http://jblas:password@mycompany.com:8080/mail/inbox
         * [3]: http://jblas:password@mycompany.com:8080
         * [4]: http:
         * [5]: //
         * [6]: jblas:password@mycompany.com:8080
         * [7]: jblas:password
         * [8]: jblas
         * [9]: password
         * [10]: mycompany.com:8080
         * [11]: mycompany.com
         * [12]: 8080
         * [13]: /mail/inbox
         * [14]: /mail/
         * [15]: inbox
         * [16]: ?msg=1234&type=unread
         * [17]: #msg-content
         */
        matches = path.urlParseRE.exec(url ||"") || [];
        return {
          "href":         matches[0] || "",
          "hrefNoHash":   matches[1] || "",
          "hrefNoSearch": matches[2] || "",
          "domain":       matches[3] || "",
          "protocol":     matches[4] || "",
          "doubleSlash":  matches[5] || "",
          "authority":    matches[6] || "",
          "username":     matches[8] || "",
          "password":     matches[9] || "",
          "host":         matches[10] || "",
          "hostname":     matches[11] || "",
          "port":         matches[12] || "",
          "pathname":     matches[13] || "",
          "directory":    matches[14] || "",
          "filename":     matches[15] || "",
          "search":       matches[16] || "",
          "hash":         matches[17] || ""
        };
      }
    },
    "stripHash": function(url) {
      return url.replace(/^#\//, "");
    },
    "set": function(url) {
      location.hash = "#/" + path.stripHash(url);
    }
  };
  
  function getMainWindow(windowRef) {
    var w = windowRef || window;
    return (jimMain.isPopup(w)) ? jimMain.getMainWindow(w.opener) : w;
  }
  
  function isPopup(window) {
    try {
      return window && window.opener && window.opener.jim;
    } catch (error) {
      window.jim = true;
      return false;
    }
  }
  
  function scaleContent($page){
  	if((jimUtil.scale && jimUtil.scale!=100) || jimUtil.fitted){
        if($page.find('#zoomDiv').length<=0){
        	//if master ONLY
        	if($page.find('.template, .screen').length<=0){
        		$page.find('.master').wrapAll(jQuery('<div id="zoomDiv"/>'));
        	}
        	else{
        		$page.find('.template, .screen').wrapAll(jQuery('<div id="zoomDiv"/>'));
        	}
        }
	}
  }
  
  function doneContent(html,textStatus,jqXHR,settings){
	  var deferred = jQuery.Deferred();
	  if(window.PIE && window.PIE.ib && window.PIE.ib.od){
    	  PIE.ib.od();
      }
      if(window.PIE && window.PIE.mb && window.PIE.mb.ld){
    	  PIE.mb.ld();
      }
      var $page = jQuery(html).filter(".ui-page");
      if($page) {
    	scaleContent($page);
        settings.canvasContainer
          .append($page)
          .trigger("canvasload", {"xhr": jqXHR, "textStatus": textStatus, "$page": $page});        
        deferred.resolve($page, settings);
      } else {
        deferred.reject("no data");
      } 
      return deferred.promise();
  }
  
  function getContent(url, settings) {
	    var deferred = jQuery.Deferred();
	    settings.url = lookUpURL(url);
	    
	    if(jimUtil.isChromeLocal() && jimUtil.chromeExtension){
	    	//use extension
	    	document.getElementById('chromeTransfer').innerText = JSON.stringify({url:settings.url});
	    	//send ready event to extension
		    var getContentEvent = window.document.createEvent('Event');
		    getContentEvent.initEvent('getContentEvent', true, true);
	    	document.getElementById('chromeTransfer').dispatchEvent(getContentEvent);
	    
			$('#chromeTransfer').bind('ajaxDoneEvent', function () {
			  if(deferred.state() =="resolved"){
				  return;
			  }	
			  var request = JSON.parse($(this).text());
			  var html = request.html;
			  var jqXHR = request.jqXHR;
			  var textStatus = request.textStatus;
			  
			  document.getElementById('chromeTransfer').innerText="";
			  var promise = doneContent(html,textStatus,jqXHR,settings)    	 
	 	         .done(function(target, args) {
	 	        	 deferred.resolve(target, args);
	 	         })
	 	         .fail(function(target, args) {
	 	        	 deferred.reject("no data");
	 	         });
		    });
			$('#chromeTransfer').bind('ajaxFailEvent', function () {
			  var request = JSON.parse($(this).text());
		      var errorThrown = request.errorThrown;
		      document.getElementById('chromeTransfer').innerText="";
		      deferred.reject(errorThrown);	
		    });
		
	    }
	    else{
	    	jQuery.ajax({
	    	      "type": "GET",
	    	      "dataType": "html",
	    	      "url": "./review/" + settings.url + ".html",
	    	      "cache": false
	    	    })
	    	    .done(function(html, textStatus, jqXHR) {
	    	    	var promise = doneContent(html,textStatus,jqXHR,settings)    	 
	    	         .done(function(target, args) {
	    	        	 deferred.resolve(target, args);
	    	         })
	    	         .fail(function(target, args) {
	    	        	 deferred.reject("no data");
	    	         });
	    	    })
	    	    .fail(function(jqXHR, textStatus, errorThrown) {
	    	    	deferred.reject(errorThrown);	
	    	    });
	    }
	    return deferred.promise();
  }
  
  function handleNavigation(target, args) {
	  
	if(target && typeof(target)==="string") {
	  if(target.indexOf("!")>0) {
		var suffix = target.substring(target.indexOf("!")+1);
		if (suffix.match("^reqID")) {//starts with req
			jimRequirements.openRequirementByID = target.substring(target.indexOf("!reqID")+6);
		}else{
			jimComments.openCommentByID = target.substring(target.indexOf("!")+1);
		}
		target = target.substring(0, target.indexOf("!"));
	  }
	
	  if(!target.match(/(screens|scenarios)\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)) {
		jQuery("#sidepanel").find("#navigationtree").find("a").each(function(index) {
		  if( "/screens/".concat($(this).text())===target || "screens/".concat($(this).text())===target) {
		    target=$(this).attr("href");
		    return false;
		  }
	    });
	  }
	}
	  
    if($.browser.msie && $.browser.version<=8 && target==="") {
      return;
    }

    var settings = jQuery.extend({}, defaults, args), triggerData = args, promise;
    
    /* clear pause stack on navigation: by action, timeouts, back button, etc. */
    if(jimEvent) {
      jimEvent.clearPauseStack();
    }
    
    /* If the caller passed us a url, call loadPage() to make sure it is loaded into the DOM. We'll listen to the promise object it returns so we know when it is done loading or if an error ocurred. */
    if(typeof(target) === "string") {
      /* If we are in the midst of a transition, queue the current request. We'll call changePage() once we're done with the current transition to service the request. */
      if(transition.isTransitioning) {
        transition.queue.unshift(arguments);
        return;
      }
      transition.isTransitioning = true;
      settings.canvasContainer.trigger("canvasunload", triggerData);
      promise = getContent(target, settings)
        .done(function(target, args) {
          transition.isTransitioning = false;
          handleNavigation(target, args);
          
          if(window.PIE){
        	  var $page = jQuery(".ui-page");
              $page.find('.pie:not(.shape)').each(function() {
                if( jQuery.browser.msie && (jQuery.browser.version<=8 || !(this instanceof SVGElement)) ){  
                	PIE.attach(this);
                }
              });
            }
          
          //load integration tools
          var urlPath = "#/"+args.url;
          var title = args.url;
          if(window.externalTools){
        	  window.externalTools.load(urlPath,title);
          }
        })
        .fail(function(target, args) {
          /*jimUtil.debug(errorThrown);*/
          transition.releaseLock();
          window.location.replace(jimUtil.isChromeLocal() ? "resources/_jim/html/chrome.html" : "resources/_jim/html/error.html");
        });
    } else {
      var url = settings.url || "",
          $from = (jQuery("."+settings.activePageClass).length) ? jQuery("."+settings.activePageClass) : undefined,
          historyDir = settings.historyDir || (settings.isbackward) ? -1 : (settings.isforward) ? 1 : 0;

      if (historyDir === -1 && jimScenarios.currentNode != -1)
      	if (!jimScenarios.isValidLink(url)) jimScenarios.deleteFilter(); 
      if (historyDir === 0) {
        urlHistory.addNew(url);
      } else if(settings.isbackward || settings.isforward) {
        urlHistory.ignoreNextHashChange = true;
        path.set(url);
        urlHistory.update({"currentUrl": url}); /* updates urlHistory.activeIndex */
      }
      promise = transition.start(target, $from, settings.transition, settings.reverse);
    }
    return promise;
  }
  
  /*
   * 
   * @param {Object} target
   * @param {Object} args
   * @param {Object} forced
   * 	-1 : Event-triggered transition
   *     1 : Click on scenario triggered transition
   *     2 : Click on sidepanel triggered transition
   * @return {Object}
   */
  function navigate(target, args, forced) {
	forced = typeof forced !== 'undefined' ? forced : -1;
	var url, options, popup, deferred;
    
    if(typeof(target) === "string") { /* called as url with optional options */
      options = jQuery.extend({}, args);
    } else if (typeof(target) === "object") { /* called with action parameters or urlHistory stack entry */
      options = jQuery.extend({}, target, args);
      target = target.target || target.url;
    }
    if(target) {
      if (options.popup) {
        url = (options.isexternal) ? target : "index.html#/" + target;
        if(options.popup.iscentered) {
          options.popup.left = (screen.availWidth - options.popup.width) / 2;
          options.popup.top = (screen.availHeight - options.popup.height) / 2;
        }
        popup = window.open(url, "", "width=" + options.popup.width + ",height=" + options.popup.height + ",top=" + options.popup.top + ",left=" + options.popup.left + ",scrollbars=" + options.popup.hasscrollbars + ",resizable=" + options.popup.isresizable);
        window.jim = true;
        popup.focus();
        window.popups.push(popup);
      } else if (options.tab) {
        url = (options.isexternal) ? target : "index.html#/" + target;
        popup = window.open(url, "_blank");
        window.jim = true;
        popup.window.jimData = window.jimData;
        popup.focus();
      } else {
        if(options.isexternal) {
          window.location.href = target;
        } else {
          if (jimMain.isPopup(window)) {
            deferred = jimMain.getMainWindow().jimMain.handleNavigation(target, options);
            window.close();
          } else {
        	var valid = true;
        	
        	if (jimScenarios.currentNode != -1 && forced == -1)
        	  valid = jimScenarios.isValidLink(target);
        	else if (forced == 2) {
        	  jimScenarios.currentNode = -1;
        	  $("#infoContent .filterText").css({"display": ""});
        	}
        	
        	if (valid) {
			  deferred = handleNavigation(target, options);
        	}
        	else jimHighlight.highLightAll();
          }
          return deferred; /* returns deferred object to attach third-party callbacks, e.g. highlight comment-related component */
        }
      }
    }
  }
  /* END NAVIGATION */
  
  /*
   * HTML5 proposes native pickers for inputs. We must disable them to use the jQuery ones,
   * but mobile devices should use them to open the native widgets.
   */
  function changeInputType() {
	  $('#simulation').find('input[type="date"], input[type="time"], input[type="datetime-local"], input[type="email"], input[type="url"], input[type="number"]').each(function() {
		if(jQuery(this).attr("readonly"))
		  $("<input type='text' />").attr({ name: this.name, value: this.defaultValue, tabindex: this.tabIndex, readonly:"readonly" }).insertBefore(this);
		else $("<input type='text' />").attr({ name: this.name, value: this.defaultValue, tabindex: this.tabIndex }).insertBefore(this);
	  }).remove();
  }
  
  function isiOSDevice() {
	var userAgent = navigator.userAgent;
	var mobileTypes = {
	  ios: userAgent.match(/(iPhone|iPad|iPod)/)
	};

	if(mobileTypes.ios)
	  return true;
	else
	  return false;
 }
  
  /* START MAIN */
  window.popups = [];
  jimMain = {
    "path": path,
    "defaults": defaults,
    "init": function(home) {
      if(window.location.hash === "") {
        jimData.clearData();
        if(!jQuery.browser.msie) { /* IE: event.load -> init, while standard browser: init -> event.load */
          urlHistory.ignoreNextHashChange = true;
        }
        path.set(home);
      }
    },
    "getMainWindow": getMainWindow,
    "isPopup": isPopup,
    "navigate": navigate,
    "handleNavigation": handleNavigation,
    "unload": function() {
      jQuery(".pageunload").trigger("pageunload");
      defaults.canvasContainer.attr("class", "firer");
    }
  };
  
  window.jimMain = jimMain; /* expose to the global object */
  /* END MAIN */
  
  /* START EVENTS */
  jQuery(window)
    .bind("load", function() {
      jimLayout.load();
      if(window.jimMobile)
    	  window.jimMobile.load();
      jimData.load(window);
      if(jimUtil.isMobileDevice()){
    	  jQuery("body").removeClass("showComments");
    	  var topBar = jQuery("#topBarInfo");
    	  topBar.css("display","none");
    	  topBar.addClass("close");
      }
      else{
    	  window.jimComments.load();
      }
      if(window.location.hash !== "") {
	    handleNavigation(path.stripHash(location.hash));
      }

    })
    .bind("unload", function() {
      for(var p=0, pLen=window.popups.length; p<pLen; p+=1) {
        window.popups[p].close();
      }
      jimMain.unload();
      jimData.unload(window);
    });
  
  $('#chromeTransfer').bind('extensionInstalled', function () {
	  jimUtil.chromeExtension = true;
  });
  
  defaults.canvasContainer
    /*.bind("pagebeforechange", function(event, data) {}).bind("pagechangefailed", function(event, data) {})*/
    .bind("canvasunload", function(event, data) {
       jimMain.unload();
       if(window.jimMobile && !jimUtil.isMobileDevice()) {
    	 jimMobile.hideWidgets();
         jimMobile.resetWidgets();
       }
       if(typeof(annotation) !== "undefined") { annotation.unload(); }
    })
    .bind("canvasload", function(event, data) {
       if(!window.jimMobile || window.jimMobile && !jimUtil.isMobileDevice())
         changeInputType();
       //load specific details of iOS Safari browser
       if(isiOSDevice() && jQuery(".web, .mobilecustom").length>0) {
    	   var fileref=document.createElement("link");
    	   fileref.setAttribute("rel", "stylesheet");
    	   fileref.setAttribute("type", "text/css");
    	   fileref.setAttribute("href", "./resources/_jim/css/function-jim-common-ios.css");
    	   document.getElementsByTagName("head")[0].appendChild(fileref);
       }
    })
    .bind("aftertransition", function(event, data) {
      var $target = jQuery(event.target || event.srcElement);
      if($target.is(".ui-page")) {
    	$target = defaults.canvasContainer;
    	defaults.canvasContainer.find(".ui-page:not(."+defaults.activePageClass+")").remove();
    	/* TODO ensure all resources are loaded and effective */
    	defaults.canvasContainer.addClass(jimUtil.getCanvases().join(" "));
      }
      setTimeout(function() {
	  	window.jimComments.updateComments();
    	if($target.is("#simulation")) {
    	  $target.trigger("loadcomponent");
    	  
   	      var svgs = $("#simulation .datagrid div.image,#simulation .datalist div.image");
			jQuery.each(svgs, function (index, value) {
			var obj = $(value);
			var overlay = obj.attr("overlay");
			if (overlay != undefined) jimUtil.changeSVGColor(obj, overlay);
		  });
			
    	  jimUtil.wrapAllDataVerticalLayouts(); // Wrap vertical layouts in datagrids/datalists
    	  jimUtil.wrapAllDataHorizontalLayouts();
       	  $navigationTree.trigger("load", [urlHistory.getActive().url]);
    	  if(window.jimMobile && !jimUtil.isMobileDevice()) {
            jimMobile.loadComponents();
          }
    	  $target.find(".pageload").trigger("pageload");
    	  jimUtil.calculateMasterMinSize($target);
      	  if(typeof(annotation) !== "undefined") { annotation.load(); }
      	  if(!jimUtil.isMobileDevice() && jimComments.openCommentByID.length > 0) {
			jimComments.showComments(jimComments.openCommentByID);
			jimComments.openCommentByID = "";
		  }
		  else if(!jimUtil.isMobileDevice() && jimRequirements.openRequirementByID.length > 0) {
			jimRequirements.showRequirement(jimRequirements.openRequirementByID);
			jimRequirements.openRequirementByID = "";
		  }
	      if (!jimUtil.isMobileDevice()) jimRequirements.filterRequirements();
    	}
    	
    	var sidepanel = $("#sidepanel");
    	if (sidepanel.hasClass("toClose")) {
    	  $("#toggle-panel-btn > span").trigger('click');
          sidepanel.removeClass("toClose");
        }
    	
        var sim = $("#simulation");
        var toHighlight = sim.attr("toHighlight");
        if (toHighlight != undefined && toHighlight != "") 
          jimHighlight.highlightElement($("#"+toHighlight));
        sim.attr("toHighlight","");
        
      }, 100);
      
      jimScenarios.bindScreenEvents();
      jimScenarios.initializeScenarios();
    });
  /* END EVENTS */
})(window);
