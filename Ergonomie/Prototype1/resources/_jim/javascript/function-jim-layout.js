/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  var
  /*********************** START LOCAL FIELD DECLARATION ************************/
  minWidth = 230,
  sidePanelWidth = 250,
  hiddenClass = "hidden",
  $sidepanel = jQuery("#sidepanel"),
  $mainWindow = jQuery("#jim-mainWindow"),
  $topInfoPanel = jQuery("#infoContent .rightcontrols"),
  $toggleBtnPanel = jQuery("#toggle-btn-panel"),
  $hideBarBtn = jQuery("#top-bar-hide"),
  $navigation = jQuery("#sidepanel #navigation"),
  $navigationTree = jQuery("#sidepanel #navigationtree"),
  $comments = jQuery("#sidepanel #comments"),
  $commentGrid = jQuery("#sidepanel #comment-grid"),
  $screenTitle = jQuery("#sidepanel .screentitle"),
  $commentsAll = jQuery("#sidepanel #comments .comment-all"),
  $simulation = jQuery("#simulation"),
  $commentsBtnImg = jQuery("#comments-switch-img"),
  $topInfo = jQuery("#topBarInfo"),
  $jimBody = jQuery("#jim-body"),
  $topPanel = jQuery("#toppanel"),
  $showTopBar = jQuery("#top-bar-show"),
  $topSep = jQuery("#topSeparationLine"),
  $barHotspot = jQuery("#barHotspot"),
  $scenarioThumbnail = jQuery("#scenarioThumbnail"),
  $scenarioName = jQuery("#scenarioName"),
  $filterClose = jQuery("#closefilterImage");
  /************************ END LOCAL FIELD DECLARATION *************************/
  
  /*********************** START LOCAL METHOD DEFINITION ************************/
  function hasComments() {
    return jQuery("#sidepanel #comments").length !== 0;
  }
  
  function setSidePanelLayout(state) {
    if(state) {
      if(!state["sidepanel-open"]) {
        $sidepanel.trigger("closePane");
      }
      $sidepanel.width(state["sidepanel-width"]);
    }
  }
  
  function debug() {
    alert("\t\t\t\theight\twidth\n"+
        "simulationOffset:\t" + $simulation[0].offsetHeight + "\t\t" + $simulation[0].offsetWidth + "\n" +
        "simulationClient:\t" + $simulation[0].clientHeight + "\t\t" + $simulation[0].clientWidth + "\n" +
        "simulationScroll:\t" + $simulation[0].scrollHeight + "\t\t" + $simulation[0].scrollWidth + "\n" +
        "minimum:\t\t\t" + parseInt($simulation.css("min-height"),10) + "\t\t" + parseInt($simulation.css("min-width"),10) + "\n" +
        "screen:\t\t\t" + $simulation.height() + "\t\t" + $simulation.width() + "\n" +
        "htmlOffset:\t\t" + document.body.offsetHeight + "\t\t" + document.body.offsetWidth + "\n" +
        "htmlClient:\t\t" + document.body.clientHeight + "\t\t" + document.body.clientWidth + "\n" +
        "htmlScroll:\t\t" + document.body.scrollHeight + "\t\t" + document.body.scrollWidth + "\n");
  }
  
  function obtainScrollableItem() {
	var obj = $simulation;
    if (window.jimMobile) obj = $("#jim-body");
    
    return obj;
  }
  
  /************************ END LOCAL METHOD DEFINITION *************************/
  
  window.jimLayout = {
    "initialized": false,
    "startLayoutAnimation" : function () {
    	var obj = obtainScrollableItem(); 
    	
    	if (!jimUtil.hasYScrollBar(obj)) 
    	  obj.css("overflow-y", "hidden");
    	
    	if (!jimUtil.hasXScrollBar(obj)) 
    	  obj.css("overflow-x", "hidden");
    },
    "endLayoutAnimation" : function () {
    	var obj = obtainScrollableItem();
    	
    	obj.css("overflow-y", "");
    	obj.css("overflow-x", "");
    },
	"resizeTopInfo" : function () {
	  var topInfoWidth = $("#topBarInfo").outerWidth();
      var highlightSelect = $("#highlight-select");
      var separator = $("#comments-separator1");
      var infoContent = $("#infoContent #info");
      var closing = infoContent.hasClass("closing");
    
      var iPos = infoContent[0].getBoundingClientRect();
      var hPos = highlightSelect[0].getBoundingClientRect();
    
      if (!closing && iPos.right + 20 > hPos.left) {
		highlightSelect.stop().fadeOut();
		infoContent.stop().fadeOut().attr("topInfoWidth",topInfoWidth).addClass("closing");
		separator.stop().css("opacity",0);
      }
	  else if (closing && topInfoWidth > parseInt(infoContent.attr("topInfoWidth")) + 35) {
		highlightSelect.stop().hide().fadeIn();
		infoContent.stop().hide().fadeIn().removeClass("closing");
		separator.stop().css("opacity",1);
	  }
	},
    "load": function() {
      var $firer, delta;
      if(jimLayout.initialized === false) {
        setSidePanelLayout(jimData.layout);
		
        $filterClose.bind('click', function(event) {
          jimScenarios.deleteFilter();
        });
        
        $scenarioName.hover(function () {
          jimScenarios.activateThumbnail();
        }, function () {
          jimScenarios.closeThumbnail();
        });
        
		$topInfoPanel
		.children("#toggle-panel-btn").bind("click", function(event) {
            event.stopPropagation();
            $sidepanel.trigger(($sidepanel.hasClass("open")) ? "closePane" : "openPane");
            return false;
          });
		
		var topBarTimeout;
		
		function endBarShow(close) {
		  if (close) {
    		  jimUtil.refreshPageMinSize();
	          $showTopBar.addClass("open");
	          topBarTimeout = setTimeout(function () {$barHotspot.trigger('mouseout');}, 500);
		  }
		  else {
			  $topInfo.addClass("open").removeClass("close"); 
	          $barHotspot.removeClass("active");
	          $(document.body).addClass("showComments");
		  }
		  
		  setTimeout(function () {
			  $jimBody.removeClass("transitiontop");
			  jimUtil.refreshPageMinSize();
			  jimLayout.endLayoutAnimation();
		  }, 500);
		}
		
		$hideBarBtn.bind("click", function(event) {
          event.stopPropagation();
            
          if (!jimComments.commentsMode && !$jimBody.hasClass("transitiontop")) {
        	  jimLayout.startLayoutAnimation();
        	  $(".ui-page #backgroundBox").each(function () {
        		$(this).css("height", $(this).outerHeight() + 45);  
        	  });
        	  
	          $jimBody.addClass("transitiontop");
	          $topInfo.addClass("close").removeClass("open");
	          $barHotspot.addClass("active");
	          $(document.body).removeClass("showComments");
	          if ($sidepanel.hasClass("open")) $sidepanel.trigger("closePane");
	          setTimeout(function () {endBarShow(true)}, 500);
          }
        });
		
		$showTopBar.bind("click", function(event) {
		  if (!$jimBody.hasClass("transitiontop")) {
			jimLayout.startLayoutAnimation();
		    event.stopPropagation();	  
            $showTopBar.removeClass("open");
            $jimBody.addClass("transitiontop");
            setTimeout(function () {endBarShow(false)}, 500);
		  }
		});
		
		$barHotspot.hover(
		  function () {
			clearTimeout(topBarTimeout);
			var topBarTimeout = setTimeout(function () {
			  if ($barHotspot.is(":hover")) $showTopBar.addClass("open");
			}, 1500)
		  },
		  function () {
			clearTimeout(topBarTimeout);
			var topBarTimeout = setTimeout(function () {
			  if (!$barHotspot.is(":hover")) $showTopBar.removeClass("open");
			}, 1000);
		  }
		);

		$('.highlight-select').customMenu();
		$('.highlight span.customSelect').html("Highlight interactive areas");
		$('.highlight').css('display','inline-block');
        
        $sidepanel
	      .bind("openPane", function(event) {
			$sidepanel.css("width","");
	    	jimLayout.startLayoutAnimation();
	        $sidepanel.resizable("enable").removeClass("close").addClass("opening").addClass("open");
	        jimUtil.animateFitToScreen(-sidePanelWidth);
	        setTimeout(function () {jimLayout.resizeTopInfo();}, 500);
	      })
	      .bind("closePane", function(event) {
	    	var sidepanelW = $sidepanel.outerWidth();
	    	jimLayout.startLayoutAnimation();
	    	$jimBody.css("overflow", "hidden");
	    	$(".ui-page #backgroundBox").each (function () {
	    	  var width = $(this).outerWidth() + sidepanelW;
	    	  $(this).css("width", width + "px");
	    	})
			
			var shadow = $(".scenarioShadow");
	    	if (shadow.length > 0) {
	    	  var width = shadow.outerWidth() + sidepanelW;
	    	  shadow.css("width", width + "px");
	    	}
			
			$sidepanel.css("width","");
	        $sidepanel.removeClass("open").removeClass("opening").addClass("close").resizable("disable");
			jimUtil.animateFitToScreen($("#sidepanel").outerWidth());
			setTimeout(function () {jimLayout.resizeTopInfo();}, 500);
	      })
		  .bind('transitionend webkitTransitionEnd oTransitionEnd', function () {
			jimUtil.refreshPageMinSize();
			jimLayout.endLayoutAnimation();
		  })
          .resizable({
            "minWidth": 0,
            "handles": "w",
            "zIndex": 0,
            "stop": function(event,ui) {
              jQuery(this).height("");
              jimUtil.forceReflow();
            },
			"resize": function(event, ui) {
				$sidepanel.css("left","");
				$sidepanel.removeClass("opening");
				jimUtil.forceReflow();
			  }
          })
          .children("#toggle-panel-btn").bind("click", function(event) {
            event.stopPropagation();
            $sidepanel.trigger(($sidepanel.hasClass("open")) ? "closePane" : "openPane");
            return false;
          });
        
        jQuery(window).resize(function(event) {
          setSidePanelLayout();
          jimLayout.resizeTopInfo();
        });
        
        jimLayout.initialized = true;
      }
      
      if(jimMain.isPopup(window)) {
        $sidepanel.trigger("closePane");
         setTimeout(function () {
			  jimLayout.endLayoutAnimation();
		  }, 500);
      }
    },
    "setSidePanelLayout": setSidePanelLayout,
    "state": function() {
      var state = {
        "sidepanel-open": $sidepanel.hasClass("open"),
        "sidepanel-width": Math.max($sidepanel.width(), minWidth)
      };
      return state;
    }
  };
})(window);
