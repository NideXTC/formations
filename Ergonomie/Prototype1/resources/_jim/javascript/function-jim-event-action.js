/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  var $simulation = jQuery("#simulation"), dragZIndex = 3;
  
  jQuery.extend(jimEvent.fn, {
    "jimNavigation": function(args) {
      var historyEntry;
      if(args.isbackward) {
        historyEntry = urlHistory.getPrev() || jimMain.getMainWindow().urlHistory.getActive();
        args.target = historyEntry.url;
        jimMain.navigate(args);
      } else if(args.forward) {
        historyEntry = urlHistory.getNext() || jimMain.getMainWindow().urlHistory.getActive();
        args.target = historyEntry.url;
        jimMain.navigate(args);
      } else if(args.target) {
        jimMain.navigate(args);
      }
    },
    "jimCreateDrag": function(drag, args) {
      var self = this, $drag, paneWidth = jimUtil.getSidePanelWidth(), $target, $master, position, dragData, dragTargets;
      $target = self.getEventTarget(args.target);

      if($target.jimGetType() === itemType.panel) {
        $target = $target.parent();
      }
      if($target.jimGetType() === itemType.ellipse || 
    		  $target.jimGetType() === itemType.triangle ||
    		  $target.jimGetType() === itemType.callout) {
          $target = $target.closest("svg");
        }
      
      var posType = $target.css("position");
      var posTop = $target.css("top");
      var posLeft = $target.css("left");
      var isContainedInCC = false;
       
      $master = $target.parents(".master");
      if($master.length !== 0) {
        $target.wrap("<div id='" + $master.attr("id") + "' class='" + $master.attr("class").split(" ")[0] + "' />");
        $target = $target.parent();
        isContainedInCC=true;
      }
      
      var parent = $target.parent();
      if (parent.hasClass("verticalWrapper")) parent = parent.parent();
            
      position = $target.jimPosition();
      dragData = {
        "parent": parent,
        "isContained": args.containment,
        "top": position.top,
        "left": position.left,
        "containedInCC" : isContainedInCC,
        "startposition": {
          "type": posType,
          "top": posTop,
          "left": posLeft,
          "index": $target.index()
        }
      };

      var wrapper = $target.closest(".layout.horizontal");
      $target.appendTo($target.parents(".template, .screen"))
             .css({"position": "absolute", "top": dragData.top, "left": dragData.left, "z-index": dragZIndex++})
             .data("jimDrag", dragData);
      
	  if (wrapper.hasClass(".verticalWrap")) jimUtil.wrapVerticalLayout(wrapper);
	  else if (wrapper.attr("hspacing") != 0 || wrapper.attr("vspacing") != 0) jimUtil.wrapHorizontalLayout(wrapper);

      $drag = jQuery(drag); /* $drag and $target might not be the same (multidrag) */
      dragTargets = jimUtil.exists($drag.data("jimDragTargets")) ? $drag.data("jimDragTargets") : [];
      dragTargets.push($target);
      $drag.data("jimDragTargets", dragTargets);

      return dragData;
    },
    "jimRestoreDrag": function($drag) {
      var dragTargets, $target, dragData, i, iLen;
      dragTargets = $drag.data("jimDragTargets");
      if(dragTargets) {
	    for(i=0, iLen=dragTargets.length; i<iLen; i+=1) {
	      $target = jQuery(dragTargets[i]);
	      dragData = $target.data("jimDrag");
	      if(dragData.isContained) {
	        jimUtil.insertInto({"target": $target, "parent": dragData.parent});
	      }
	    }
      }
    },
    "jimDestroyDrag": function($drag) {
      var dragTargets, i, iLen;
      dragTargets = $drag.data("jimDragTargets");
      if(dragTargets) {
        for(i=0, iLen=dragTargets.length; i<iLen; i+=1) {
          jQuery(dragTargets[i]).removeData("jimDrag");
        }
        $drag.removeData("jimDragTargets");
      }
    },
    "jimMove": function(args, callback) {
      if(jimUtil.exists(args)) {
        var self = this, $target, eventData, dragData, position, newTopPosition, newLeftPosition, $parent, containment, $svg, effect;
        var CCWrapper=true;
        var properties = {};
        $target = self.getEventTarget(args.target);
        if($target.length) {
          var topType = args.top.type;
          var leftType = args.left.type;
        	
          //exception for drag and drop (find another way)
          $master = $target.parents(".master");
          if($master.length !== 0 && (topType=="movewithcursor" || leftType=="movewithcursor")) {
            $target = $master;
          }
          $parent = $target.parent();
          
          eventData = self.event.data;
          effect = jimUtil.createAnimationOptions(args.effect, callback);
          
          if(topType=="movewithcursor" || leftType=="movewithcursor") {
            dragData = $target.data("jimDrag");
	        if(!jimUtil.exists(dragData)) {
	          dragData = self.jimCreateDrag(eventData.target, args);
	        }
	        if (args.containment)
	          $parent = dragData.parent;
          }
          if(topType=="movetodragstart" || leftType=="movetodragstart") {
          	dragData = $target.data("jimDrag");
            if(jimUtil.exists(dragData)) {
              if(dragData.containedInCC && CCWrapper) {
            	/*destroy wrapper*/  
            	$target = $target.children();
            	$target.unwrap();
            	/*get target again with a different selector*/
            	$target = self.getEventTarget(args.target);
            	$parent = $target.parent();
            	CCWrapper=false;
              }
            	  
              jQuery.extend(properties, {"index": dragData.startposition.index});
              jQuery.extend(properties, {"type": dragData.startposition.type});
              jimUtil.insertInto({"target": $target, "parent": dragData.parent, "position":properties, "checkIntersect":false});
            }
          }
          
          /*position TOP*/
          switch(topType) {
	        case "movewithcursor":
		      position = {
		     	"top": dragData.top
		      };
		      if(dragData.insertInto){
		    	  position.top -= dragData.insertInto.jimPosition().top;
		      }
	          newTopPosition = position.top + (eventData.deltaY*(1/jimUtil.getTotalScale()));
	          break;
	        case "movetodragstart":
	          newTopPosition = dragData.startposition.top;
	          break;
	        case "movebyoffset":
	          position = $target.position();
	          position.top += $target.parent().scrollTop();
	          position.top = position.top *(1/jimUtil.getTotalScale());
	
			  newTopPosition = position.top + parseInt(self.evaluateExpression(args.top.value),10);  
	          break;
	        case "movetoposition":
	        case "exprvalue":
	          newTopPosition = parseInt(self.evaluateExpression(args.top.value),10);
	          break;
          }
          if(jimUtil.exists(newTopPosition) && !isNaN(parseInt(newTopPosition, 10))) {
	        if (args.containment) {
	          var parentPositionTop = 0;
	          /*move with cursor*/
	          if($parent.get(0) !== $target.parent().get(0))
	        	parentPositionTop = $parent.jimPosition().top;
	          containment = {
	            "top": parentPositionTop + parseInt($parent.css("border-top-width"),10) + parseInt($parent.css("padding-top"),10),
	            "bottom": parentPositionTop + $parent.innerHeight() - $target.jimOuterHeight() + parseInt($parent.css("border-top-width"),10),
	          };
	          newTopPosition = Math.min(containment.bottom, Math.max(containment.top, newTopPosition));
	        }
	        jQuery.extend(properties, {"top": newTopPosition});
          }
       
          /*position LEFT*/
          switch(leftType) {
	        case "movewithcursor":
	          position = {
	            "left": dragData.left
	          };
		      if(dragData.insertInto){
		    	  position.left -= dragData.insertInto.jimPosition().left;
		      }
	          newLeftPosition = position.left + (eventData.deltaX*(1/jimUtil.getTotalScale()));
	          break;
	        case "movetodragstart":
	            newLeftPosition = dragData.startposition.left;
	          break;
	        case "movebyoffset":
	          position = $target.position();
			  position.left += $target.parent().scrollLeft();
			  position.left = position.left *(1/jimUtil.getTotalScale());
	
			  newLeftPosition = position.left + parseInt(self.evaluateExpression(args.left.value),10);
	          break;
	        case "movetoposition":
	        case "exprvalue":
	          newLeftPosition = parseInt(self.evaluateExpression(args.left.value), 10);
	          break;
          }
        
          if(jimUtil.exists(newLeftPosition) && !isNaN(parseInt(newLeftPosition, 10))) {
	        if (args.containment) {
	          var parentPositionLeft = 0;
	          /*move with cursor*/
	          if($parent.get(0) !== $target.parent().get(0))
	        	parentPositionLeft = $parent.jimPosition().left;
	          containment = {
	             "left": parentPositionLeft + parseInt($parent.css("border-left-width"),10) + parseInt($parent.css("padding-left"),10),
		         "right": parentPositionLeft + $parent.innerWidth() - $target.jimOuterWidth() + parseInt($parent.css("border-left-width"),10)
	          };
	          newLeftPosition = Math.min(containment.right, Math.max(containment.left, newLeftPosition));
	        }
	        jQuery.extend(properties, {"left": newLeftPosition});
	      }
        
	      if(args.effect)
			$target.animate(properties, effect);
		  else
			$target.css(properties);
      
		  if(topType=="movewithcursor" || leftType=="movewithcursor")
		    self.triggerDragOver($target);
		  
		  var vWrap = $target.closest(".layout.horizontal");
		  if(vWrap.length > 0 && (topType=="movetodragstart" || leftType=="movetodragstart")) {
			$target.css({"position": "", "top": "", "left": "", "display" : ""});
			jimUtil.wrapLayout($target);
		  }
			  
		  jimUtil.calculateMasterMinSize($target);
		  jimUtil.refreshPageMinSizeWithTarget($target);
		}
		if(callback && !args.effect) { callback(); }
	  }
    },
    "jimInsert": function(args, callback) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $target, $parent,dragData;
        $target = self.getEventTarget(args.target);
        $parent = self.getEventTarget(args.parent);
        dragData = $target.data("jimDrag");
        if(dragData && (!dragData.insertInto || dragData.insertInto.get(0) != $parent.get(0))){
	        dragData.insertInto = $parent;
        }
        if(jimUtil.exists($target) && jimUtil.exists($parent)) {
          switch(self.event.type) {
            case "dragend":
              jimUtil.insertInto({"target": $target, "parent": $parent, "event": self.event});
              break;
            default:
              jimUtil.insertInto({"target": $target, "parent": $parent});
              break;
          }
        }
        if(callback) { callback(); }
        
        var vWrap = $target.closest(".layout.horizontal");
        if (vWrap.length > 0) {
          if (dragData && vWrap.hasClass("verticalWrap")) $target.css({"position": "", "top": "", "left": "", "display" : ""});
          jimUtil.wrapLayout($target);
        }
      }
    },
    "jimShow": function(args, callback) {
      var self = this;
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
    	/*exception: groups have no z-index*/
    	var $target = self.getEventTarget(args.target);
    	/*if panel is target and already visible, transitions won't work as promises don't fire back.*/
    	var samePanel = false;
		switch($target.jimGetType()) {
          case itemType.panel:
			var activePanel = $target.parent().find(":visible");
			if($(activePanel).is($target)) {
			  samePanel = true;
			  if(callback) { callback(); }
			}
			break;
		}

		if(!samePanel) {
    	  if($target.hasClass("group")) {
    		$target.css("z-index","2");
          }
          switch($target.jimGetType()) {
            case itemType.panel:
              $target.trigger("panelactive");
              break;
          }
          jimUtil.show(self.getEventTarget(args.target), args).done(function() {
            if($target.hasClass("group")){
        	  $target.css("z-index","");
            }
            jimUtil.calculateMasterMinSize($target);
            jimUtil.refreshPageMinSizeWithTarget($target);
            if(callback) { callback(); }
          });
          jimUtil.wrapLayout($target, $target);
        }
      }
    },
    "jimHide": function(args, callback) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, t, tLen, $tree, options;
       
        $targets = self.getEventTarget(args.target);
        if(jimUtil.exists($targets)) {
          for(t=0, tLen=$targets.length; t<tLen; t+=1) {
            $target = jQuery($targets[t]);

            if($target.jimGetType() === itemType.panel) {
              break;
            }
            if(args.effect) {
              /* TODO: add .stop() to interrupt animation */
               if(t==tLen-1)
            	options = jimUtil.createUIEffectOptions(args.effect,callback);
               else
            	options = jimUtil.createUIEffectOptions(args.effect);
               
              var layoutComplete = function () {jimUtil.wrapLayout($target);};
              if (!options.hasOwnProperty("complete")) jQuery.extend(options, {"complete": layoutComplete});
              else setTimeout(layoutComplete, options["duration"] + 100);
              
              $target.show().hide(options);
            } else {
              $target.hide();
            }
            /* start special component behavior */
            jQuery(args.target + "-submenu").hide();
            $tree = ($target.hasClass("tree")) ? $target : $target.parents(".tree");
            if($tree.length) {
              jQuery.fn.jimTree.update($tree);
            }
            /* end special component behavior */
          }
        }
        jimUtil.calculateMasterMinSize($target);
        jimUtil.refreshPageMinSizeWithTarget($target);
        if (!args.effect) jimUtil.wrapLayout($target);
        if(callback && !args.effect) { callback(); }
      }
    },
    "jimChangeStyle": function(args, callback) {
      if(args) {
        var self = this, s, sLen, style, target, $target, expression, bShape, shapeStyle, calculatedValue;
        for(s=0, sLen=args.length; s<sLen; s+=1) {
          style = args[s];
          shapeStyle = args[s];
          for(target in style) {
            if(style.hasOwnProperty(target)) {
              $target = self.getEventTarget(target);
              if($target) {
            	bShape=false;
                if($target.jimGetType() === itemType.shapewrapper) {
                  $target = $target.find(".shape");
                  bShape=true;
                }
                if(typeof shapeStyle[target].attributes == 'undefined') {
                  shapeStyle[target].attributes = {};
                }
                if(typeof shapeStyle[target].expressions == 'undefined') {
                  shapeStyle[target].expressions = {};
                }
                	  
                if(style[target].attributes) {
                  for(attribute in style[target].attributes) {
                    if(style[target].attributes.hasOwnProperty(attribute)) {
                      calculatedValue = style[target].attributes[attribute];	
                      if(attribute==="width" || attribute==="height") {
                        calculatedValue = (isNaN(parseInt(style[target].attributes[attribute], 10))) ? eval(style[target].attributes[attribute]) : style[target].attributes[attribute];
                      }
                      shapeStyle[target].attributes[attribute] = calculatedValue;
                      try {
                    	var i=attribute.indexOf('#');
                    	var cssAttrName=attribute;
                    	if(i!=-1) {
                    	  cssAttrName=attribute.substring(0,i);
                    	}
                    	
                    	if($target.is(".datagrid") && (cssAttrName==="padding-left" || cssAttrName==="padding-top")) {
                    	  if(cssAttrName==="padding-left"){
                    		$target.attr("hSpacing",calculatedValue);
                    	  }
                    	  if(cssAttrName==="padding-top"){
                    		$target.attr("vSpacing",calculatedValue);
                    	  }
                    	  $target.dataview("updateDataGridBounds");
                    	} else {
	                      var domObject=$target.get(0);
	                      if(domObject.css2svg && domObject.css2svg[attribute]) {                      	  
	                        domObject.css2svg[attribute]=calculatedValue;
	                      } else {
	                    	if (cssAttrName == "overlay") {
	                    	  if (calculatedValue != "none" && calculatedValue != "") 
	                    	    jimUtil.changeSVGColor($target, calculatedValue);
	                    	  else jimUtil.removeSVGColor($target);
	                    	}
	                    	else
	                      	  $target.css(cssAttrName, calculatedValue);
	                      }  
                    	}
                      } catch (error) {
                        jimUtil.debug(error);
                      }
                    }
                  }
                  
                  if (style[target].hasOwnProperty("html")) {
                	$target.closest("div").html(style[target]["html"]);
                  }
                  
                }
                try {
                  for(expression in style[target].expressions) {
                    if(style[target].expressions.hasOwnProperty(expression)) {
                      try {
                        calculatedValue = (isNaN(parseInt(style[target].expressions[expression], 10))) ? eval(style[target].expressions[expression]) : style[target].expressions[expression];
                        $target.css(expression, calculatedValue);
                        shapeStyle[target].attributes[expression] = calculatedValue;
                      } catch (error) {
                        jimUtil.debug(error);
                      }
                    }
                  }
                } catch(e) {
                  jimUtil.debug(e); /* IE has problems with gradient expression, expects "url" attribute */
                }
                if(jQuery.browser.msie) {
                  if(style[target]["attributes-ie"]) {
            	    for(attribute in style[target]["attributes-ie"]) {
                      if(style[target]["attributes-ie"].hasOwnProperty(attribute)) {
                        shapeStyle[target].attributes[attribute] = style[target]["attributes-ie"][attribute];
                        try {
                          var domObject=$target.get(0);
                          if(domObject.css2svg && domObject.css2svg[attribute]){
                        	  domObject.css2svg[attribute]=style[target]["attributes-ie"][attribute];
                          } else {
                        	  $target.css(attribute, style[target]["attributes-ie"][attribute]);
                          }
                          //TODO: sólo pie-background y bordes redondeados
                          if(window.PIE) {
                            $target.each(function() {
                              var reattachPIE = true;
                                
                              if($.browser.msie && $.browser.version == 9) { 
    							var backgroundColor = args[0][target]["attributes"]["background-color"],
    								hasBorderRadius = parseInt($target.css("border-top-left-radius"))>0 || parseInt($target.css("border-top-right-radius"))>0 || parseInt($target.css("border-bottom-left-radius"))>0 || parseInt($target.css("border-bottom-right-radius"))>0;
    								pieBackground = style[target]["attributes-ie"]["-pie-background"];
    								
    							if(backgroundColor!==undefined) {
    							  var argColor = jimUtil.rgbToHex(backgroundColor);
    							  if((pieBackground.toLowerCase() === argColor.toLowerCase() || pieBackground.toLowerCase() === backgroundColor.toLowerCase()) && !hasBorderRadius) {
    								reattachPIE=false;
    								PIE.detach();
    							  }
    							}
							  }
							  if(reattachPIE && !$target.hasClass("shape")) {
								PIE.detach(this);
								PIE.attach(this);
							  }
                            });
                          }
                        } catch (error) {
                          jimUtil.debug(error);
                        }
                      }
                    }
                  }
                  try {
                    for(expression in style[target]["expressions-ie"]) {
                      if(style[target]["expressions-ie"].hasOwnProperty(expression)) {
                        calculatedValue = (isNaN(parseInt(style[target]["expressions-ie"][expression], 10))) ? eval(style[target]["expressions-ie"][expression]) : style[target]["expressions-ie"][expression];
                        $target.css(expression, calculatedValue);
                        shapeStyle[target].attributes[expression] = calculatedValue;
                      }
                    }
                  } catch (e) {
                    jimUtil.debug(e);
                  }
                  
                  if(jQuery.browser.version<=8) {    
                    if(style[target]["attributes-ie8lte"]) {
                      for(attribute in style[target]["attributes-ie8lte"]) {
                        if(style[target]["attributes-ie8lte"].hasOwnProperty(attribute)) {
                          shapeStyle[target].attributes[attribute] = style[target]["attributes-ie8lte"][attribute];
                          $target.css(attribute, style[target]["attributes-ie8lte"][attribute]);      
                        }
                      }   
                    }
                    try {
                      for(expression in style[target]["expressions-ie8lte"]) {
                        if(style[target]["expressions-ie8lte"].hasOwnProperty(expression)) {
                          calculatedValue = (isNaN(parseInt(style[target]["expressions-ie8lte"][expression], 10))) ? eval(style[target]["expressions-ie8lte"][expression]) : style[target]["expressions-ie8lte"][expression];
                          $target.css(expression, calculatedValue);
                          shapeStyle[target].attributes[expression] = calculatedValue;
                        }
                      }
                    } catch (e) {
                      jimUtil.debug(e);
                    }
                  }
                }
                if($target.is(".datagrid")) {
                  $target.dataview("updateDataGridBounds");
                }
                jimUtil.forceReflow();
                if(bShape) {
                  $target.each(function() {
                	jimShapes.updateStyle(this,shapeStyle[target]);
                  });
                }
              }
            }
          }
        }
        if(callback) { callback(); }
      }
    },
    "jimEnable": function(args, callback) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, $icon;
        $targets = self.getEventTarget(args.target);
        if(jimUtil.exists($targets) && $targets.length) {
          $targets.each(function(i, target) {
            $target = jQuery(target);
            switch($target.jimGetType()) {
              case itemType.text:
              case itemType.password:
                $target.find("input").removeAttr("readonly");
                break;
              case itemType.file:
                $target.find(".icon").removeAttr("readonly").next("input[type='file']").removeAttr("disabled").removeClass("hidden");
                break;
              case itemType.textarea:
                  $target.find("textarea").removeAttr("readonly");
                  break;
              case itemType.date:
              case itemType.time:
              case itemType.datetime:
            	$target.find("input").removeAttr("readonly");
                $target.find(".icon").removeAttr("readonly");
                if(!window.jimMobile || (window.jimMobile && !jimMobile.isIOS())) {
           	     $target.find("input").each(function(){
           	    	 var $date = jQuery(this);
           	          $.datepicker._enableDatepicker($date[0]);
           	          $date.removeAttr("disabled");
           	     });
                }
                break;
              case itemType.radiobuttonlist:
              case itemType.checkboxlist:
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("tr.disabled").hide().end().find("tr.enabled").show().find("input").removeAttr("disabled");
                } else {
                  $target.removeAttr("readonly").find("input").removeAttr("disabled");
                }
                break;
              case itemType.checkbox:
              case itemType.radiobutton:
                $target.removeAttr("disabled");
                break;
              case itemType.dropdown:
              case itemType.nativedropdown:
                $target.removeAttr("readonly");
                $target.find("select").removeAttr("disabled");
                break;
              case itemType.selectionlist:
              case itemType.multiselectionlist:
                $target.removeAttr("readonly");
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("td.disabled").hide().prev("td.enabled").show();
                }
                break;
              default:
                $target.removeAttr("readonly");
                break;
            }
          });
          
          if(callback) { callback(); }
        }
      }
    },
    "jimDisable": function(args, callback) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, $icon;
        $targets = self.getEventTarget(args.target);
        if(jimUtil.exists($targets) && $targets.length) {
          $targets.each(function(i, target) {
            $target = jQuery(target);
            switch($target.jimGetType()) {
              case itemType.text:
              case itemType.password:
                $target.find("input").attr("readonly", "readonly");
                break;
              case itemType.file:
                $target.find(".icon").attr("readonly", "readonly").next("input[type='file']").attr("disabled", "disabled").removeClass("hidden").addClass("hidden");
                break;
              case itemType.textarea:
                  $target.find("textarea").attr("readonly", "readonly");
                  break;
              case itemType.date:
              case itemType.time:
              case itemType.datetime:
            	$target.find("input").attr("readonly", "readonly");
                $target.find(".icon").attr("readonly", "readonly");
                if(!window.jimMobile || (window.jimMobile && !jimMobile.isIOS())) {
              	     $target.find("input").each(function(){
              	    	 var $date = jQuery(this);
              	          $.datepicker._disableDatepicker($date[0]);
              	     });
                }
                break;
              case itemType.radiobuttonlist:
              case itemType.checkboxlist:
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("tr.disabled").show().end().find("tr.enabled").hide().find("input").attr("disabled", "disabled");
                } else {
                  $target.attr("readonly", "readonly").find("input").attr("disabled", "disabled");
                }
                break;
              case itemType.checkbox:
              case itemType.radiobutton:
                $target.attr("disabled", "disabled");
                break;
              case itemType.dropdown:
              case itemType.nativedropdown:
                $target.attr("readonly", "readonly");
                $target.find("select").attr("disabled", "disabled");
                break;
              case itemType.selectionlist:
              case itemType.multiselectionlist:
                $target.attr("readonly", "readonly");
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("td.disabled").show().prev("td.enabled").hide();
                }
                break;
              default:
                $target.attr("readonly", "readonly");
              break;
            }
          });
          
          if(callback) { callback(); }
        }
      }
    },
    "jimFocusOn": function(args, callback) {
    	 var self = this;
         if(args && args.target) {
           jimUtil.jimFocusOn(self.getEventTarget(args.target));
           if(callback) { callback(); }
         }
    },
    "jimScrollTo": function(args, callback) {
        var self = this, settings = {};
        if(args && args.target) {
          if(args.effect) {
        	jQuery.extend(settings, {"effect": jimUtil.createAnimationOptions(args.effect, callback)});
          }	
          if(args.axis){
        	jQuery.extend(settings, {"scroll": args.axis});
          }
          jimUtil.jimPointTo(self.getEventTarget(args.target), settings);
          if(callback && !args.effect) { callback(); }
        }
      },
    "jimSetValue": function(args, instance, callback) {
      if(jimUtil.exists(args)) {
        var self = this, $targets, $target, type, i, iLen, value, $options = [];
		var bShape =false;
        value = self.evaluateExpression(args.value, instance);
        if(jimUtil.exists(value)) {
          if(args.variable) {
        	var triggerVariableChange = jimData.get(args.variable) != value;
            jimData.set(args.variable, value);
            if(triggerVariableChange) 
            	jQuery("html").trigger("variablechange", [{"variableTarget": args.variable}]);
          } else if(args.target) {
            $targets = self.getEventTarget(args.target);
            if($targets) {
              for(i=0, iLen = $targets.length; i < iLen; i += 1) {
                $target = jQuery($targets[i]);
                type = $target.jimGetType();
                switch(type) {
                  case itemType.shapewrapper:
                	bShape=true;
                  case itemType.richtext:
                  case itemType.textcell:
                  case itemType.rectangle:
                  case itemType.button:
                  case itemType.label:
                    $target.find(".valign span:first").html(jimUtil.toHTML(value));
                    $target.find(".valign span").slice(1).remove();
                    jimUtil.wrapLayout($target);
                    break;
                  case itemType.index:
                  case itemType.summary:
                    /* ignore */
                    break;
                  case itemType.image:
                    /* $target.attr("src", jimUtil.encodeURI(value)); */
                    try {
                      var data = $target.data();
                      if (value.endsWith(".svg")) {
                        $.get(value, function(svg){
                          var id = $target.prop("id");
                    	  var width = $target.css("width");
                    	  var height = $target.css("height");
                    	  var overlay = $target.attr("overlay");
                    	  if (args.aspectratio == undefined || !args.aspectratio == "true") svg = svg.replace("<svg", "<svg preserveAspectRatio='none'");
                      	  svg = svg.replace(/(\.[a-z0-9A-Z\-_]+\s*\{)/g, "#" + id + " " + "$1");
                    	  
                    	  if ($target.prop("tagName") == "IMG") {
                    		$target.parent().append("<div id='"+ id +"' class='" + $target.prop("class") +
                    								"' alt='" + $target.prop("alt") + "' style='" +
													$target.attr("style") + "' overlay='"+ ((overlay != undefined) ? overlay : "none") + "'>");
                    		$target.remove();
                    		$target = $("#"+ id);
                    	  }
                    	  
                  		  $target.html(svg);  
                		  $target.children().css({"width":width,"height":height});
                		  $target.data(data);
                		  $target.attr("systemname", value);
                		  
                		  if (overlay != undefined && overlay != "none" && overlay != "") jimUtil.changeSVGColor($target, overlay);
                        }, 'text');
                      } else {
                        if ($target.prop("tagName") == "DIV") {
                    	  var id = $target.prop("id");
                    	  var overlay = $target.attr("overlay");
                     	  $target.parent().append("<img id='"+ id +"' class='" + $target.prop("class") +
                     	  						  "' alt='" + $target.prop("alt") + "' style='" + $target.attr("style") +
												  "' overlay='"+ ((overlay != undefined) ? overlay : "none") + "'>");
                		  $target.remove();
                		  $target = $("#"+id);
                        }
                        value = value.replace("%", "%25");
                        value = value.replace("#", "%23");
                        $target.attr("src", value);
                        $target.data(data);
                      }
                    } catch (e) {}
                    break;
                  case itemType.text:
                  case itemType.password:
                  case itemType.date:
                  case itemType.time:
                  case itemType.datetime:
                    $target.find("input").val(jimUtil.fromHTML(value));
                    break;
                  case itemType.file:
                    try {
                      $target.find("input").val(jimUtil.fromHTML(value));
                    } catch(error) {
                      switch(error.name) {
                        case "NS_ERROR_DOM_SECURITY_ERR":
                            /* silent ignore */
                          break;
                        default:
                          break;
                      }
                    }
                    break;
                  case itemType.textarea:
                    $target.find("textarea").val(jimUtil.fromHTML(value));
                    break;
                  case itemType.checkbox:
                  case itemType.radiobutton:
                  	if(window.jimMobile && window.jimMobile.isIOS()) {
                      $target.trigger("mousedown");
                      $target.trigger("mouseup");
                  	}else{
                  		if(value.toString() === "false") {
                  			$target.attr("checked", false);
                  		} else if (value.toString() === "true") {
                  			$target.attr("checked", true);
                  		}
                    }
                    break;
                  case itemType.dropdown:
                  case itemType.nativedropdown:
                    $target.children(".dropdown-options").html(jimEvent.getHtml(type, jimUtil.toArray(value)));
                    self.jimSetSelection({"target": $target, "value": $target.children(".dropdown-options").children(".option:first").text()});
                    break;
                  case itemType.selectionlist:
                  case itemType.multiselectionlist:
                    if(jimEvent.isInDataDataRow($target)) {
                      $target.find("td.disabled").html(jimUtil.toHTML(value));
                    } else {
                      $target.find("td").html(jimEvent.getHtml(type, jimUtil.toArray(value)));
                    }
                    break;
                  case itemType.radiobuttonlist:
                  case itemType.checkboxlist:
                    if(jimEvent.isInDataDataRow($target)) {
                      $target.find("tr.disabled td").html(jimUtil.toHTML(value));
                    } else {
                      $target.find("tbody").html(jimEvent.getHtml(type, jimUtil.toArray(value), $target));
                    }
                    break;
                  case itemType.datalist:
                  case itemType.datagrid:
                    $target.dataview("update", value, self.event);
                    jimUtil.wrapLayout($target);
                    break;
                } 			
                 if(bShape && $target.hasClass("autofit")){
					 shapeStyle = {};
					 shapeStyle.attributes = {"width":parseInt($target.css('width')), "height":"auto", "text-height":parseInt($target.find(".content").css('height'))};
					 jimShapes.updateStyle($target.find(".shape")[0],shapeStyle);
                 }
              }
            }
          }
        }
        if(callback) { callback(); }
      }
    },
    "jimSetSelection": function(args, instance, callback) {
      if(jimUtil.exists(args) && jimUtil.exists(args.value) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, type, value = "", $options, $option, option, t, tLen, o, oLen, v, vLen;
        if (args.value.datamaster) {
          jimData.set(args.target, jimGetDataInstanceIds(args.value.source));
        } else {
          value = self.evaluateExpression(args.value, instance);
          $targets = self.getEventTarget(args.target);
          if(jimUtil.exists($targets)) {
            for(t=0, tLen=$targets.length; t<tLen; t+=1) {
              $target = jQuery($targets[t]);
              type = $target.jimGetType();
              switch(type) {
                case itemType.dropdown:
                case itemType.nativedropdown:
                  $options = $target.children(".dropdown-options").children(".option").removeClass("selected");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    option = $options[o];
                    if(option.textContent === value || option.innerText === value || (option.textContent != undefined && option.textContent.replace(/\s/g, '&nbsp;') === value.replace(/\s/g, '&nbsp;')) || (option.innerText != undefined && option.innerText.replace(/\s/g, '&nbsp;') === value.replace(/\s/g, '&nbsp;'))) {
                      jQuery(option).attr("selected","selected");
                      $target.find(".value").html(jimUtil.toHTML(value));
                      break;
                    }
                  }
                  break;
                case itemType.selectionlist:
                  $options = $target.find(".option").removeClass("selected");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    if($option.text() === value || $option.text().replace(/\s/g, '&nbsp;') === value.replace(/\s/g, '&nbsp;')) {
                      $option.addClass("selected");
                      if(jimEvent.isInDataDataRow($target)) {
                        $target.find("td.disabled").html(jimUtil.toHTML(value));
                      }
                      break;
                    }
                  }
                  break;
                case itemType.multiselectionlist:
                  value = jimUtil.toArray(value);
                  $options = $target.find(".option").removeClass("selected");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    for(v=0, vLen=value.length; v<vLen; v+=1) {
                      if($option.text() === value[v] || $option.text().replace(/\s/g, '&nbsp;') === value[v].replace(/\s/g, '&nbsp;')) {
                        $option.addClass("selected");
                        if(jimEvent.isInDataDataRow($target)) {
                            $target.find("td.disabled").html(jimUtil.toHTML(value));
                        }
                        break;
                      }
                    }
                  }
                  break;
                case itemType.radiobuttonlist:
                  var search = "input";
                  if(window.jimMobile && window.jimMobile.isIOS()) {
                	  search = "div";
                  }
                  $options = $target.find(search).removeAttr("checked").end().find(".option");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    if($option.text() === value || $option.text().replace(/\s/g, '&nbsp;') === value.replace(/\s/g, '&nbsp;')) {
                      if(window.jimMobile && window.jimMobile.isIOS())
                        jQuery($option.prev(search)[0]).attr("checked", true);
                      else $option.prev(search)[0].checked = true;
                      //disabled inside data grid
                      if(jimEvent.isInDataDataRow($target)) {
                        $target.find("tr.disabled td").html(jimUtil.toHTML(value)); 
                      }
                      break;
                    }
                  }
                  break;
                case itemType.checkboxlist:
                  value = jimUtil.toArray(value);
                  var search = "input";
                  if(window.jimMobile && window.jimMobile.isIOS()) {
                	  search = "div";
                  }
                  $options = $target.find(search).removeAttr("checked").end().find(".option");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    for(v=0, vLen=value.length; v<vLen; v+=1) {
                      if($option.text() === value[v] || $option.text().replace(/\s/g, '&nbsp;') === value[v].replace(/\s/g, '&nbsp;')) {
                    	if(window.jimMobile && window.jimMobile.isIOS())
                    	  jQuery($option.prev(search)[0]).attr("checked", true);
                    	else $option.prev(search)[0].checked = true;
                    	//disabled inside data grid
                        if(jimEvent.isInDataDataRow($target)) {
                            $target.find("tr.disabled td").html(jimUtil.toHTML(value)); 
                        }
                        break;
                      }
                    }
                  }
                  break;
              }
            }
          }
        }
        if(callback) { callback(); }
      }
    },
    "jimPause": function(args, callback) {
      var self = this, $firer, undoPauseStack;
      if(jimUtil.exists(args)) {
        if(self.event.backupState) {
          $firer = self.getEventFirer();
          undoPauseStack = $firer.data("jimUndoPauseStack");
          if(!jimUtil.exists(undoPauseStack)) {
            undoPauseStack = [];
          }
          undoPauseStack.push(setTimeout(callback, args.pause));
          $firer.data("jimUndoPauseStack", undoPauseStack);
         } else {
          jimEvent.pauseStack.push(setTimeout(callback, args.pause));
         }
      }
    },
    "jimResize": function(args, callback) {
      if(jimUtil.exists(args)) {
        var self = this, $targets, $target,$parent, type, i, iLen, width, height, bShape, shapeStyle;
        if(args.target) {
          $targets = self.getEventTarget(args.target,undefined,"jimResize");
          if($targets) {
            for(i=0, iLen = $targets.length; i < iLen; i += 1) {
              $target = jQuery($targets[i]);
              var vWrap = $target.closest(".layout.wrap");
              if ($target.is(".table, .datagrid, .datalist, .panel")) vWrap = $target.find("."+$target.attr('id').replace(/\br[0-9]*_/,"").substring(2)+".wrap");
              else if ($target.is(".cellcontainer") || $target.is(".gridcell") || $target.is(".datacell")) {
            	var parent = $target.closest(".table, .datagrid, .datalist");
            	vWrap = parent.find("."+parent.attr('id').replace(/\br[0-9]*_/,"").substring(2)+".wrap");
              }
              
              bShape=false;
              if($target.jimGetType() === itemType.panel)
                $parent = $target.closest(".dynamicpanel").parent();
              else if($target.is(".cellcontainer") || $target.is(".datacell") || $target.is(".textcell") )
                $parent = $target.closest(".table, .datalist");
              else
                $parent = $target.parent();
                            
              if($target.jimGetType() === itemType.shapewrapper) {
                bShape=true;
              }    
                            
              if($parent.closest(".firer").is(".screen, .template"))   
                $parent = $parent.closest(".ui-page"); 
                            
              if(args.width && args.width.type!=="noresize") {
                width = self.evaluateExpression(args.width.value); 
                if(args.width.type==="parentrelative" && jimUtil.exists($parent)) {
                  var percentage = width;
                  width = jimUtil.getScrollContainerSize($parent).width;
                  if(jimUtil.exists(percentage) && !isNaN(parseInt(percentage, 10)))
                    width = width / 100 * percentage;
                }
                            
                if(jimUtil.exists(width) && !isNaN(parseInt(width, 10))) {
                  var substraction = jimEvent.fn.getCurrentStyle('border-left-width', $target) + jimEvent.fn.getCurrentStyle('border-right-width', $target) + jimEvent.fn.getCurrentStyle('padding-left', $target) + jimEvent.fn.getCurrentStyle('padding-right', $target);
                  if(bShape || $target.is(".table") || $target.is(".datalist") || isNaN(substraction)) {
                    substraction =0;
                  }         
                  width = Math.max( width - substraction,0);                        
                }
              }
              if(args.height && args.height.type!=="noresize") {
                height = self.evaluateExpression(args.height.value);   
                if(args.height.type==="parentrelative" && jimUtil.exists($parent)) {
                  var percentage = height;
                  height = jimUtil.getScrollContainerSize($parent).height;
                  if(jimUtil.exists(percentage) && !isNaN(parseInt(percentage, 10)))
                    height = height / 100 * percentage;
                }
                            
                if(jimUtil.exists(height) && !isNaN(parseInt(height, 10))) {
                  var substraction = jimEvent.fn.getCurrentStyle('border-top-width', $target) + jimEvent.fn.getCurrentStyle('border-bottom-width', $target) + jimEvent.fn.getCurrentStyle('padding-top', $target) + jimEvent.fn.getCurrentStyle('padding-bottom', $target);
                  if(bShape || $target.is(".table") || $target.is(".datalist")|| isNaN(substraction)){
                    substraction=0;
                  }
                  height = Math.max( height - substraction,0);
                }
              }
                        
              var effect;
              if(args.effect)
                effect = jimUtil.createResizeAnimationOptions(args.effect, vWrap);
                        
              if($target.is(".table") || $target.is(".datalist")) {
                jimUtil.resizeTable($target, width, height, effect, callback);  
              }
              else if($target.is(".cellcontainer") || $target.is(".datacell") || $target.is(".textcell")) {
                jimUtil.resizeCell($target, width, height, effect);
              }
              else if($target.is(".headerrow") || $target.is(".datarow")) {
                jimUtil.resizeRow($target, width, height, effect);
              }
              else if($target.is(".gridcell")) {
              	var $dataGrid = $target.parent("td").parent("tr").parent("tbody").parent(".datagrid");
               	if(jimUtil.exists(width) && !isNaN(parseInt(width, 10)))
                  $dataGrid.attr("childwidth", width);
                if(jimUtil.exists(height) && !isNaN(parseInt(height, 10)))
                  $dataGrid.attr("childheight",height);
                  $dataGrid.dataview("updateDataGridBounds");
              }
              else if($target.is(".datagrid")) {
                var numColumnsOrRows =  parseInt($target.attr("items"));
                var isHorizontal =  $target.is(".horizontal");
                var hSpacing =  parseInt($target.attr("hSpacing"));
                var vSpacing =  parseInt($target.attr("vSpacing"));
                if(isHorizontal) {
                  var gridCellWidth = parseInt($target.attr("childwidth"));
                  if(jimUtil.exists(width) && !isNaN(parseInt(width, 10))) {
                    width = width + hSpacing;
                    var numColumns = parseInt((width-hSpacing)/(gridCellWidth+hSpacing));
                    numColumns = Math.max(1,numColumns);
                    $target.attr("items",numColumns);
                    if(numColumns!=numColumnsOrRows)
                      $target.dataview("rebuildDataGridHierarchy");
                  }
                } else {
                  var gridCellHeight = parseInt($target.attr("childheight"));
                  if(jimUtil.exists(height) && !isNaN(parseInt(height, 10))) {
                    height = height + vSpacing;
                    var numRows = parseInt((height-vSpacing)/(gridCellHeight+vSpacing));
                    numRows = Math.max(1, numRows);
                    $target.attr("items",numRows);
                    if(numRows!=numColumnsOrRows)
                      $target.dataview("rebuildDataGridHierarchy");
                  }
                }
              } else {
                effect = jimUtil.createResizeAnimationOptions(args.effect, vWrap, callback);
                var properties = {};
                if(jimUtil.exists(width) && !isNaN(parseInt(width, 10)))
                  jQuery.extend(properties, {"width": width});
                if(jimUtil.exists(height)  && !isNaN(parseInt(height, 10)))
                  jQuery.extend(properties, {"height": height});
                            
                if(args.effect) {
                  if(bShape) {
                    var progress = function() {
                      var $shapewrapper = $(this);
                      shapeStyle = {};
                      shapeStyle.attributes = {"width":$shapewrapper.css("width"), "height":$shapewrapper.css("height")};
                      jimShapes.updateStyle($shapewrapper.find(".shape")[0],shapeStyle);
                    };
                    jQuery.extend(effect,{"progress": progress});
                  }
                  $target.animate(properties, effect);
                  if ($target.hasClass("image") && $target.children().length > 0) {
                	$target.children().animate(properties, effect);
                  }
                } else {
                  $target.css(properties);
                  if(bShape) {
                    shapeStyle = {};
                    shapeStyle.attributes = {"width":width, "height":height};
                    jimShapes.updateStyle($target.find(".shape")[0],shapeStyle);
                  }
                  if ($target.hasClass("image") && $target.children().length > 0)
                	$target.children().css(properties);
                }
              }
                       
              jimUtil.forceReflow();
              jimUtil.calculateMasterMinSize($target);
              jimUtil.refreshPageMinSizeWithTarget($target);
              
              if(!args.effect || $target.is(".gridcell")) jQuery.each(vWrap, function (index, value) {jimUtil.wrapLayout(value);});
            }
                    
            jQuery(window).trigger("reloadScrollBars");
          }
        }
            
        if(callback && !args.effect) { callback(); }
      }
    },
	"jimRotate": function(args, callback) {
	      if(jimUtil.exists(args)) {
	        var self = this, $targets, $target, type, i, iLen, angle,  bShape, shapeStyle;
	        if(args.target) {
	          $targets = self.getEventTarget(args.target,undefined,"jimRotate");
	          if($targets) {
	            for(i=0, iLen = $targets.length; i < iLen; i += 1) {
	              $target = jQuery($targets[i]);
	              bShape=false;
	                            
	              if($target.jimGetType() === itemType.shapewrapper) {
	                bShape=true;
	              }    
	         
	              var currentAngle = parseInt(jimUtil.getRotationDegrees($target));
	              if(args.angle) {
	                angle = self.evaluateExpression(args.angle.value); 
	                if(args.angle.type==="rotateby")
	                	angle= parseInt(angle) + currentAngle;
	              }
	              
	              var effect;
	              if(args.effect)
	                effect = jimUtil.createAnimationOptions(args.effect, callback);
	                
	            
	              
	              var target = $target[0];
	              if(target.rotationdeg=== undefined)
	            	  target["rotationdeg"] = currentAngle;
	              
	              if(args.effect) {
	            	var properties = {};
		            if(jimUtil.exists(angle) && !isNaN(parseInt(angle, 10)))
		               jQuery.extend(properties, {rotationdeg: angle});
		            
	              	var stepFunction =  function(now) {
	              		// in the step-callback (that is fired each step of the animation),
                        // you can use the `now` paramter which contains the current
                        // animation-position (`0` up to `angle`)
                    	$target.css({
                            transform: 'rotate(' + now + 'deg)'
                        });
                    	if(bShape) {
    	                    var $shapewrapper = $(this);
    	                    shapeStyle = {};
    	                    shapeStyle.attributes = {"-webkit-transform":now};
    	                    jimShapes.updateStyle($shapewrapper.find(".shape")[0],shapeStyle);
    	                }
                    };
	                jQuery.extend(effect, {"step": stepFunction});
	                $target.animate(properties, effect);
	                
	              } else {
	                $target.css({
                       transform: 'rotate(' + angle + 'deg)'
                    });
	                target["rotationdeg"] = angle;
	                if(bShape) {
	                    shapeStyle = {};
	                    shapeStyle.attributes = {"-webkit-transform":angle};
	                    jimShapes.updateStyle($target.find(".shape")[0],shapeStyle);
	                 }
	             }	              
	                       
	            jimUtil.forceReflow();
	            jimUtil.calculateMasterMinSize($target);
	            jimUtil.refreshPageMinSizeWithTarget($target);
	            }
	                    
	          
	          }
	        }
	            
	        if(callback && !args.effect) { callback(); }
	      }
	    }        
  });
  
})(window);

