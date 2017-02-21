/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window,undefined) {
  jQuery.extend(jimEvent.fn, {
    /*************************** START SUPPORT FUNCTIONS ***************************/
    "launchCases": function(cases) {
      if (jimUtil.isAnnotationInactive() && jimUtil.exists(cases) && cases.length) {
        try {
          this.event.stopPropagation();
          this.executeCases(cases);
        } catch (error) {
          switch(error.name) {
            case "ReferenceError":
            case "TypeError":
              if(error.fileName) {
                jimUtil.debug(error.message + " [file: '" + error.fileName.substring(error.fileName.lastIndexOf("/")+1) + "' at line: " + error.lineNumber + "]");
              } else {
                jimUtil.debug(error.message);
              }
              break;
            default:
              jimUtil.debug(error);
              break;
          }
        }
      }
    },
    "executeCases": function(cases) {
      var newCases = this.getElementsToExecute(cases);
      var self = this;
      if(newCases.length === 0)
    	return;
      else {
    	var len = newCases.length;
  		var remainingCases = cases.slice(len);
  		var leftToResolve = len;
    	var caseCallback = function() {
    	  leftToResolve--;
      	  if (leftToResolve === 0 && remainingCases.length > 0) {
      	    self.executeCases(remainingCases);
      	  }
    	}; 

        if(newCases.length === 1) {
      	  var currentCase = newCases.splice(0,1)[0];
    	  if(jimUtil.exists(currentCase)) {
            self.executeBlocks(currentCase.blocks, caseCallback);
    	  }
        }
        else {
          var i, bLen, current, maxDelay = 0;
          for(i = 0, bLen=newCases.length; i<bLen; i+=1) {
            current = newCases[i];
            maxDelay += current.delay;
            (function(caze) {
        	  jimEvent.pauseStack.push(setTimeout(function(){self.executeBlocks(caze.blocks, caseCallback)}, maxDelay));
            })(current);
          }
        }
	  }
    },
    "getElementsToExecute": function(elements) {
  	  var a, aLen, b, bLen, actionType, current;
        var array = [];
        for(a=0, aLen=elements.length; a<aLen; a+=1) {
      	current = elements[a];
          actionType = (elements[a+1] !== undefined) ? elements[a+1].exectype : null;
          if(actionType === null || actionType === "serial") {
            array.push(current);
            break;
          }
          else {
            for(b=a, bLen=elements.length; b<bLen; b+=1) {
          	  current = elements[b];
          	  actionType = (elements[b+1] !== undefined) ? elements[b+1].exectype : null;
          	  if(actionType === "parallel" || actionType === "timed") {
          	    array.push(elements[b]);
          	  }
          	  else {
          	    array.push(elements[b]);
          	    break;
          	  }
            }
            break;
          }
        }
        return array;
  	},
    "undoCases": function($firer) {
      var self = this, undoPauseStack, undoStack, $eventFirer, undoAction, c, cLen, doRestore = true;
      self.event.stopPropagation();
      if(self.event.type === "mouseleave") {
        $eventFirer = jQuery(document.elementFromPoint(self.event.clientX, self.event.clientY)); /* intentional use of clientX/clientY instead of pageX/pageY */
        if($firer.has($eventFirer).length !== 0) {
          doRestore = false;
        }
      }
      if(doRestore) {
        undoPauseStack = $firer.data("jimUndoPauseStack");
        if(jimUtil.exists(undoPauseStack)) {
          while(undoPauseStack.length) {
            clearTimeout(undoPauseStack.pop());
          }
          $firer.removeData("jimUndoPauseStack");
        }
        
        undoStack = $firer.data("jimUndoStack");
        if(jimUtil.exists(undoStack)) {
          for(c=0, cLen=undoStack.length; c<cLen; c+=1) {
            undoAction = undoStack[c];
            if(undoAction.action && undoAction.parameter) {
              jimEvent.fn[undoAction.action].call(self, undoAction.parameter);
            }
          }
        }
        $firer.removeData("jimUndoStack");
      }
    },
    "executeBlocks": function(blocks, caseCallback) {
      if(jimUtil.exists(blocks)) {
        var self = this, b, bLen, block, condition;
        /* simulates if-elseif-else construct -> only once block is executed */
        for(b=0, bLen=blocks.length; b<bLen; b+=1) {
          block = blocks[b];
          if(jimUtil.exists(block.condition)) {
            condition = self.evaluateExpression(block.condition);
            if(condition !== null) {
              if(block.condition.datatype && block.condition.datatype === "variable") {
                condition = jimEvent.tryBooleanConversion(condition);
              } else if(typeof(condition) === "string") {
                condition = confirm(condition);
              }
              if(condition === true) {
                self.executeActions(block.actions, caseCallback);
                return;
              }
            }
            /* continue with next block */
          } else if (block.condition === null) {
            /* continue with next block */
          } else {
            self.executeActions(block.actions, caseCallback);
            return;
          }
        }
        
        /* no block executed, proceed with next case */
        if(caseCallback) { caseCallback(); }
      }
    },
    "executeActions": function(actions, caseCallback) {
      if(jimUtil.exists(actions)) {
    	//preprocess actions
    	var self = this, a, aLen, b, bLen, $firer, undo, undoStack, lastUndoAction, current, maxDelay;
    	var array = self.getElementsToExecute(actions);
    		
    	// save undo state
    	for (a=0, aLen=array.length;a<aLen; a+=1) {
    	  current = array[a];
    	  $firer = self.getEventFirer();
    	  if (self.event.backupState) {
		    /* initialise mouseover */
		    undo = self.getUndoActions(current);
		    if(jimUtil.exists(undo) && !jQuery.isEmptyObject(undo)) {
		      undoStack = $firer.data("jimUndoStack");
		      if(!jimUtil.exists(undoStack)) { undoStack = []; }
		        $firer.data("jimUndoStack", undoStack.concat(undo));
		    }
		  } else if (current.action === "jimChangeStyle" && jimUtil.exists($firer.data("jimUndoStack"))) {
		    /* event in-between mouseenter and mouseleave of a mouseover */
		    for(l = $firer.data("jimUndoStack").length-1; l >= 0; l -= 1) {
		      lastUndoAction = $firer.data("jimUndoStack")[l];
		      if(lastUndoAction.action === "jimChangeStyle" && lastUndoAction.target === current.target) {
		        jQuery.extend(true, lastUndoAction.parameter, current.parameter);
		        break;
		      }
		    }
		  }
		}

		var len = array.length;
		var remainingActions = actions.slice(len);
		var leftToResolve = len;
    	var actionCallback = function() {
    		leftToResolve--;
    	  if (leftToResolve === 0 && remainingActions.length > 0) {
    	    self.executeActions(remainingActions, caseCallback);
    	  }
    	  else if(leftToResolve === 0 && remainingActions.length === 0) {
    		 if(caseCallback) { caseCallback(); }
		  }
    	};
    	actions = [];
    	aLen = 0; /* terminate iteration */
    	maxDelay = 0;
    	for(b=0, bLen=len; b<bLen; b+=1) {
  		  current = array[b];
  		  maxDelay += current.delay;
  		  if (current.action === "jimNavigation") {
  			if(current.exectype === 'serial' && current.delay === 0)
				jimEvent.fn[current.action].call(self, current.parameter);
  			else {
	  		  (function(action) {
	  		   	jimEvent.pauseStack.push(setTimeout(function(){jimEvent.fn[action.action].call(self, action.parameter)}, maxDelay));
	  		  })(current);
  			}
  			break;
  		  }
  		  else if (current.action === "jimSetValue" || current.action === "jimSetSelection") {
  			if(current.exectype === 'serial' && current.delay === 0)
				jimEvent.fn[current.action].call(self, current.parameter, undefined, actionCallback);
  			else {
  			  (function(action) {
  				jimEvent.pauseStack.push(setTimeout(function(){jimEvent.fn[action.action].call(self, action.parameter, undefined, actionCallback)}, maxDelay));
  			  })(current);
  			}
  		  }
  		  else {
  			if(current.exectype === 'serial' && current.delay === 0)
			  jimEvent.fn[current.action].call(self, current.parameter, actionCallback);
			else {
	  		  (function(action) {
	  			jimEvent.pauseStack.push(setTimeout(function() {jimEvent.fn[action.action].call(self, action.parameter, actionCallback)}, maxDelay));
	  		  })(current);
			}
  		  }
      	}
	  }
    },
    "getEventFirer": function(event) {
      var self = this, $firer, myEvent;
      myEvent = event || self.event;
      if(window.jimMobile) {
    	if(jimMobile.tool==="pinch" && (myEvent.type!=="pinchopen" && myEvent.type!=="pinchclose"))
    		return jQuery("#jim-mobile");
    	if(jimMobile.tool==="rotate" && (myEvent.type!=="rotateleft" && myEvent.type!=="rotateright"))
    		return jQuery("#jim-mobile");
      }
      $firer = jQuery(myEvent.target || myEvent.srcElement);
      switch(myEvent.type) {
        case "keyup":
        case "keydown":
            if($firer.is("html, body") || (jimUtil.isIE() && ($firer.is(".screen, .template, .master") || $firer.parent().is(".screen, .template, .master") ))) {
              $firer = jQuery("."+myEvent.type);
            } else if ($firer.is("[type='button'],[type='checkbox'],[type='file'],[type='hidden'],[type='image'],[type='password'],[type='radio'],[type='reset'],[type='submit'],[type='text'],[type='number'],[type='url'],[type='email'],select,textarea,button")) {
              $firer = $firer.closest(".firer");
            }
            break;
        case "variablechange":
	        if($firer.is("html")) {
	          $firer = jQuery("."+myEvent.type);
	        }
	        break;
        default:
            if ($firer.hasClass("dateicon") || $firer.hasClass("timeicon")) {
              $firer = $firer.prev();
            } else if($firer.parent().closest(".shapewrapper").length==1){
              $firer = $firer.parent().closest(".shapewrapper").find(".shape");
            } else {
              $firer = $firer.closest(".firer");
            }
            break;
      }
      
     
      return $firer;
    },
    
    "getDirectEventFirer": function(firer) {
      var $firer = jQuery(firer);
      
      if($firer.parent().closest(".shapewrapper").length==1){
        $firer = $firer.parent().closest(".shapewrapper").find(".shape");
      }
      
      return $firer;
    },  
    
    "getEventTarget": function(target, instance,actionType) {
	  if(jQuery.browser.msie && jQuery.browser.version<=9 && target && typeof(target) === "string" && target.match(/ td$/)){
        var newTarget=target.substring(0, target.length -3);
        var $newTarget=jQuery(newTarget);
        if($newTarget.length && $newTarget.parent().closest(".datalist").length){
          target=newTarget;
        }
      }
      var self = this, $target, $firer, $parents, $masterTarget, masteritemID, result;
      if(target instanceof jQuery) {
        return target;
      } else {
        if(jimData && jimData.variables.hasOwnProperty(target)) {
          return target;
        } else {
          $target = jQuery(target);
          if($target.length) {
            $firer = self.getEventFirer();
            
            if($target.attr("class") && ($target.attr("class").indexOf("shape") > -1) && $target.closest(".shapewrapper").length >0 && $target.closest(".content").length==0){   
                var $target = $target.closest(".shapewrapper");
//                //get ALL elements with same id
//                $target =$("[id="+$wrapper.prop('id')+"]");
            }
            if($firer.attr("class") && ($firer.attr("class").indexOf("shape") > -1) && $firer.closest(".shapewrapper").length >0){
                var $wrapper = $firer.closest(".shapewrapper");
                $firer =$firer.closest(".shapewrapper");
            }            
            if($target.parent().closest(".datalist, .datagrid").length) {
              if($target.closest(".headerrow").length)
              	return $target;
              if($firer.closest(".datalist, .datagrid").length) {
                if($firer.closest(".headerrow").length) {
                  if($target.is(".datarow"))
                    return $firer.closest(".headerrow").parent().next().children(".datarow");
                  else
                    return $firer.closest(".headerrow").parent().next().children(".datarow").find(target);
                } else {
                  if($target.hasClass("datarow")) {
                    if(typeof(target) === "string" && target.lastIndexOf(".odd") !== -1) {
                      return $firer.closest(".datalist").children("tbody").children(".odd").children(".datacell");
                    } else if (typeof(target) === "string" &&  target.lastIndexOf(".even") !== -1) {
                      return $firer.closest(".datalist").children("tbody").children(".even").children(".datacell");
                    } else {
                      if (jimUtil.exists(actionType) && actionType==="jimResize") {
                        return $firer.closest(".datarow");
                      }else{
                        return $firer.closest(".datarow").children("td.datacell");
                      }
                    }
                  } else {
                    /* 2 different target selectors (depending on action): 
                     * - changeStyle -> jQuery(#canvas #component) uses jQuery object
                     * - otherAction -> "#component" uses String 
                     */ 
                	 var $parentsAndSelf = $firer.parents(".datarow:first,.gridcell:first").andSelf();
                	 
                     if($parentsAndSelf.filter($target).length > 0)
                    	 return $parentsAndSelf.filter($target);
                     else if($parentsAndSelf.filter(target).length > 0)
                    	 return $parentsAndSelf.filter(target);
                    
                     if($parentsAndSelf.find($target).length > 0)
                        return $parentsAndSelf.find($target);
                     else
                        return $parentsAndSelf.find(target); 
                  }
                }
              } else {
                if (jimUtil.exists(instance)) {
                	var $dataView = jQuery($target.get(0)).closest(".datalist, .datagrid");
                	if($dataView.is(".datagrid")){
                		return $dataView.find(".gridcell[instance='" + instance.id + "']").find(target);
                	}else{
                		return $dataView.find("input[name='id'][value='"+instance.id+"']").closest(".datarow").find(target);
                	}
                } else {
                  if($target.hasClass("datarow")) {
                    if(typeof(target) === "string" && (target.lastIndexOf("tr.odd") !== -1 || target.lastIndexOf("tr.even") !== -1)) {
                      return $target.children(".datacell");
                    } else {
                      return $target.parents(".datalist").find(".datarow");
                    }
                  } else {
                	  /* 2 different target selectors (depending on action): 
                       * - changeStyle -> jQuery(#canvas #component) uses jQuery object
                       * - otherAction -> "#component" uses String 
                       */ 
                    if($target.parents(".datarow, .datagrid").find($target).length > 0)
                        return $target.parents(".datarow, .datagrid").find($target);
                     else{
                        return $target.parents(".datarow, .datagrid").find(target); 
                     }
                  }
                }
              }
            } else if ($firer.closest(".master").length) {
              if(typeof(target) === "string") {
                $target = $firer.closest(".master").find(target.substring(target.indexOf(" ") + 1)); /* cut off master reference (must come first) */
                if($target.closest(".shapewrapper").length >0 && $target.closest(".content").length==0){  //get shapewrapper again  
                    var $target = $target.closest(".shapewrapper");
                }
              } else if (jimUtil.isArray(target)) {
                $target = $firer.closest(".master").find(target.join(","));
              }
              return $target;
            } else if ($firer.hasClass("menunode") && $firer.parent().closest(".submenu").length) {
              masteritemID = $firer.parent().closest(".submenu").attr("masteritem");
              if(masteritemID) {
                if(typeof(target) === "string") {
                  $target = jQuery("#"+masteritemID).find(target.split(" ").join(","));
                } else if (jimUtil.isArray(target)) {
                  $target = jQuery("#"+masteritemID).find(target.join(","));
                }
              }
              return $target;
            } else {
              return $target;
            }
          }
        }
      }
    },
    "getUndoActions": function(action) {
      var self = this, actionType = action.action, undoActions=[], undoAction, $targets, $target, target, type, len, isReadonly, style, s, undoStyle, property, t, tLen, bShape;
      switch(actionType) {
        case "jimChangeStyle":
          undoAction = {
            "action": "jimChangeStyle",
            "parameter": []
          };
          for(s=0, len=action.parameter.length; s<len; s+=1) {
            style = action.parameter[s];
            for(target in style) {
              if(style.hasOwnProperty(target)) {
                $target = self.getEventTarget(target);
                if($target) {
                //check if shape
                  bShape=false;
                  if($target.jimGetType() === itemType.shapewrapper){
                      $target = $target.find(".shape");
                      bShape=true;
                  }
                  undoStyle = {};
                  undoStyle[target] = {};
                  if(style[target].attributes) {
                    undoStyle[target].attributes = {};
                    for(property in style[target].attributes) {
                      if(style[target].attributes.hasOwnProperty(property)) {
                          var i=property.indexOf('#');
                          if(i!=-1){
                            property=property.substring(0,i);
                          }
                          if(bShape){
                            undoStyle[target].attributes[property] = $target.shapeStyle(property);
                          }
                          else{
                        	if (property == "overlay")
                        	  undoStyle[target].attributes[property] = $target.closest("div").attr("overlay");
                        	else
                        	  undoStyle[target].attributes[property] = $target.css(property);
                          }
                      }
                    }
                  }
                  if(style[target].expressions) {
                    undoStyle[target].expressions = {};
                    for(property in style[target].expressions) {
                      if(style[target].expressions.hasOwnProperty(property)) {
                        undoStyle[target].expressions[property] = $target.css(property);
                      }
                    }
                  }
                  if(jQuery.browser.msie) {
                    if(style[target]["attributes-ie"]) {
                      undoStyle[target]["attributes-ie"] = {};
                      for(property in style[target]["attributes-ie"]) {
                        if(style[target]["attributes-ie"].hasOwnProperty(property)) {
                          var i=property.indexOf('#');
                          if(i!=-1){
                            property=property.substring(0,i);
                          }
                          
                          if(bShape){
                            undoStyle[target]["attributes-ie"][property] = $target.shapeStyle(property);
                          }
                          else{
                    	    if(property==="-pie-background" || property==="border-radius" || property==="filter" || property==="-ms-filter" || property==="-pie-poll"){
                              if(jimUtil.exists($target.get(0).currentStyle.getAttribute(property)))                    	        
                                undoStyle[target]["attributes-ie"][property] = $target.get(0).currentStyle.getAttribute(property);
                              else {
								if(property==="-pie-background" && jQuery.browser.version == 9)
									undoStyle[target]["attributes-ie"][property] = $target.css("background-color");
								else 
									undoStyle[target]["attributes-ie"][property] = "";
							  }
                            } else {
                              undoStyle[target]["attributes-ie"][property] = $target.css(property);
                            }
                          }
                        }
                      }
                    }
                    if(style[target]["expressions-ie"]) {
                      undoStyle[target]["expressions-ie"] = {};
                      for(property in style[target]["expressions-ie"]) {
                        if(style[target]["expressions-ie"].hasOwnProperty(property)) {
                          undoStyle[target]["expressions-ie"][property] = $target.css(property);
                        }
                      }
                    }
                  }
                  undoAction.parameter.push(undoStyle); 
                }
              }
            }
          }
          undoActions.push(undoAction);
          break;
        case "jimRotate":
		  undoAction = {
            "action": "jimRotate",
            "parameter": {
              "angle": {
			    "value": jimUtil.getRotationDegrees(self.getEventTarget(action.parameter.target))
			  },
              "target": action.parameter.target
            }
          };
          if(action.parameter.effect)
           	 jQuery.extend(undoAction.parameter,{"effect": action.parameter.effect});
		  undoActions.push(undoAction);
		  break;
        case "jimNavigation":
          break;
        default:
          $targets = jQuery(action.parameter.target);
          for(t=0, tLen=$targets.length; t<tLen; t+=1) {
            $target = this.getEventTarget(jQuery($targets[t]));
            type = $target.jimGetType();
            switch(actionType) {
              case "jimSetValue":
                /* store actual values */
                undoAction = {
                  "action": "jimSetValue",
                  "parameter": {
                    "value": self.jimGetValue(self.getEventTarget(action.parameter.target)),
                    "target": action.parameter.target
                  }
                }
                undoActions.push(undoAction);
                /* store selection values */
                switch(type) {
                  case itemType.selectionlist:
                  case itemType.multiselectionlist:
                  case itemType.radiobuttonlist:
                  case itemType.checkboxlist:
                    undoActions.push(self.getUndoActions({"action": "jimSetSelection", "parameter": {"target": action.parameter.target}})[0]);
                    break;
                  case itemType.image:
                	if (!($target.html().indexOf("preserveAspectRatio=\"none\"") > -1)) undoAction.parameter.aspectratio = "true";
                	break;
                }
                break;
              case "jimSetSelection":
                undoAction = {
                  "action": "jimSetSelection",
                  "parameter": {
                    "value": self.jimGetSelectedValue(self.getEventTarget(action.parameter.target)),
                    "target": action.parameter.target
                  }
                };
                undoActions.push(undoAction);
                break;
              case "jimHide":
                undoAction = jQuery.extend(true, {}, action);
                undoAction.action = "jimShow";
                undoActions.push(undoAction);
                break;
              case "jimShow":
                undoAction = jQuery.extend(true, {}, action);
                if($target.jimGetType() === itemType.panel) {
                  undoAction.parameter.target = "#" + $target.siblings(":visible:first").attr("id");
                  if(action.parameter.effect && action.parameter.effect.direction) {
                    switch(action.parameter.effect.direction){
                      case "left":
                        undoAction.parameter.effect.direction = "right";
                        break;
                      case "right":
                        undoAction.parameter.effect.direction = "left";
                        break;
                      case "up":
                        undoAction.parameter.effect.direction = "down";
                        break;
                      case "down":
                        undoAction.parameter.effect.direction = "up";
                        break;
                    }
                  }
                } else {
                  undoAction.action = "jimHide";
                }
                undoActions.push(undoAction);
                break;
              case "jimEnable":
              case "jimDisable":
                isReadonly = false;
                switch(type) {
                  case itemType.radiobuttonlist:
                  case itemType.checkboxlist:
                    isReadonly = $target.find('input[disabled]').length !== 0;
                    break;
                  case itemType.checkbox:
                  case itemType.radiobutton:
                    isReadonly = $target.is("[disabled]");
                    break;
                  case itemType.file:
                    isReadonly = $target.find("[disabled]").length !== 0;
                    break;
                  case itemType.text:
                  case itemType.password:
                    isReadonly = $target.find("[readonly]").attr("readonly");
                    break;
                  case itemType.date:
                  case itemType.time:
                    isReadonly = $target.find(".icon[readonly]").attr("readonly");
                    break;
                  default:
                    isReadonly = $target.attr("readonly");
                    break;
                }
                if(action.action === "jimDisable" && !isReadonly) {
                  undoAction = {
                    "action": "jimEnable",
                    "parameter": {
                      "target": action.parameter.target
                    }
                  };
                  undoActions.push(undoAction);
                } else if (action.action === "jimEnable" && isReadonly) {
                  undoAction = {
                    "action": "jimDisable",
                    "parameter": {
                      "target": action.parameter.target
                    }
                  };
                  undoActions.push(undoAction);
                }
                break;
              case "jimResize":
                undoAction = {
                  "action": "jimResize",
                  "parameter": {
                    "target": action.parameter.target,
                    "width":{ 
                        "type":"exprvalue", 
                        "value":parseInt($target.outerWidth(),10)
                     },
                     "height":{ 
                        "type":"exprvalue", 
                        "value":parseInt($target.outerHeight(),10)
                     }
                  }
                };
                if(action.parameter.effect){
                	 jQuery.extend(undoAction.parameter,{"effect": action.parameter.effect});
                }
                undoActions.push(undoAction);
                break;
              case "jimMove":
	              undoAction = {
	                "action": "jimMove",
	                "parameter": {
	                  "target": action.parameter.target,
	                  "top":{ 
	                      "type":"movetoposition", 
	                      "value":parseInt(jimEvent.fn.jimGetPositionY($target),10)
	                   },
	                   "left":{ 
	                      "type":"movetoposition", 
	                      "value":parseInt(jimEvent.fn.jimGetPositionX($target),10)
	                   }
	                }
	              };
	              if(action.parameter.effect){
	              	 jQuery.extend(undoAction.parameter,{"effect": action.parameter.effect});
	              }
	              undoActions.push(undoAction);
	              break;
            }
          }
          break;
      }
      return undoActions;
    },
    "triggerDragOver": function($target) {
      if(jimUtil.exists($target)) {
        var self = this, $activeOver, $over,t;
        for(t=0, tLen=$(self.event.currentTarget).data("jimDragTargets").length; t<tLen; t+=1) {
          $dragTarget = $(self.event.currentTarget).data("jimDragTargets")[t];
          $dragTarget.hide();
        }/* only works because drag event hijacks mouse events */
        var $overCandidates = $(".firer").not($(self.event.currentTarget));
        $activeOver = jQuery(document.elementFromPoint(self.event.clientX, self.event.clientY)).closest($overCandidates); /* TODO: :visible */ /* intentional use of clientX/clientY instead of pageX/pageY */
        for(t=0, tLen=$(self.event.currentTarget).data("jimDragTargets").length; t<tLen; t+=1) {
            $dragTarget = $(self.event.currentTarget).data("jimDragTargets")[t];
            $dragTarget.show();
          } /* would cause flicker otherwise */
        $over = (self.dragoverStack.length > 0) ? self.dragoverStack[self.dragoverStack.length-1] : $target;
        if($activeOver[0] !== $over[0]) {
          if($activeOver.hasClass("mouseenter")) {
            self.dragoverStack.push($activeOver);
            $activeOver.trigger("dragenter");
          }
          if($activeOver.hasClass("mouseleave") && !self.dragoverStack.contains($activeOver[0])) {
            self.dragoverStack.push($activeOver);
          } else if ($over.hasClass("mouseleave")) {
            self.dragoverStack.pop();
            $over.trigger("dragleave");
          }
        }
      }
    },
    "getGradientStyle": function(gradient) {
      var value;
      if(jQuery.browser.mozilla) {
        value = gradient["-moz"];
      } else if (jQuery.browser.webkit) {
        if(parseFloat(jQuery.browser.version) < 4.0) {
          value = gradient["-webkit-old"];
        } else {
          value = gradient["-webkit"];
        }
      } else if (jQuery.browser.opera) {
        value = gradient["-opera"];
      }
      return value;
    },
    "getCurrentStyle": function(attribute, target) {
      var style, $target = this.getEventTarget(target);
      if($target.length) {
        style = (attribute.startsWith("Jim")) ? $target[0].style[attribute] : $target.css(attribute);
        try {
          return parseInt(style, 10);
        } catch(error) {
          return style;
        }
      }
      return style;
    },
    "evaluateExpression": function(expression, instance) {
      var self = this, result, tmpResult, $datarow,$gridcell, i, len;
      if(jimUtil.exists(expression)) {
        if(expression.action) {
          result = jimEvent.fn[expression.action].call(self, expression.parameter, instance);
        } else if(expression.field) {
          result = (jimUtil.exists(instance) && jimUtil.exists(instance.userdata) && instance.userdata.hasOwnProperty(expression.field)) ? instance.userdata[expression.field] : expression.field;
        } else if (expression.datatype) {
          switch (expression.datatype) {
	        case "property":
	        	var $target = self.getEventTarget(expression.target, instance);
	        	result = jimEvent.fn[expression.property].call(self,$target);
	        	break;
	        case "variable":
	        	tmpResult = jimData.get(expression.element);
	        	if(jimUtil.isArray(tmpResult)) {
	        		result = [];
	        		for(i=0, len=tmpResult.length; i<len; i+=1) {
	        			result.push(tmpResult[i]);
	        		}
	        	} else {
	        		result = tmpResult;
	        	}
	        	break;
            case "datamaster":
              result = [];
              tmpResult = jimData.datamasters[expression.datamaster];
              if(tmpResult) {
	            for(i=0, len=tmpResult.length; i<len; i+=1) {
	              result.push(tmpResult[i]);
	            }
              }
              break;
            case "datalist":
              tmpResult = [];
              jQuery(expression.element).find(".datarow").each(function(index, datarow) {
                tmpResult.push(jQuery(datarow).find("input[name='id']").val());
              });
              result = self.getDataInstancesById(jimData.datamasters[expression.datamaster], tmpResult);
              break;
         
            case "datarow":
              $datarow = jQuery(self.event.target || self.event.srcElement).closest(".datarow");
              tmpResult = [];
              if ($datarow.length) {
                tmpResult = [$datarow.find("input[name='id']").val()];
              } else {
                jQuery(expression.element).find(".datarow").each(function(index, cell) {
                  tmpResult.push(jQuery(cell).find("input[name='id']").val());
                });
              }
              result = self.getDataInstancesById(jimData.datamasters[expression.datamaster], tmpResult);
              break;
            case "datagrid":
            	tmpResult = [];
            	jQuery(expression.element).find(".gridcell").each(function(index, gridcell) {
              		tmpResult.push(jQuery(gridcell).attr("instance"));
              	});
            	result = self.getDataInstancesById(jimData.datamasters[expression.datamaster], tmpResult);
            	break;
            case "gridcell":
            	$gridcell = jQuery(self.event.target || self.event.srcElement).closest(".gridcell");
            	tmpResult = [];
            	if ($gridcell.length) {
            		tmpResult = [$gridcell.attr("instance")];
            	} else {
            		jQuery(expression.element).find(".gridcell").each(function(index, cell) {
            			tmpResult.push(jQuery(cell).attr("instance"));
            		});
            	}
            	result = self.getDataInstancesById(jimData.datamasters[expression.datamaster], tmpResult);
            	break;
          }
        } else {
          result = expression;
        }
      }
      return result;
    }
    /**************************** END SUPPORT FUNCTIONS ****************************/
  });
})(window);
