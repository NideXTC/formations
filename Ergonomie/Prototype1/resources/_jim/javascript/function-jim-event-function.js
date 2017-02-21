/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  jQuery.extend(jimEvent.fn, {
    /************************** START NUMBER FUNCTIONS *****************************/
    "jimPlus": function(parameters, obj) {
      var self = this, value = null, sum=0, i, iLen, parameter;
      if(jimUtil.exists(parameters)) {
        for(i=0, iLen=parameters.length; i<iLen; i+=1) {
          parameter = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[i], obj));
          if(jimEvent.isNumber(parameter)) {
            sum += parameter;
          } else {
            sum = null;
            break;
          }
        }
        value = sum;
      }
      return value;
    },
    "jimMinus": function(parameters, obj) {
      var self = this, value = null, i, iLen, parameter;
      if(jimUtil.exists(parameters)) {
        for(i=0, iLen=parameters.length; i<iLen; i+=1) {
          parameter = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[i], obj));
          if(jimEvent.isNumber(parameter)) {
            value = (jimUtil.exists(value)) ? value - parameter : parameter;
          } else {
            value = null;
            break;
          }
        }
      }
      return value;
    },
    "jimMultiply": function(parameters, obj) {
      var self = this, value = null, i, iLen, parameter;
      if(jimUtil.exists(parameters)) {
        for(i=0, iLen=parameters.length; i<iLen; i+=1) {
          parameter = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[i], obj));
          if(jimEvent.isNumber(parameter)) {
            value = (jimUtil.exists(value)) ? value * parameter : parameter;
          } else {
            value = null;
            break;
          }
        }
      }
      return value;
    },
    "jimDivide": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[0], obj));
        op2 = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[1], obj));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2) && op2 !== 0) {
          value = op1 / op2;
        }
      }
      return value;
    },
    "jimMax": function(parameters, obj) {
      var self = this, value = null, max=0, i, iLen, parameter;
      if(jimUtil.exists(parameters)) {
        for(i=0, iLen=parameters.length; i<iLen; i+=1) {
          parameter = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[i], obj));
          if(jimEvent.isNumber(parameter)) {
            max = Math.max(max, parameter);
          } else {
            max = null;
            break;
          }
        }
        value = max;
      }
      return value;
    },
    "jimMin": function(parameters, obj) {
      var self = this, value = null, min = Number.MAX_VALUE, i, iLen, parameter;
      if(jimUtil.exists(parameters)) {
        for(i=0, iLen=parameters.length; i<iLen; i+=1) {
          parameter = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[i], obj));
          if(jimEvent.isNumber(parameter)) {
            min = Math.min(min, parameter);
          } else {
            min = null;
            break;
          }
        }
        value = min;
      }
      return value;
    },
    "jimAvg": function(parameters, obj) {
      var self = this, value = null, sum;
      if(jimUtil.exists(parameters) && parameters.length !== 0) {
        sum = self.jimPlus(parameters, obj);
        if(jimEvent.isNumber(sum)) {
          value = sum / parameters.length;
        }
      }
      return value;
    },
    "jimAbs": function(parameters, obj) {
      var self = this, value = null, op;
      if(jimUtil.exists(parameters[0])) {
        op = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[0], obj));
        if(jimEvent.isNumber(op)) {
          value = Math.abs(op);
        }
      }
      return value;
    },
    "jimRound": function(parameters, obj) {
      var self = this, value, num, dec;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        num = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[0], obj));
        dec = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[1], obj));
        if(jimEvent.isNumber(num) && jimEvent.isNumber(dec)) {
          value = (Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)).toFixed(dec);
        }
      }
      return value;
    },
    "jimPercent": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[0], obj));
        op2 = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[1], obj));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2)) {
          value = (op1*op2)/100;
        }
      }
      return value;
    },
    "jimSqrt": function(parameters, obj) {
      var self = this, value = null, op;
      if(jimUtil.exists(parameters[0])) {
        op = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[0], obj));
        if(jimEvent.isNumber(op)) {
          value = Math.sqrt(op);
        }
      }
      return value;
    },
    "jimMod": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[0], obj));
        op2 = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[1], obj));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2)) {
          value = op1 % op2;
        }
      }
      return value;
    },
    /*************************** END NUMBER FUNCTIONS ******************************/
    
    /************************ START COMPARATOR FUNCTIONS ***************************/
    "jimEquals": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[0], obj)));
        op2 = jimEvent.tryNumberConversion(jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[1], obj)));
        value = op1 === op2;
      }
      return value;
    },
    "jimNotEquals": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[0], obj)));
        op2 = jimEvent.tryNumberConversion(jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[1], obj)));
        value = op1 !== op2;
      }
      return value;
    },
    "jimGreater": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[0], obj)));
        op2 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[1], obj)));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2)) {
          value = op1 > op2;
        }
      }
      return value;
    },
    "jimLess": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[0], obj)));
        op2 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[1], obj)));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2)) {
          value = op1 < op2;
        }
      }
      return value;
    },
    "jimGreaterOrEquals": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[0], obj)));
        op2 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[1], obj)));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2)) {
          value = op1 >= op2;
        }
      }
      return value;
    },
    "jimLessOrEquals": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[0], obj)));
        op2 = jimEvent.tryNumberConversion(jimEvent.tryDateConversion(self.evaluateExpression(parameters[1], obj)));
        if(jimEvent.isNumber(op1) && jimEvent.isNumber(op2)) {
          value = op1 <= op2;
        }
      }
      return value;
    },
    /************************* END COMPARATOR FUNCTIONS ****************************/
    
    /*************************** START TEXT FUNCTIONS ******************************/
    "jimCount": function(parameters, obj) {
      var self = this, value = null, op;
      if(jimUtil.exists(parameters[0])) {
        op = self.evaluateExpression(parameters[0], obj);
        value = (op && op.length) ? op.length : 0;
      }
      return value;
    },
    "jimConcat": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj));
        op2 = jimEvent.tryStringConversion(self.evaluateExpression(parameters[1], obj));
        if(typeof(op1) === "string" && typeof(op2) === "string") {
          value = op1.concat(op2);
        }
      }
      return value;
    },
    "jimSubstring": function(parameters, obj) {
      var self = this, value = null, string, from, to;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1]) && jimUtil.exists(parameters[2])) {
        string = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj)); /* make sure it's a string */
        from = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[1], obj));
        to = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[2], obj));
        if(typeof(string) === "string" && jimEvent.isNumber(from) && jimEvent.isNumber(to)) {
          value = string.substring(from, to);
        }
      }
      return value;
    },
    "jimIndexOf": function(parameters, obj) {
      var self = this, value = null, string, searchstring, start;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        string = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj));
        searchstring = jimEvent.tryStringConversion(self.evaluateExpression(parameters[1], obj));
        start = 0;
        if(parameters[2]) {
          start = jimEvent.tryNumberConversion(self.evaluateExpression(parameters[2], obj));
        }
        if(typeof(string) === "string" && typeof(searchstring) === "string" && jimEvent.isNumber(start)) {
          value = string.indexOf(searchstring, start);
        }
      }
      return value;
    },
    "jimUpper": function(parameters, obj) {
      var self = this, value = null, string;
      if(jimUtil.exists(parameters[0])) {
        string = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj));
        if(typeof(string) === "string") {
          value = string.toUpperCase();
        }
      }
      return value;
    },
    "jimLower": function(parameters, obj) {
      var self = this, value = null, string;
      if(jimUtil.exists(parameters[0])) {
        string = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj));
        if(typeof(string) === "string") {
          value = string.toLowerCase();
        }
      }
      return value;
    },
    "jimFirstUpper": function(parameters, obj) {
      var self = this, value = null, string;
      if(jimUtil.exists(parameters[0])) {
        string = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj));
        if(typeof(string) === "string") {
          value = string.substr(0,1).toUpperCase() + string.substr(1);
        }
      }
      return value;
    },
    "jimContains": function(parameters, obj) {
      var self = this, value = null, string, pattern;
      if(jimUtil.exists(parameters[0] && parameters[1])) {
        string = jimEvent.tryStringConversion(self.evaluateExpression(parameters[0], obj));
        pattern = self.evaluateExpression(parameters[1], obj);
        if(typeof(string) === "string" && typeof(pattern) === "string") {
          value = string.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
        }
      }
      return value;
    },
    /**************************** END TEXT FUNCTIONS *******************************/
    
    /*************************** START LOGIC FUNCTIONS *****************************/
    "jimAnd": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[0], obj));
        if(typeof(op1) === "boolean" && !op1) return false;
        op2 = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[1], obj));
        if(typeof(op1) === "boolean" && typeof(op2) === "boolean") {
          value = op1 && op2;
        }
      }
      return value;
    },
    "jimOr": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[0], obj));
        if(typeof(op1) === "boolean" && op1) return true;
        op2 = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[1], obj));
        if(typeof(op1) === "boolean" && typeof(op2) === "boolean") {
          value = op1 || op2;
        }
      }
      return value;
    },
    "jimNot": function(parameters, obj) {
      var self = this, value = null, op;
      if(jimUtil.exists(parameters[0])) {
        op = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[0], obj));
        if(typeof(op) === "boolean") {
          value = !op;
        }
      }
      return value;
    },
    "jimXOr": function(parameters, obj) {
      var self = this, value = null, op1, op2;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op1 = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[0], obj));
        op2 = jimEvent.tryBooleanConversion(self.evaluateExpression(parameters[1], obj));
        if(typeof(op1) === "boolean" && typeof(op2) === "boolean") {
          value = (op1 && !op2) || (!op1 && op2);
        }
      }
      return value;
    },
    /**************************** END LOGIC FUNCTIONS ******************************/
    
    /************************* START CONSTANTS FUNCTIONS ***************************/
    "jimSystemDate": function() {
      var date = new Date();
      return date.formatDate("MM/dd/yyyy");
    },
    "jimSystemTime": function() {
      var time = new Date();
      return time.formatDate("HH:mm:ss");
    },
    "jimRandom": function() {
      var dec = 8;
      return Math.round(Math.random() * Math.pow(10, dec)) / Math.pow(10, dec);
    },
    "jimRegExp": function(parameters, obj) {
      var self = this, value = null, op, regexp;
      if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
        op = self.evaluateExpression(parameters[0], obj) + "";
        regexp = new RegExp(self.evaluateExpression(parameters[1], obj), "i");
        value = regexp.test(op);
      }    
      return value;
    },
    "jimWindowWidth": function() {
      return jQuery("#simulation").width()*(1/jimUtil.getScale());
    },
    "jimWindowHeight": function() {
      return jQuery("#simulation").height()*(1/jimUtil.getScale());
    },
    "jimWindowScrollX": function() {
    	var scrollableElement;
    	if(jimUtil.isMobileDevice())
    		scrollableElement = jQuery("#simulation")[0];
    	else if(window.jimMobile) 
    		scrollableElement =  jQuery(".ui-page")[0];
    	else 
    		scrollableElement = jQuery("#simulation")[0];
    	var zoom = jimUtil.getTotalScale();
    	return scrollableElement.scrollLeft /zoom;
    },
    "jimWindowScrollY": function() {
    	var scrollableElement;
    	if(jimUtil.isMobileDevice())
    		scrollableElement = jQuery("#simulation")[0];
    	else if(window.jimMobile) 
    		scrollableElement =  jQuery(".ui-page")[0];
    	else 
    		scrollableElement = jQuery("#simulation")[0];
    	var zoom = jimUtil.getTotalScale();
    	return scrollableElement.scrollTop / zoom;
    },
    "jimCursorX": function() {
      var zoom = jimUtil.getTotalScale();
      return window.mousePos.x / zoom;
    },
    "jimCursorY": function() {
      var zoom = jimUtil.getTotalScale();
      return window.mousePos.y / zoom;
    },
        
    /************************* END CONSTANTS FUNCTIONS *****************************/
	
    /*************************** START AREA FUNCTIONS ******************************/
    "jimAreaIntersect": function(parameters, obj) {
        var self = this, value = null, op1, op2;
        if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
          op1 = jimEvent.tryAreaConversion(self.evaluateExpression(parameters[0], obj));
          op2 = jimEvent.tryAreaConversion(self.evaluateExpression(parameters[1], obj));
          if(op1 && op2){
        	for(var i=0; i<op1.areas.length; i++) {
        		for(var j=0; j<op2.areas.length; j++) {
        			if(jimUtil.incompleteIntersect(op1.areas[i].points,op2.areas[j].points))
        				return true;
        		}
        	}
          }
        }
        return false;
      },
      "jimAreaContains": function(parameters, obj) {
          var self = this, value = null, op1, op2;
          if(jimUtil.exists(parameters[0]) && jimUtil.exists(parameters[1])) {
            op2 = jimEvent.tryAreaConversion(self.evaluateExpression(parameters[0], obj));
            op1 = jimEvent.tryAreaConversion(self.evaluateExpression(parameters[1], obj));
            if(op1 && op2){
            	for(var i=0; i<op1.areas.length; i++) {
            		var contains = false;
            		for(var j=0; j<op2.areas.length; j++) {
            			if(jimUtil.polygonContains(op1.areas[i].points,op2.areas[j].points))
            				contains=true;
            		}
            		if(!contains)return false;
            	}
            	return true;
              }
          }
          return false;
        },
    /************************* END AREA FUNCTIONS ****************************/
    
    /************************* START PROPERTIES FUNCTIONS ***************************/
    "jimGetValue": function($target) {
    	var self = this,type, value = "", i, iLen, $holder, $options = [];
    	if(jimUtil.exists($target) && $target.length) {
    		type = $target.jimGetType();
    	    switch(type) {
    	    	case itemType.richtext:
    	        case itemType.textcell:
    	        case itemType.rectangle:
    	        case itemType.button:
    	        case itemType.label:
    	        	$target.find("span").each(function(i, span) {
    	        		value += span.innerHTML;
    	            });
    	            break;
    	        case itemType.shapewrapper:
    	        	$target.find("span").each(function(i, span) {
    	        		value += span.innerHTML;
    	            });
    	            break;
    	        case itemType.summary:
    	        	var totalVal = $target.find(".valign").find("#total").text();
    	        	var startVal = $target.find(".valign").find("#start").text();
    	        	var endVal = $target.find(".valign").find("#end").text();
    	        	value = totalVal + " items found, displaying " + startVal + " to " + endVal + ".";
					break;
		        case itemType.index:
		        	value = $target.find("span").text();
	            break;
    	        case itemType.image:
    	        	if ($target.prop("tagName") == "DIV")  value = $target.attr("systemName");
    	        	else value = $target.attr("src");
    	            break;
    	        case itemType.checkbox:
    	        case itemType.radiobutton:
    	        	if(window.jimMobile && window.jimMobile.isIOS()) {
    	        		value = ($target.attr("checked")) ? true : false;
    	            }else {
    	              	value = $target.is(":checked");
    	            }
    	            break;
    	        case itemType.text:
    	        case itemType.password:
    	        case itemType.date:
    	        case itemType.time:
    	        case itemType.datetime:
    	        case itemType.file:
    	        	value = $target.find("input").val();
    	            break;
    	        case itemType.textarea:
    	            value = $target.find("textarea").val();
    	            break;
    	        case itemType.dropdown:
    	        case itemType.nativedropdown:
    	        case itemType.selectionlist:
    	        case itemType.multiselectionlist:
    	        	$holder = ((type === itemType.selectionlist) || (type === itemType.multiselectionlist)) ? $target : jQuery("#"+$target.attr("id")+"-options");
    	            $options = $holder.find(".option");
    	            for(i=0, iLen=$options.length; i<iLen; i += 1) {
    	            	value += jQuery($options[i]).text();
    	                if(i+1 < iLen) { value += ","; }
    	            }
    	            break;
    	         case itemType.radiobuttonlist:
    	         case itemType.checkboxlist:
    	            $options = $target.find(".option");
    	            for(i=0, iLen=$options.length; i<iLen; i += 1) {
    	            	value += jQuery($options[i]).text();
    	                if(i+1 < iLen) { value += ","; }
    	            }
    	            break;
    	         case itemType.datalist:
    	            break;
    	    }
    	    return value;
    	}
    	
    },
    "jimGetSelectedValue": function($target) {
    	var self = this, i, iLen, $selected;
    	if(jimUtil.exists($target) && $target.length) {
    		switch($target.jimGetType()) {
    			case itemType.dropdown:
    	        case itemType.nativedropdown:
    	        	return $target.find(".valign").children(".value").text();
    	        case itemType.selectionlist:
    	        case itemType.multiselectionlist:
    	        	return $target.find(".selected").contents().map(function() {
    	        		if(this.nodeType === 3) {
    	        			return this.data;
    	                }
    	             }).get().join(",");
    	        case itemType.radiobuttonlist:
    	        case itemType.checkboxlist:
    	        	if(window.jimMobile && window.jimMobile.isIOS()) {
    	        		return $target.find("div[checked]").next(".option").contents().map(function() {
    	        			if(this.nodeType === 3) {
    	        				return this.data;
    	        			}
    	        		}).get().join(",");
    	        	} else {
    	        		return $target.find("input:checked").next(".option").contents().map(function() {
    	        			if(this.nodeType === 3) {
    	        				return this.data;
    	        			}
    	  			    }).get().join(",");
    	  			}
    	     }
    	}
    },
    "jimGetPosition": function($target,absolute) {
    	if(jimUtil.exists($target) && $target.length) {
    		var $newTarget = $target,
    		type = $newTarget.jimGetType();
    		switch(type) {
    			case itemType.panel:
    				$newTarget = $target.parent();
    				break;
    			default:
    				break;
    		}
    		
    		$newTarget.jimForceVisibility();
			var left =  $newTarget[0].offsetLeft;
			var top =  $newTarget[0].offsetTop;
			if(absolute){
				var parents = $newTarget.parents(".firer:not(.screen, .template,.datarow, #simulation), .masterinstance>.offset");
				var i,iLen,currentParent;
    			for(i=0, iLen=parents.length; i<iLen; i+=1){
    				currentParent = jQuery(parents[i])[0];
					left=left+currentParent.offsetLeft;
					top=top+currentParent.offsetTop;
				}
    			if($newTarget.parents("#alignmentBox").size()>0 && $newTarget.parents("#jim-mobile").size()==0 && $newTarget.parents("#alignmentBox").hasClass('center')){
	    			var alignRect = $newTarget.parents("#alignmentBox")[0].offsetLeft;
	    			left+=alignRect;
	    			//top+=alignRect.top;
    			}
			}
			$newTarget.jimUndoVisibility();
			return  {"left":left, "top":top};
    	}
    },
    "jimGetAbsolutePositionX": function($target) {
    	var pos = jimEvent.fn.jimGetPosition($target,true);
    	if(pos)
    		return pos.left;
    },
    "jimGetAbsolutePositionY": function($target) {
    	var pos = jimEvent.fn.jimGetPosition($target,true);
    	if(pos)
    		return pos.top;
    },
	
    "jimGetPositionX": function($target,absolute) {
    	var pos = jimEvent.fn.jimGetPosition($target,false);
    	if(pos)
    		return pos.left;
    },
    "jimGetPositionY": function($target,absolute) {
    	var pos = jimEvent.fn.jimGetPosition($target,false);
    	if(pos)
    		return pos.top;
    },
    "jimGetWidth": function($targets) {
    	if(jimUtil.exists($targets) && $targets.length) {
    		var i, iLen, width=0, $currentTarget;
    	    for(i=0, iLen=$targets.length; i<iLen; i+=1) {
    	       $currentTarget = jQuery($targets[i]);
    	       width+= $currentTarget.outerWidth();
    	       type = $currentTarget.jimGetType();
    	       switch(type) {
    	       		case itemType.file:
    	       			width += 71; //browse icon width and margins
    	       			break;
       	    		default:
       	    			break;
       	    	}
    	    }
    	    return width;
    	}
    },
    "jimGetHeight": function($target) {
    	if(jimUtil.exists($target) && $target.length) {
    		return $target.outerHeight();
    	}
    },
    "jimGetAngle": function($target) {
    	if(jimUtil.exists($target) && $target.length) {
    		return jimUtil.getRotationDegrees($target);
    	}
    },
    "jimIsVisible": function($target) {
    	if(jimUtil.exists($target) && $target.length) {
    		var $currentParent;
    		var parents = $target.parents(".firer");
    		for(i=0, iLen=parents.length; i<iLen; i+=1){
    			$currentParent = jQuery( parents[i]);
    			var parentVisible = jimEvent.fn.jimIsVisible($currentParent);
    			if(!parentVisible)
    				return false;
    		}
    		return $target.css('display')!='none';
    	}
    },
    "jimGetArea":function($target) {
    	switch($target.jimGetType()) {
        case itemType.dynamicpanel:
        $target = ($target.children("div:visible").length === 0) ? $target.children(".default") : $target.children("div:visible:first");
          break;
	    }
	    if(!jimUtil.exists($target))return false;
	    if(!jimEvent.fn.jimIsVisible($target))return false;
	    var angle = jimUtil.getAdditiveRotationDegrees($target);
	    var rotatedRect;
	    var listAreas = [];
	    //var position = jimEvent.fn.jimGetPosition($target,true);
	    var rect = $target[0].getBoundingClientRect();
	    var position = {left:rect.left,top:rect.top};
	    if(angle!=0){
	    	position.left = rect.left + (rect.width)/2 - $target.jimOuterWidth()/2;
	    	position.top = rect.top + (rect.height)/2 - $target.jimOuterHeight()/2;
	    }
	    if($target.hasClass("shapewrapper")){
	    	if($target.find('path').length>0 && $target.find('path')[0].className.baseVal.indexOf('triangle') > -1){
		    	var vertexOffset = $target.find('path')[0].pathSegList.getItem(0).x;
		    	rotatedRect = jimUtil.getRotatedTriangle(position.left,position.top,vertexOffset,$target.jimOuterWidth(),$target.jimOuterHeight(),angle);
		    	listAreas.push(rotatedRect);
	    	}
	    	else if($target.find('path').length>0 && $target.find('path')[0].className.baseVal.indexOf('callout') > -1){
	    		var points =[];
	    		for(var k=0;k<$target.find('path')[0].pathSegList.numberOfItems-1;k++){
	    			var point = {x:$target.find('path')[0].pathSegList.getItem(k).x,y:$target.find('path')[0].pathSegList.getItem(k).y};
	    			points.push(point);
	    		}
		    	rotatedRect = jimUtil.getRotatedCallout(position.left,position.top,points,$target.jimOuterWidth(),$target.jimOuterHeight(),angle);
		    	listAreas.push(rotatedRect[0]);
		    	listAreas.push(rotatedRect[1]);
	    	}
	    	else{//ellipse
	    		rotatedRect = jimUtil.getRotatedEllipse(position.left,position.top,$target.jimOuterWidth(),$target.jimOuterHeight(),angle);
	    		listAreas.push(rotatedRect);
	    	}
	    }
	    else{
	    	rotatedRect = jimUtil.getRotatedRectangle(position.left,position.top,$target.jimOuterWidth(),$target.jimOuterHeight(),angle);
	    	listAreas.push(rotatedRect);
	    }
	    var dimensions = new areaMutable(listAreas);

		return dimensions;
    }
    /************************* END PROPERTIES FUNCTIONS *****************************/
  });
})(window);
