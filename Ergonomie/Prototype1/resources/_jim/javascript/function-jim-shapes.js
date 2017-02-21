/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

/*
 * jimShapes: provides all the variables and functions necessary to build all the shapes out of Prototyper specifications (ellipses, triangles, callouts, etc.)
 */

(function(window, undefined) {
    var jimShapes = {
        "code" : "SVG",

        //this method takes the current CSS style of shapeSVG. @style argument must be provided because some style attributes cannot be retrieved from CSS (size, padding, etc).
        //@style must provide with: 
             // - width
             // - height
             // - top
             // - left
             // - border-top-width
             // - padding-top, padding-bottom, padding-left, padding-right
             // - opacity
             // - position
             // - transform
        "updateStyle" : function(shapeSVG, style, shapePath) {
            if(this.code === "SVG"){
                SVGEngine.updateStyle(shapeSVG,style,shapePath);
            }
            else if(this.code === "VML"){
                VMLEngine.updateStyle(shapeSVG,style,shapePath);
            }
        },

        "renderAll" : function(shapes) {
            shapes.each(function(evt) {
                if(!supportsVml()){
                    SVGEngine.createSVGShape($(this));
                }
                else{
                    VMLEngine.createVMLShape($(this));
                }
            });
            
            //Fix Chrome/Chromium issue rendering the markers of a line with a drop shadow, when the line is the last rendered shape on the page.
            var shape = jQuery("#simulation").find(".shape :last");
            if(shape!== undefined && shape.is(".line")){
           	 var shadow = shape.css("box-shadow");
           	 if(shadow !== undefined){
           		jimShapes.updateStyle(shape[0],{"box-shadow": shadow});
           	 }
            }
            
        }
    }

    window.jimShapes = jimShapes;

    function cloneElement(origin, target) {
        $(origin).removeClass("non-processed-shape");
        if(this.code === "SVG"){
            $(target).attr("class", origin.prop("className"));
        }
        else{
            $(target).attr("class", origin.prop("className") + " vml");
        }
        $(target).attr("id", origin.prop("id"));
        $(target).attr("title", origin.prop("title"));
    }
    
    function supportsVml() {
        if (typeof supportsVml.supported == "undefined") {
            var a = document.body.appendChild(document.createElement('div'));
            a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
            var b = a.firstChild;
            b.style.behavior = "url(#default#VML)";
            supportsVml.supported = b ? typeof b.adj == "object": true;
            a.parentNode.removeChild(a);
        }
        
        if(supportsVml.supported && !(jQuery.browser.msie && jQuery.browser.version>=9)){
            jimShapes.code = "VML";
            return true;
        }
        else{
            jimShapes.code = "SVG";
            return false;
        }
    }
    
    function getEventClasses(shape) {
          //get child content
          var allClasses = $(shape).attr("class");
          var allClassesArray = allClasses.split(" ");
          var eventClasses = [];
          for(var i=0; i<allClassesArray.length;i++){
              if($.inArray(allClassesArray[i],jimUtil.eventTypes)!= -1){
                  eventClasses.push(allClassesArray[i]);
              }
          }
          return eventClasses.toString().replace(/\,/g, ' ');
    }

    
    $.fn.shapeStyle = function(property){
        //first check special properties stored in css2svg
        if(this[0].css2svg && jimUtil.exists(this[0].css2svg[property]))
            return this[0].css2svg[property];
        else
            return this.css(property);
    }

    var SVGEngine = {
        "defaults" : {
            "svgNS" : "http://www.w3.org/2000/svg",
            "svgDashed" : 3
        },
    
    "createSVGShape" : function($shape) {
            var mainDiv = SVGEngine.createSVGContainer($shape), shapeSVG;
            var svg = mainDiv.firstChild;
            if ($shape.hasClass("ellipse")) {
                shapeSVG = SVGEngine.createEllipse();
            } else if ($shape.hasClass("triangle")) {
                shapeSVG = SVGEngine.createTriangle();
            } else if ($shape.hasClass("callout")) {
                shapeSVG = SVGEngine.createCallout();
            }else if ($shape.hasClass("line")) {
                shapeSVG = SVGEngine.createLineShape($shape);
            }

            if (shapeSVG != null) {
                shapeSVG.svg = svg;
                shapeSVG.shapewrapper = mainDiv;
                
                var currentAngle = parseInt(jimUtil.getRotationDegrees($shape));
                if(shapeSVG.shapewrapper.rotationdeg=== undefined)
                	shapeSVG.shapewrapper["rotationdeg"] = currentAngle;
                
                
                //css2svg stores all the CSS properties of SVG elements that cannot be retrieved from CSS
                shapeSVG.css2svg = {
                    "top" : 0,
                    "left" : 0,
                    "width" : -1,
                    "height" : -1,
                    "border-top-width" : 1,
                    "padding-top" : 0,
                    "padding-bottom" : 0,
                    "padding-left" : 0,
                    "padding-right" : 0,
                    "position" : "absolute",
                    "transform": "rotate(0deg)",
                    "text-top":0,
                    "text-left":0,
                    "text-width":0,
                    "text-height":0,
                    "z-index":1,
                    "box-shadow":"",
                    "-pie-background": $shape.get(0).currentStyle ? $shape.get(0).currentStyle.getAttribute('-pie-background') : null,
                    "original-path": $shape.attr("path"),
                    "original-width":  parseInt($shape.css("width")),
                    "original-height":  parseInt($shape.css("height")),
                    "original-text-top" : parseInt($shape.children(".shapert-clipping").css('top')),
                    "original-text-left" : parseInt($shape.children(".shapert-clipping").css('left')),
                    "original-text-width" : parseInt($shape.find(".content").css('width')),
                    "original-text-height" : parseInt($shape.find(".content").css('height'))
                }
                
                //set SVG id
                $(svg).attr("id", "svg-" + $shape.prop("id"));
                var wrapperId = "shapewrapper-" + $shape.prop("id");
                $(mainDiv).attr("id", wrapperId);
                var autofitClass = $shape.hasClass("autofit")?" autofit":"";
                
                $(mainDiv).attr("class", "shapewrapper " + "shapewrapper-"+jimUtil.getBaseID($shape.prop("id"))+autofitClass);

                cloneElement($shape, shapeSVG);
                $(svg).children("g").children("g").append(shapeSVG);
                
                $shape.jimForceVisibility();
                //set style
                var style = {
                    "attributes" : {
                        "top" : parseInt($shape.css("top")),
                        "left" : parseInt($shape.css("left")),
                        "width" : parseInt($shape.css("width")),
                        "height" : parseInt($shape.css("height")),
                        "padding-top" : parseInt($shape.css("padding-top")),
                        "padding-bottom" : parseInt($shape.css("padding-bottom")),
                        "padding-left" : parseInt($shape.css("padding-left")),
                        "padding-right" : parseInt($shape.css("padding-right")),
                        "opacity": $shape.css("opacity"),
                        "position" : $shape.css("position"),
                        "-webkit-transform": jimUtil.isChrome() ? "rotate("+jimUtil.getRotationDegrees($shape)+"deg)":$shape.css("transform"),
                        "border-top-width" : parseInt($shape.css('border-top-width')),
                        "text-top" : parseInt($shape.children(".shapert-clipping").css('top')),
                        "text-left" : parseInt($shape.children(".shapert-clipping").css('left')),
                        "text-width" : parseInt($shape.find(".content").css('width')),
                        "text-height" : parseInt($shape.find(".content").css('height')),
                        "z-index" : $shape.css("z-index"),
                        "box-shadow" : $shape.css("box-shadow")
                    }
                };
				
				if($shape.hasClass("autofit") && !$shape.hasClass("callout")){
					//autosize
					shapeSVG.css2svg["original-height"] = style.attributes['text-height'];
					style.attributes['height'] = style.attributes['text-height'];
				}
                
                shapeSVG.css2svg["original-text-top"] = parseInt($shape.children(".shapert-clipping").css('top'));
                shapeSVG.css2svg["original-text-left"] = parseInt($shape.children(".shapert-clipping").css('left'));
                shapeSVG.css2svg["original-text-width"] = parseInt($shape.find(".content").css('width'));
                shapeSVG.css2svg["original-text-height"] = parseInt($shape.find(".content").css('height'));
                
                
                $shape.jimUndoVisibility();
                if(shapeSVG.shapeType === 'line'){
                    //add markers
                    SVGEngine.createLineMarkers(shapeSVG);
                }
                else{
                    //keep text, change parent
                    SVGEngine.createTextBox(shapeSVG, $shape);
                }

                var shapePath = $shape.attr("path");
                
                //UPDATE SHAPE FROM CSS and Style
                this.updateStyle(shapeSVG, style, shapePath);
                $shape.remove();
            }
            return shapeSVG;
        },
    
        "createSVGContainer" : function($shape) {
            var svg = document.createElementNS(SVGEngine.defaults.svgNS, "svg"), 
            mainDiv = document.createElement("div"), 
            css = "overflow:hidden;", 
            svgClasses = "svgContainer", 
            wrapperClasses = "shapewrapper";
            
            $(svg, {
                version : 1.1,
                xmlns : SVGEngine.defaults.svgNS
            });
            
            var g = document.createElementNS(SVGEngine.defaults.svgNS, "g");
            var g2 = document.createElementNS(SVGEngine.defaults.svgNS, "g");
            var defsObj = document.createElementNS(SVGEngine.defaults.svgNS, "defs");
            $(svg).append(g);
            $(svg).children("g").append(g2);
            $(svg).append(defsObj);
            $(mainDiv).append(svg);
            
            $(svg).attr("class", svgClasses);
            $(mainDiv).attr("class",wrapperClasses);
            //$(svg).attr("preserveAspectRatio","none");
            $shape.parent()[0].insertBefore(mainDiv, $shape[0]);

            return mainDiv;
        },

        "createEllipse" : function() {
            var ellipseSVG = document.createElementNS(SVGEngine.defaults.svgNS, "ellipse");
            $(ellipseSVG, {
                version : 1.1,
                xmlns : SVGEngine.defaults.svgNS
            });

            ellipseSVG.shapeType = "ellipse";

            return ellipseSVG;
        },

        "_createPathShape" : function() {
            var shapeSVG = document.createElementNS(SVGEngine.defaults.svgNS, "path");
            $(shapeSVG, {
                version : 1.1,
                xmlns : SVGEngine.defaults.svgNS
            });

            return shapeSVG;
        },
        
        "createTriangle" : function() {
            var shapeSVG=this._createPathShape();
            shapeSVG.shapeType = "triangle";
            return shapeSVG;
        },

        "createCallout" : function() {
            var shapeSVG=this._createPathShape();
            shapeSVG.shapeType = "callout";
            return shapeSVG;
        },
        
        "createLineShape" : function($shape) {
            var shapeSVG = this._createPathShape();

            shapeSVG.shapeType = "line";
            shapeSVG.startMarker = $shape.attr("startMarker");
            shapeSVG.endMarker = $shape.attr("endMarker");

            return shapeSVG;
        },

        "createTextBox" : function(shapeSVG, $shape) {
            //get child content
            var $textDiv = $shape.find(".content");
            $textDiv.attr("id", "shapert-" + $shape.prop("id"));
            $textDiv.attr("class", "content firer " + getEventClasses(shapeSVG));
            var $textClipDiv = $shape.children(".shapert-clipping");
            if($textClipDiv.size() > 0)
            	$(shapeSVG.shapewrapper).append($textClipDiv);
            else
            	$(shapeSVG.shapewrapper).append($textDiv);
            
            $textDiv.css("display","block");
        },
        
        "isPath" : function(shapeSVG) {
            return shapeSVG.shapeType==="triangle" || shapeSVG.shapeType==="callout";
        },
        
         // saves styles that cannot be retrieved from CSS style sheet
        "translateCSSChanges" : function(shapeSVG, style) {
            var newWidth, newHeight;
            //check border width
            if (style.attributes) {
                if (style.attributes['border-top-width'] != null) {
                    this._setBorderWidth(shapeSVG, parseInt(style.attributes['border-top-width']));
                }
                if(style.attributes['text-top'] !=null && style.attributes['text-left'] !=null && style.attributes['text-width'] !=null && style.attributes['text-height'] !=null){
                    //first time init
                    this._setTextBoxBoundsInit(shapeSVG,style.attributes['text-top'],style.attributes['text-left'],style.attributes['text-width'],style.attributes['text-height']);
                }
                if (style.attributes['top'] != null && style.attributes['left'] != null) {
                    this._setPosition(shapeSVG, parseInt(style.attributes['top']), parseInt(style.attributes['left']), style.attributes['position']);
                }
                if (style.attributes['width'] != null || style.attributes['height'] != null) {
                    if($(shapeSVG).shapeStyle("width") != -1 && $(shapeSVG).shapeStyle("height") != -1){
                    	newHeight = parseInt(style.attributes['height']);
                    	if(style.attributes['height']=="auto"){
                    		if(shapeSVG.shapeType==="callout")
                    			newHeight = ((style.attributes['text-height'] + $(shapeSVG).shapeStyle("padding-top") + $(shapeSVG).shapeStyle("padding-bottom") + $(shapeSVG).shapeStyle("border-top-width")*2) * parseInt(shapeSVG.css2svg["original-height"]))/shapeSVG.css2svg["original-text-height"];
                    		else
                    			newHeight = style.attributes['text-height'];
                    		style.attributes['height'] = newHeight;
                    	}
                        this._setTextBoxBounds(shapeSVG,{'width':shapeSVG.css2svg["original-width"], 'height':shapeSVG.css2svg["original-height"]},{'width':parseInt(style.attributes['width']), 'height':newHeight});
                    }
                    	this._setSize(shapeSVG, parseInt(style.attributes['width']), parseInt(style.attributes['height']));
                }
                if (style.attributes['padding-top'] != null && style.attributes['padding-bottom'] != null && style.attributes['padding-left'] != null && style.attributes['padding-right'] != null) {
                    var padding = {
                        "top" : parseInt(style.attributes['padding-top']),
                        "bottom" : parseInt(style.attributes['padding-bottom']),
                        "left" : parseInt(style.attributes['padding-left']),
                        "right" : parseInt(style.attributes['padding-right'])
                    };
                    this._setPadding(shapeSVG, padding);
                }
                 if (style.attributes['-webkit-transform'] != null && style.attributes['-webkit-transform'] !== "none") {
                    this._setTransform(shapeSVG, style.attributes['-webkit-transform']);
                }
                if(style.attributes['z-index']){
                    this._setZIndex(shapeSVG, style.attributes['z-index']);
                }
                if(style.attributes['box-shadow']){
                    this._setBoxShadow(shapeSVG, style.attributes['box-shadow']);
                }       
            }
            if (style['attributes']){
            	var pieBackground= style['attributes']['-pie-background'];
                if( pieBackground!=null){
                  if( pieBackground!=='none'){
                	shapeSVG.css2svg['-pie-background']=pieBackground;
                  } else {
                	shapeSVG.css2svg['-pie-background']=null;  
                  }
                }
            }
            if (style.expressions) {
                if (style.expressions['width'] != null && style.expressions['height'] != null) {
                    newWidth = (isNaN(parseInt(style.expressions['width'], 10))) ? eval(style.expressions['width']) : style.expressions['width'];
                    newHeight = (isNaN(parseInt(style.expressions['height'], 10))) ? eval(style.expressions['height']) : style.expressions['height'];
                    //update values, needs old size and old text bounds
                    this._setTextBoxBounds(shapeSVG,{'width':$(shapeSVG).shapeStyle("width"), 'height':$(shapeSVG).shapeStyle("height")},{'width':newWidth, 'height':newHeight});
                    this._setSize(shapeSVG, parseInt(newWidth), parseInt(newHeight));
                }
            }
        },

    "updateStyle" : function(shapeSVG, style, shapePath) {
            var oldSize, oldTextSize, oldBorderWidth;
            oldSize = {
                "width" : $(shapeSVG).shapeStyle("width"),
                "height" : $(shapeSVG).shapeStyle("height")
            };
            
            if (style) {
                //translate changes in CSS
                SVGEngine.translateCSSChanges(shapeSVG, style);
                //end translate
                
                //RESPECT STYLE ORDER UPDATE
                //UPDATE BORDER may change size
                SVGEngine.updateBorder(shapeSVG);
                if (style.attributes) {
                    //UPDATE POSITION
                    if (style.attributes["top"] != null || style.attributes["left"] != null)
                        SVGEngine.updatePosition(shapeSVG);
                    //UPDATE OPACITY    
                    if(style.attributes["opacity"]){
                        SVGEngine.updateOpacity(shapeSVG);
                    }
                }
                //UPDATE SIZE (width, height, paddings ...)
                //if ((style.attributes && (style.attributes["width"] != null || style.attributes["height"] != null)) || style.expressions) {
                    SVGEngine.updateSize(shapeSVG, oldSize);
                //}
            }       
            //UPDATE SHAPE
            SVGEngine.updateShape(shapeSVG, shapePath, oldSize);
            //UPDATE BACKGROUND
            SVGEngine.updateBackground(shapeSVG);
            //UPDATE BOX SHADOW
            SVGEngine.updateBoxShadow(shapeSVG);
            //UPDATE Z-INDEX
            SVGEngine.updateZIndex(shapeSVG);
        },


        "updateBackground" : function(shapeSVG) {
            
        	var backgroundColor=$(shapeSVG).shapeStyle('background-color');
        	
            shapeSVG.setAttribute("fill", backgroundColor);
            
            if($(shapeSVG).shapeStyle('-pie-background')){
                var backgroundImg = $(shapeSVG).shapeStyle('-pie-background'), defsContent;
            } else {
                var backgroundImg = $(shapeSVG).shapeStyle('background-image'), defsContent;
            }

            var parts=[backgroundImg];
            
            if(backgroundImg.match('url\(.*\), .*?-gradient')!=null){
                var i=backgroundImg.indexOf(', ');
                if(i!=-1){
                    parts=[backgroundImg.substring(0,i), backgroundImg.substring(i+1)];
                }
            }
            
            //create random id to avoid repeated patterns (ej:datagrids)
            var random4Id = Math.round(Math.random() * 10000);
            
            if(parts.length == 2 || (backgroundColor!=='transparent' && backgroundImg.match('url')!=null)){
                var patternContainer = document.createElementNS(SVGEngine.defaults.svgNS, "pattern");
                patternContainer.setAttribute("id","svg-fill-pattern-" + $(shapeSVG).prop("id") + random4Id);
                patternContainer.setAttribute("patternUnits", "objectBoundingBox");
                patternContainer.setAttribute("height", 1);
                patternContainer.setAttribute("width", 1);
            }

            
            for(var j=0; j < parts.length; j++){
                var part=parts[j];
                if (part.match('-moz-linear-gradient') != null ) {
                    //moz gradient
                    defsContent = this._getMozGradient(part);
                    defsContent.setAttribute("id", "svg-fill-gradient-"+ $(shapeSVG).prop("id") + random4Id);
                } else if (part.match('-webkit-gradient') != null) {
                    //webkit gradient
                    defsContent = this._getWebkitGradient(part);
                    defsContent.setAttribute("id", "svg-fill-gradient-"+ $(shapeSVG).prop("id") + random4Id);
                } else if (part.match("linear-gradient")){
                    //final proposed draft
                    defsContent = this._getStandardGradient(part);
                    defsContent.setAttribute("id", "svg-fill-gradient-"+ $(shapeSVG).prop("id") + random4Id);
                } else if (part.match("url") != null) {
                    //image
                    var repeat = $(shapeSVG).shapeStyle('background-repeat');
                    var shapeSize = {
                        width : parseInt($(shapeSVG).shapeStyle("width")),
                        height : parseInt($(shapeSVG).shapeStyle("height"))
                    };
                    defsContent = this._getImagePattern(part, repeat, shapeSize);
                    defsContent.setAttribute("id", "svg-fill-image-"+ $(shapeSVG).prop("id") + random4Id);
                }
                if(patternContainer){
                    patternContainer.appendChild(defsContent);
                }
            }
            
            if(patternContainer){
                var $defsObj = $(shapeSVG.svg).children("defs");
                //delete current defs
                $(shapeSVG.svg).children("defs").children("pattern").remove();
                $(shapeSVG.svg).children("defs").children("linearGradient").remove();
                $defsObj.append(patternContainer);
                
                var shapeColorOrGradient = $(shapeSVG).clone().get(0);
                shapeColorOrGradient.attributes.removeNamedItem("id");
                shapeColorOrGradient.attributes.removeNamedItem("class");
                shapeColorOrGradient.attributes.removeNamedItem("stroke");
                shapeColorOrGradient.attributes.removeNamedItem("stroke-width");
                shapeColorOrGradient.attributes.removeNamedItem("style");
                
                var shapeImage = $(shapeSVG).clone().get(0);
                shapeImage.attributes.removeNamedItem("id");
                shapeImage.attributes.removeNamedItem("class");
                shapeImage.attributes.removeNamedItem("stroke");
                shapeImage.attributes.removeNamedItem("stroke-width");
                shapeImage.attributes.removeNamedItem("style");
                
                if(backgroundColor!=='transparent' && backgroundImg.match('gradient')==null){
                	shapeColorOrGradient.setAttribute("fill", backgroundColor);
                }else{
                	shapeColorOrGradient.setAttribute("fill", "url(#svg-fill-gradient-" + $(shapeSVG).prop("id") + random4Id + ")");
                }
                shapeImage.setAttribute("fill", "url(#svg-fill-image-" + $(shapeSVG).prop("id") + random4Id + ")");
                
                if(backgroundColor==='transparent' || backgroundColor=='undefined'){
                    shapeColorOrGradient.setAttribute("fill-opacity","0");
                }
                else{
                   shapeColorOrGradient.setAttribute("fill-opacity","1");
                }
                
                patternContainer.appendChild(shapeColorOrGradient);
                patternContainer.appendChild(shapeImage);
                
                shapeSVG.setAttribute("fill", "url(#" + patternContainer.getAttribute("id") + ")");
            } else if (defsContent != null) {
                defsContent.setAttribute("id", "svg-fill-" + $(shapeSVG).prop("id") + random4Id);
                var $defsObj = $(shapeSVG.svg).children("defs");
                //delete current defs
                $(shapeSVG.svg).children("defs").children("pattern").remove();
                $(shapeSVG.svg).children("defs").children("linearGradient").remove();
                $defsObj.append(defsContent);
                shapeSVG.setAttribute("fill", "url(#" + defsContent.getAttribute("id") + ")");
            }
        },
        
        "updateBoxShadow" : function(shapeSVG){
        	if(jimUtil.isIE()) {
        		 if(jQuery.browser.version<=9) 
        			 return;
        		 else if(shapeSVG.shapeType === 'line')
        			 return;
        	}
        	var boxShadow =  $(shapeSVG).shapeStyle('box-shadow');
        	if(boxShadow === undefined  || boxShadow === null)
        		return;
        	if(boxShadow === "none"){
				$(shapeSVG.svg).children("g")[0].removeAttribute("filter");
				$(shapeSVG.svg).children("defs").children("filter").remove();
				$(shapeSVG.svg).css("width",  "100%"); 
				$(shapeSVG.svg).css("height", "100%");
				$(shapeSVG.svg).css("left",0);
				$(shapeSVG.svg).css("top",0);
			    $(shapeSVG.svg).children("g")[0].setAttribute("transform","translate(0,0)");
				return;
			}
        	var rgb;
        	if(boxShadow.indexOf("rgb")===-1){
        		rgb = boxShadow.substring(boxShadow.indexOf("#"));
        	}else{
        		rgb = boxShadow.slice("rgb")
        		rgb = rgb.substring(0,rgb.indexOf(")")+1);
        		boxShadow =  boxShadow.substring(boxShadow.indexOf(")")+2);
        	}
        	var values = boxShadow.split(" ");
        	
        	var dx = parseInt(values[0]);
        	var dy = parseInt(values[1]);
        	var blur = parseInt(values[2]);
        	var spread = parseInt(values[3]);

        	blur = blur /2; //In SVG, the standard deviation of the Gaussian blur is half the number that you would use to get the same blur with CSS
        	
        	if(dx === 0 && dy===0 && blur===0 && spread===0)
				return;
        	
        	//create random id to avoid repeated patterns (ej:datagrids)
            var random4Id = Math.round(Math.random() * 10000);
        	var $defsObj = $(shapeSVG.svg).children("defs");
        	 //delete current defs
            $(shapeSVG.svg).children("defs").children("filter").remove();
            
            var filter = document.createElementNS(SVGEngine.defaults.svgNS, "filter");
            
            filter.setAttribute("id","filter-" + $(shapeSVG).prop("id") + random4Id);
 
            var xtraSpace = 5;
            var x = dx - (blur*2) -(spread*2)-xtraSpace;
            var y = dy - (blur*2) -(spread*2) -xtraSpace;
            var w = shapeSVG.css2svg["width"]+Math.abs(dx)+((blur)*2)+(spread*4)+xtraSpace;
            var h = shapeSVG.css2svg["height"]+Math.abs(dy)+((blur)*2)+(spread*4)+xtraSpace;
            
            filter.setAttribute("x", x>0 ? 0 : x);
            filter.setAttribute("y",y>0 ? 0 : y);

            filter.setAttribute("width",  w+"px");
            filter.setAttribute("height", h+"px");
            filter.setAttribute("filterUnits", "userSpaceOnUse");
            $defsObj.append(filter);

            if(spread>0){
            	var gaussianBlurSpread  = document.createElementNS(SVGEngine.defaults.svgNS, "feGaussianBlur");
            	gaussianBlurSpread.setAttribute("in","SourceAlpha");
            	gaussianBlurSpread.setAttribute("stdDeviation",spread/2);
            	jQuery(filter).append(gaussianBlurSpread);

            	var componentTransferSpread  = document.createElementNS(SVGEngine.defaults.svgNS, "feComponentTransfer");
            	componentTransferSpread.setAttribute("result","transfer");
            	jQuery(filter).append(componentTransferSpread);

            	var funcA  = document.createElementNS(SVGEngine.defaults.svgNS, "feFuncA");
            	funcA.setAttribute("type","table");
            	funcA.setAttribute("tableValues","0 1 1 1 1 1 1 1 1 1 1 1 1 1");
            	jQuery(componentTransferSpread).append(funcA);

            }

            var gaussianBlur  = document.createElementNS(SVGEngine.defaults.svgNS, "feGaussianBlur");
            gaussianBlur.setAttribute("in",spread>0 ? "transfer" : "SourceAlpha");
            gaussianBlur.setAttribute("stdDeviation",blur);
            jQuery(filter).append(gaussianBlur);

            var offset  = document.createElementNS(SVGEngine.defaults.svgNS, "feOffset");

            offset.setAttribute("result","offsetBlur");
            offset.setAttribute("dx",dx);
            offset.setAttribute("dy",dy);
            jQuery(filter).append(offset);


            var flood  = document.createElementNS(SVGEngine.defaults.svgNS, "feFlood");
            flood.setAttribute("flood-color",rgb);
            flood.setAttribute("flood-opacity",1);
            jQuery(filter).append(flood);

            var composite  = document.createElementNS(SVGEngine.defaults.svgNS, "feComposite");
            composite.setAttribute("in2", "offsetBlur");
            composite.setAttribute("operator","in");
            jQuery(filter).append(composite);


            var merge = document.createElementNS(SVGEngine.defaults.svgNS, "feMerge");
            jQuery(filter).append(merge);   
            var merge1 = document.createElementNS(SVGEngine.defaults.svgNS, "feMergeNode");          
            jQuery(merge).append(merge1);

            var merge2 = document.createElementNS(SVGEngine.defaults.svgNS, "feMergeNode");
            merge2.setAttribute("in","SourceGraphic");         
            jQuery(merge).append(merge2);

           $(shapeSVG.svg).children("g")[0].setAttribute("filter", "url(#" + filter.getAttribute("id") + ")");


           $(shapeSVG.svg).css("width",  w); 
           $(shapeSVG.svg).css("height", h);
          
           
           x= x>0 ? 0 : x;
           y= y>0 ? 0 : y;
           $(shapeSVG.svg).css("left",x);
           $(shapeSVG.svg).css("top",y);
           $(shapeSVG.svg).children("g")[0].setAttribute("transform","translate("+Math.abs(x)+","+Math.abs(y)+")");

       },
       
        "_setBorderWidth" : function(shapeSVG, borderWidth) {
            shapeSVG.css2svg["border-top-width"] = borderWidth;
        },

        "updateBorder" : function(shapeSVG) {
            var borderWidth = $(shapeSVG).shapeStyle("border-top-width");
            $(shapeSVG).attr("stroke", $(shapeSVG).shapeStyle('border-top-color'));
            if(shapeSVG.shapeType=== "ellipse" || SVGEngine.isPath(shapeSVG))
                borderWidth = parseInt(borderWidth)*2;
            $(shapeSVG).attr("stroke-width", borderWidth);
            //border style
            var dashPattern = borderWidth;
            switch($(shapeSVG).shapeStyle('border-top-style')) {
                case "dotted":
                    $(shapeSVG).attr("stroke-dasharray", dashPattern);
                    break;
                case "dashed":
                    $(shapeSVG).attr("stroke-dasharray", dashPattern * SVGEngine.defaults.svgDashed + "," + dashPattern);
                    break;
                default:
                    $(shapeSVG).attr("stroke-dasharray", "");
            }
            
           if(shapeSVG.shapeType === 'line'){
              //update markers color
              SVGEngine._updateColorMarkers(shapeSVG);
            }
        },

        "_setSize" : function(shapeSVG, width, height) {
            if(jimUtil.exists(width) && !isNaN(width))
                shapeSVG.css2svg["width"] = width;
            if(jimUtil.exists(height) && !isNaN(height))
                shapeSVG.css2svg["height"] = height;
        },

        "updateSize" : function(shapeSVG, oldSize) {
            //find radius and center
            var borderWidth = $(shapeSVG).shapeStyle("border-top-width"), 
            width = $(shapeSVG).shapeStyle("width"), 
            height = $(shapeSVG).shapeStyle("height");
            
            if(shapeSVG.shapeType === "line"){
                //border width is height + arrows
                height = SVGEngine._getLineHeight(shapeSVG);
                SVGEngine._setSize(shapeSVG,width,height);
            }
            
            //set viewBox
            // shapeSVG.svg.setAttribute("viewBox","0 0 "+oWidth + " " +oHeight);

            $(shapeSVG.svg).css("width",  width); 
            $(shapeSVG.svg).css("height", height);
            
            $(shapeSVG.shapewrapper).css("width", width);
            $(shapeSVG.shapewrapper).css("height", height);
 
            //re-layout
            this._updateSVGBox(shapeSVG, width, height);
            this._updateTextBox(shapeSVG, width, height);
        },

        "_setPosition" : function(shapeSVG, top, left, position) {
            shapeSVG.css2svg["top"] = top;
            shapeSVG.css2svg["left"] = left;
            shapeSVG.css2svg["position"] = position;
        },

        "updatePosition" : function(shapeSVG) { 
            //change svg wrapper position
            $(shapeSVG.shapewrapper).css("position", $(shapeSVG).shapeStyle("position"));
            $(shapeSVG.shapewrapper).css("left", parseInt($(shapeSVG).shapeStyle("left")) + "px");
            $(shapeSVG.shapewrapper).css("top", parseInt($(shapeSVG).shapeStyle("top")) + "px");
        },

        "_setPadding" : function(shapeSVG, padding) {
            shapeSVG.css2svg["padding-top"] = padding.top;
            shapeSVG.css2svg["padding-bottom"] = padding.bottom;
            shapeSVG.css2svg["padding-left"] = padding.left;
            shapeSVG.css2svg["padding-right"] = padding.right;
        },

        "_updateTextBox" : function(shapeSVG, newWidth, newHeight) {
            
            var borderTopWidthToRemoveFromTextBox = shapeSVG.shapeType==="callout" ? parseInt($(shapeSVG).shapeStyle("border-top-width")) : 0;
            var borderLeftWidthToRemoveFromTextBox = shapeSVG.shapeType==="callout" ? parseInt($(shapeSVG).shapeStyle("border-left-width")) : 0;
            
            var textBoxWidth = parseInt($(shapeSVG).shapeStyle("text-width")) - parseInt($(shapeSVG).shapeStyle("padding-left")) - parseInt($(shapeSVG).shapeStyle("padding-right")) - borderTopWidthToRemoveFromTextBox*2; 
            var textBoxHeight = parseInt($(shapeSVG).shapeStyle("text-height")) - parseInt($(shapeSVG).shapeStyle("padding-top")) - parseInt($(shapeSVG).shapeStyle("padding-bottom")) - borderLeftWidthToRemoveFromTextBox*2;
            
            //set global text attributes: line-height
            var $content = $(shapeSVG.shapewrapper).find(".content");
            $content.css("line-height", $(shapeSVG).shapeStyle("line-height"));
            $content.css("font-family", $(shapeSVG).shapeStyle("font-family"));
            $content.css("font-size", $(shapeSVG).shapeStyle("font-size"));
            $content.css("text-shadow", $(shapeSVG).shapeStyle("text-shadow"));
            //set padding
            var $contentClip = $(shapeSVG.shapewrapper).children(".shapert-clipping");
            $contentClip.css("top", parseInt($(shapeSVG).shapeStyle("text-top")) + parseInt($(shapeSVG).shapeStyle("padding-top")) + borderTopWidthToRemoveFromTextBox);
            $contentClip.css("left", parseInt($(shapeSVG).shapeStyle("text-left")) + parseInt($(shapeSVG).shapeStyle("padding-left")) + borderLeftWidthToRemoveFromTextBox);
            $contentClip.css("width", textBoxWidth + "px");
            $contentClip.css("height", textBoxHeight + "px");
            $content.css("width", textBoxWidth + "px");
            $content.css("height", textBoxHeight + "px");
            
			//set display table again for Safari bug
			$content.css("display","");
        },
        
        "_setTransform" : function(shapeSVG, transform) {
            shapeSVG.css2svg["transform"] = transform;
        },
        
        "_updateTransform" : function(shapeSVG) {
            $(shapeSVG.shapewrapper).css("transform", $(shapeSVG).shapeStyle('transform'));
            $(shapeSVG).css("transform",'rotate(0deg)');
            $(shapeSVG).css("-webkit-transform",'rotate(0deg)');
        },
        
        "_setTextBoxBoundsInit" : function(shapeSVG, top, left, width, height){
            shapeSVG.css2svg["text-top"] = top;
            shapeSVG.css2svg["text-left"] = left;
            shapeSVG.css2svg["text-width"] = width;
            shapeSVG.css2svg["text-height"] = height;
        },
        
        "_setTextBoxBounds" : function(shapeSVG, oldSize, newSize){
            if(jimUtil.exists(newSize.width) && jimUtil.exists(newSize.height)){
                shapeSVG.css2svg["text-top"] = (parseInt(newSize.height) * parseInt( shapeSVG.css2svg["original-text-top"]))/ parseInt(oldSize.height);
                shapeSVG.css2svg["text-left"] = (parseInt(newSize.width) * parseInt( shapeSVG.css2svg["original-text-left"]))/ parseInt(oldSize.width);
                shapeSVG.css2svg["text-width"] = (parseInt(newSize.width) * parseInt( shapeSVG.css2svg["original-text-width"]))/ parseInt(oldSize.width);
                shapeSVG.css2svg["text-height"] = (parseInt(newSize.height) * parseInt( shapeSVG.css2svg["original-text-height"]))/ parseInt(oldSize.height);
            }
        },
        
        "_setZIndex" : function(shapeSVG, index) {
            shapeSVG.css2svg["z-index"] = index;
        },
        
        "updateZIndex" : function(shapeSVG) { 
            $(shapeSVG.shapewrapper).css("z-index", $(shapeSVG).shapeStyle("z-index"));
        },
        
        "_setBoxShadow" : function(shapeSVG, shadow) {
            shapeSVG.css2svg["box-shadow"] = shadow;
        },
       
        "updateOpacity" : function(shapeSVG) {
            $(shapeSVG.shapewrapper).css("opacity", $(shapeSVG).shapeStyle('opacity'));
            shapeSVG.css2svg["opacity"] = $(shapeSVG).shapeStyle('opacity');
            $(shapeSVG).css("opacity","1");
        },

        "_updateSVGBox" : function(shapeSVG, width, height) {
//            $(shapeSVG.svg).css("width", width);
//            $(shapeSVG.svg).css("height", height);
        },
        
        "updateShape" : function(shapeSVG, shapePath, oldSize) {
            var size = {
                "width" : $(shapeSVG).shapeStyle("width"),
                "height" : $(shapeSVG).shapeStyle("height")
            }, 
            clippingPath;
            
            //create random id to avoid repeated clips (ej:datagrids)
            var random4Id = Math.round(Math.random() * 10000);

            //create clip object
            var clipping = document.createElementNS(SVGEngine.defaults.svgNS, "clipPath"), 
            $defs = $(shapeSVG.svg).children("defs"), 
            clipID = "clip-" + shapeSVG.id + random4Id;

            clipping.setAttribute("id", clipID);
            clipping.setAttribute("class","clipPath");

            switch (shapeSVG.shapeType) {
                case "ellipse":
                    //set center
                    rx = size.width / 2, ry = size.height / 2, cx = rx, cy = ry;

                    shapeSVG.setAttribute("cx", cx);
                    shapeSVG.setAttribute("cy", cy);
                    shapeSVG.setAttribute("rx", rx);
                    shapeSVG.setAttribute("ry", ry);

                    clippingPath = document.createElementNS(SVGEngine.defaults.svgNS, "ellipse");
                    clippingPath.setAttribute("cx", cx);
                    clippingPath.setAttribute("cy", cy);
                    clippingPath.setAttribute("rx", rx);
                    clippingPath.setAttribute("ry", ry);
                    break;
                case "triangle":
                case "callout":
                    if (shapePath) {
                        clippingPath = document.createElementNS(SVGEngine.defaults.svgNS, "path");
                        clippingPath.setAttribute("d", shapePath);
                        shapeSVG.setAttribute("d", shapePath);
                    } else if (oldSize) {
                        //check size change
                        var newPath = SVGEngine._getScaledPath(shapeSVG.css2svg["original-path"], {"width": shapeSVG.css2svg["original-width"],"height": shapeSVG.css2svg["original-height"]} , size,true);
                        clippingPath = document.createElementNS(SVGEngine.defaults.svgNS, "path");
                        clippingPath.setAttribute("d", newPath);
                        shapeSVG.setAttribute("d", newPath);
                    }
                    break;
                case "line":
                    if (shapePath) {
                        shapeSVG.setAttribute("d", SVGEngine._getLinePathClipped(shapeSVG,shapePath));
                    } else if (oldSize) {
                        //check size change
                        //var newPath = SVGEngine._getScaledPath(shapeSVG.getAttribute("d"), oldSize, size,false);
                        shapeSVG.setAttribute("d", SVGEngine._getLinePathClipped(shapeSVG,shapePath));
                       // shapeSVG.setAttribute("d", newPath);
                    }
                    //update MARKERS
                    SVGEngine._updateMarkers(shapeSVG);
                    break;
                default:
                    break;
            }

            if (clippingPath) {
                $(clipping).append(clippingPath);
                $defs.find(".clipPath").remove();      
                $defs.append(clipping);
                $(shapeSVG).parent("g")[0].setAttribute("clip-path", "url(#" + clipID + ")");
            }
            
            //apply transformations to wrapper
            SVGEngine._updateTransform(shapeSVG);
        },
        
        "createLineMarkers" : function(shapeSVG) {
            var $defsObj = $(shapeSVG.svg).children("defs");
            
            //create random id to avoid repeated patterns (ej:datagrids)
            var random4Id = Math.round(Math.random() * 10000);
            
            if(shapeSVG.startMarker !== 'none'){
                //create start marker
                var sMarker = document.createElementNS(SVGEngine.defaults.svgNS, "marker");
                var sMarkerId = "start-marker-" + $(shapeSVG).prop("id") + random4Id;
                sMarker.setAttribute("id", sMarkerId);
                sMarker.setAttribute("orient","180");
                //IE9 exception
                sMarker.setAttribute("stroke-width","0px");
                
                //marker PATH
                var sMarkerPath = document.createElementNS(SVGEngine.defaults.svgNS, "path");
                sMarkerPath.setAttribute("d",SVGEngine._getLineMarkerPath(shapeSVG.startMarker));
                sMarker.appendChild(sMarkerPath);
                
                $defsObj.append(sMarker);
                
                //link marker
                shapeSVG.setAttribute("marker-start","url(#"+sMarkerId+")");
            }
            
            if(shapeSVG.endMarker !== 'none'){
                //create end marker
                var eMarker = document.createElementNS(SVGEngine.defaults.svgNS, "marker");
                var eMarkerId = "end-marker-" + $(shapeSVG).prop("id") + random4Id;
                eMarker.setAttribute("id",eMarkerId);
                eMarker.setAttribute("orient","0");
                eMarker.setAttribute("stroke-width","0px");
                
                //marker PATH
                var eMarkerPath = document.createElementNS(SVGEngine.defaults.svgNS, "path");
                eMarkerPath.setAttribute("d",SVGEngine._getLineMarkerPath(shapeSVG.endMarker));
                eMarker.appendChild(eMarkerPath);
 
                $defsObj.append(eMarker);
                
                //link marker
                shapeSVG.setAttribute("marker-end","url(#"+eMarkerId+")");
            }
         },
        
         "_updateMarkers" : function(shapeSVG) {
            var borderWidth = $(shapeSVG).shapeStyle("border-top-width");
            var markerWidth;
            //scale markers
            var $startMarker = $(shapeSVG.svg).children("defs").children('[id^=start-marker]');
            if($startMarker.length != 0){
                markerWidth = SVGEngine._getMarkerHeight(shapeSVG.startMarker,borderWidth);
                $startMarker[0].setAttribute("viewBox","0 0 100 100");
                $startMarker[0].setAttribute("markerWidth",markerWidth+"px");
                $startMarker[0].setAttribute("markerHeight",markerWidth+"px"); 
                $startMarker[0].setAttribute("refX", parseInt((100 * (markerWidth - borderWidth)) / markerWidth));  
                $startMarker[0].setAttribute("refY","50");
                $startMarker[0].setAttribute("preserveAspectRatio","none");
                $startMarker[0].setAttribute('markerUnits', 'userSpaceOnUse');
                
                if(jQuery.browser.msie && jQuery.browser.version>=9){
                    //force markers update for IE9 & IE10
                    $startMarker.remove();
                    $(shapeSVG.svg).children("defs").append($startMarker);
                }
            }
            
            var $endMarker = $(shapeSVG.svg).children("defs").children('[id^=end-marker]');
            if($endMarker.length != 0){  
                markerWidth = SVGEngine._getMarkerHeight(shapeSVG.endMarker,borderWidth);
                $endMarker[0].setAttribute("viewBox","0 0 100 100");
                $endMarker[0].setAttribute("markerWidth",markerWidth+"px");
                $endMarker[0].setAttribute("markerHeight",markerWidth+"px");
                $endMarker[0].setAttribute("refX",parseInt((100 * (markerWidth - borderWidth)) / markerWidth));  
                $endMarker[0].setAttribute("refY","50");  
                $endMarker[0].setAttribute("preserveAspectRatio","none"); 
                $endMarker[0].setAttribute('markerUnits', 'userSpaceOnUse');
                
                if(jQuery.browser.msie && jQuery.browser.version>=9){
                    //force markers update for IE9 & IE10
                    $endMarker.remove();
                    $(shapeSVG.svg).children("defs").append($endMarker);
                }
            }
         },
         
         "_updateColorMarkers" : function(shapeSVG) {
            var $startMarker = $(shapeSVG.svg).children("defs").children('[id^=start-marker]');
            if($startMarker.length != 0){
                $startMarker[0].setAttribute('fill',$(shapeSVG).shapeStyle('border-top-color'));
            }
            var $endMarker = $(shapeSVG.svg).children("defs").children('[id^=end-marker]');
            if($endMarker.length != 0){
                $endMarker[0].setAttribute('fill',$(shapeSVG).shapeStyle('border-top-color'));
            }
         },
         
         "_getLinePathClipped" : function(shapeSVG, path) {
             //rectangle
             var width = $(shapeSVG).shapeStyle("width"),
             height = $(shapeSVG).shapeStyle("height"),
             lineWidth = $(shapeSVG).shapeStyle("border-top-width"),
             leftClipping = 0,
             rightClipping = width;
             
             if(shapeSVG.startMarker !== 'none')
                leftClipping = lineWidth;
             if(shapeSVG.endMarker !== 'none')
                rightClipping = width - lineWidth;

              return "M "+ leftClipping + " " + parseInt(height/2) +" L "+ rightClipping + " " + parseInt(height/2);
         },
         
         "_getLineMarkerPath" : function(markerType) {
             if(markerType === 'block')
                return "M 0 0 L 100 50 L 0 100 Z";
             else if (markerType === 'classic')
                return "M 100 50 L 0 0 L 31 50 L 0 100";
             else
                //return "M 39 60 L 5 81 c -17 27 33 18 26 22 L 16 100 L 100 50 L 16 1 C -7 -3 4 22 6 20 L 6 20 L 39 40 Z";
                return "M 39.688716 40.466926 39.818418 60.051881 7.9118028 79.24773 C -6.6058565 88.636494 5.3977603 106.07944 19.844358 97.146562 L 99.610893 50.324254 21.53048 3.7613489 C 4.631474 -8.1505951 -6.7257532 14.353316 7.6523994 20.881971 Z";
         },
        
        "_getMozGradient" : function(background) {
            var sParams = background.substring(background.indexOf('(', 0) + 1, background.length - 1);
            var params = sParams.split(',');

            var pattern = params[0], 
            regExp3Colors = /(rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)), (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)) \d{1,3}\%, (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))/, 
            regExp2Colors = /(rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)), (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))/,
            colors = sParams.match(regExp3Colors);

            if (colors == null) {
                colors = sParams.match(regExp2Colors)
            }

            var gradientObj = document.createElementNS(SVGEngine.defaults.svgNS, "linearGradient");

            //normal gradient
            if (colors.length == 3) {
                var stopObj1 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), 
                stopObj2 = document.createElementNS(SVGEngine.defaults.svgNS, "stop");

                stopObj1.setAttribute("offset", "0%");
                stopObj1.setAttribute("stop-color", colors[1]);
                stopObj2.setAttribute("offset", "100%");
                stopObj2.setAttribute("stop-color", colors[2]);

                gradientObj.appendChild(stopObj1);
                gradientObj.appendChild(stopObj2);
            }
            //double gradient
            else if (colors.length == 4) {
                var stopObj1 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), stopObj2 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), stopObj3 = document.createElementNS(SVGEngine.defaults.svgNS, "stop");

                stopObj1.setAttribute("offset", "0%");
                stopObj1.setAttribute("stop-color", colors[1]);
                stopObj2.setAttribute("offset", "50%");
                stopObj2.setAttribute("stop-color", colors[2]);
                stopObj3.setAttribute("offset", "100%");
                stopObj3.setAttribute("stop-color", colors[3]);

                gradientObj.appendChild(stopObj1);
                gradientObj.appendChild(stopObj2);
                gradientObj.appendChild(stopObj3);
            }

            var oArray = pattern.split(" ");
            gradientObj.setAttribute("x1", "0%");
            gradientObj.setAttribute("x2", (oArray[1] != "0%") ? "100%" : "0%");
            gradientObj.setAttribute("y1", "0%");
            gradientObj.setAttribute("y2", (oArray[0] != "0%") ? "100%" : "0%");

            return gradientObj;
        },

        "_getWebkitGradient" : function(background) {
            var sParams = background.substring(background.indexOf('(', 0) + 1, background.length - 1), params = sParams.split(',');

            var orient = params[2], regExpOrient = /(\d{1,3})\% (\d{1,3})\%/, oPattern = orient.match(regExpOrient);

            var gradientObj = document.createElementNS(SVGEngine.defaults.svgNS, "linearGradient");

            gradientObj.setAttribute("x1", "0%");
            gradientObj.setAttribute("x2", oPattern[1] + "%");
            gradientObj.setAttribute("y1", "0%");
            gradientObj.setAttribute("y2", oPattern[2] + "%");

            var colorFrom = sParams.match(/from\((rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))\)/), colorStop = sParams.match(/color-stop\(0.5, (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))\)/), colorTo = sParams.match(/to\((rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))\)/);

            if (colorFrom != null && colorTo != null) {
                var stopObj1 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), stopObj2 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), stopObj3 = document.createElementNS(SVGEngine.defaults.svgNS, "stop");

                stopObj1.setAttribute("offset", "0%");
                stopObj1.setAttribute("stop-color", colorFrom[1]);
                gradientObj.appendChild(stopObj1);
                if (colorStop != null) {
                    stopObj2.setAttribute("offset", "50%");
                    stopObj2.setAttribute("stop-color", colorStop[1]);
                    gradientObj.appendChild(stopObj2);
                }
                stopObj3.setAttribute("offset", "100%");
                stopObj3.setAttribute("stop-color", colorTo[1]);
                gradientObj.appendChild(stopObj3);
            }

            return gradientObj;
        },
        
          "_getStandardGradient" : function(background) {
            var sParams = background.substring(background.indexOf('(', 0) + 1, background.length - 1), params = sParams.split(',');

            var orient = params[0];

            var gradientObj = document.createElementNS(SVGEngine.defaults.svgNS, "linearGradient");

            var regExp3Colors = /(#[a-f0-9A-F]{3,6}),\s?(#[a-f0-9A-F]{3,6}) \d{1,3}\%,\s?(#[a-f0-9A-F]{3,6})/, 
            regExp2Colors = /(#[a-f0-9A-F]{3,6}),\s?(#[a-f0-9A-F]{3,6})/,
            colors = sParams.match(regExp3Colors);

            if (colors == null) {
                colors = sParams.match(regExp2Colors);
            }

            if (colors == null){
                var regExp3ColorsMoz = /(rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)), (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)) \d{1,3}\%, (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))/, 
                regExp2ColorsMoz = /(rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)), (rgb\(\d{1,3}, \d{1,3}, \d{1,3}\))/,
                colors = sParams.match(regExp3ColorsMoz);

                if (colors == null) {
                    colors = sParams.match(regExp2ColorsMoz);
                }

            }
            
            var gradientObj = document.createElementNS(SVGEngine.defaults.svgNS, "linearGradient");

            //normal gradient
            if (colors.length == 3) {
                var stopObj1 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), 
                stopObj2 = document.createElementNS(SVGEngine.defaults.svgNS, "stop");

                stopObj1.setAttribute("offset", "0%");
                stopObj1.setAttribute("stop-color", colors[1]);
                stopObj2.setAttribute("offset", "100%");
                stopObj2.setAttribute("stop-color", colors[2]);

                gradientObj.appendChild(stopObj1);
                gradientObj.appendChild(stopObj2);
            }
            //double gradient
            else if (colors.length == 4) {
                var stopObj1 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), stopObj2 = document.createElementNS(SVGEngine.defaults.svgNS, "stop"), stopObj3 = document.createElementNS(SVGEngine.defaults.svgNS, "stop");

                stopObj1.setAttribute("offset", "0%");
                stopObj1.setAttribute("stop-color", colors[1]);
                stopObj2.setAttribute("offset", "50%");
                stopObj2.setAttribute("stop-color", colors[2]);
                stopObj3.setAttribute("offset", "100%");
                stopObj3.setAttribute("stop-color", colors[3]);

                gradientObj.appendChild(stopObj1);
                gradientObj.appendChild(stopObj2);
                gradientObj.appendChild(stopObj3);
            }

            if(orient==="to right"){
              gradientObj.setAttribute("x1", "0%");
              gradientObj.setAttribute("x2", "100%");
              gradientObj.setAttribute("y1", "0%");
              gradientObj.setAttribute("y2", "0%");
            } else {
              gradientObj.setAttribute("x1", "0%");
              gradientObj.setAttribute("x2", "0%");
              gradientObj.setAttribute("y1", "0%");
              gradientObj.setAttribute("y2", "100%");
            }

            return gradientObj;
        },

        "_getImagePattern" : function(background, repeat, shapeSize) {
            var sImage = background.replace(/"/g, '');
            sImage = sImage.replace(/'/g,'');
            var patternObj = document.createElementNS(SVGEngine.defaults.svgNS, "pattern"), imageObj = document.createElementNS(SVGEngine.defaults.svgNS, "image");

            sImage = sImage.substring(sImage.indexOf('(', 0) + 1, sImage.indexOf(')'));

            
            
            patternObj.setAttribute("patternUnits", "objectBoundingBox");

            this._getImgSize(sImage, function(imageSize) {
                var width = imageSize.width, height = imageSize.height;
                
                var repeatString = repeat.split(',');
                //chrome sends us strings like "repeat, repeat", "repeat-x, repeat-x", etc...
                switch (repeatString[0]) {
                    case "repeat":
                        patternObj.setAttribute("patternUnits", "userSpaceOnUse");
                        break;
                    case "repeat-x":
                        patternObj.setAttribute("patternUnits", "objectBoundingBox");
                        width = imageSize.width / shapeSize.width;
                        height = 1;
                        break;
                    case "repeat-y":
                        patternObj.setAttribute("patternUnits", "objectBoundingBox");
                        width = 1;
                        height = imageSize.height / shapeSize.height;
                        break;
                    default:
                        patternObj.setAttribute("patternUnits", "objectBoundingBox");
                        width = 1;
                        height = 1;
                        break;
                }
                patternObj.setAttribute("width", width);
                patternObj.setAttribute("height", height);

                imageObj.setAttribute("x", 0);
                imageObj.setAttribute("y", 0);
                imageObj.setAttribute("width", imageSize.width);
                imageObj.setAttribute("height", imageSize.height);

                imageObj.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', sImage);

                patternObj.appendChild(imageObj);
            });

            return patternObj;
        },

        "_getImgSize" : function(imgSrc, callback) {
            var newImg = new Image();
            newImg.src = imgSrc;
            var height = newImg.height;
            var width = newImg.width;
            newImg.onload = function() {
                var size = {
                    width : newImg.width,
                    height : newImg.height
                };
                callback(size);
            };
        },
        
        "_getLineHeight" : function(shapeSVG) {
            //CODE FROM SHAPEUTILS
            var borderWidth = $(shapeSVG).shapeStyle("border-top-width");
            var height=0;
            
            return Math.max(SVGEngine._getMarkerHeight(shapeSVG.startMarker,borderWidth),SVGEngine._getMarkerHeight(shapeSVG.endMarker,borderWidth));
        },
        
        "_getMarkerHeight" : function(markerType,borderWidth) {
            //CODE FROM SHAPEUTILS
            var height=0;
            if(markerType=== "open"){
                //biggest arrow type
                // get triangle base
                var triangleHeight = borderWidth * 3.8;
                height = parseInt((triangleHeight * Math.tan(Math.PI / 6)) * 2);
                // add arcs extra size
                height += 2 * (parseInt((borderWidth / 2) - ((borderWidth / 2) * Math.sin(Math.PI / 3)))) + 3;
            }
            else if(markerType !== "none"){
                //other types of arrow, all have the same size
                height = borderWidth * 3;
            }
            else{
                //no marker
                height = borderWidth;
            }
            return height;
        },

        "_getScaledPath" : function(path, oldSize, newSize, closedPath) {
            var regExpPathM = /^M\s(\d*\s\d*)/, 
            scaledPoint = {
                "x" : 0,
                "y" : 0
            };
            
            var tempPath = path;
            
            var LS = tempPath.replace(" Z","").split("L ");
            var pointsL = [];
            for (var i = 1; i < LS.length; i++) {
                if( LS[i].indexOf("Z")==-1 && LS[i].indexOf("M")==-1)
                    pointsL.push(LS[i].trim());
            }

            var pointM = tempPath.match(regExpPathM)[1].split(" "), 
            scaledPath = "";
            
            (pointM[0] == 0) ? scaledPoint.x = 0 : scaledPoint.x = parseInt((newSize.width * pointM[0]) / oldSize.width);
            (pointM[1] == 0) ? scaledPoint.y = 0 : scaledPoint.y = parseInt((newSize.height * pointM[1]) / oldSize.height);
            scaledPath = "M " + scaledPoint.x + " " + scaledPoint.y;

            for (var i = 0; i < pointsL.length; i++) {
                   var point = pointsL[i].split(" ");
                   (point[0] == 0) ? scaledPoint.x = 0 : scaledPoint.x = parseInt((newSize.width * point[0]) / oldSize.width);
                   (point[1] == 0) ? scaledPoint.y = 0 : scaledPoint.y = parseInt((newSize.height * point[1]) / oldSize.height);
                   scaledPath += " L " + scaledPoint.x + " " + scaledPoint.y;
            }
            if(closedPath)
                scaledPath += " Z";
            return scaledPath;
        }
    }
    
    var vmlCreatorDoc;
    
     var VMLEngine = {
        "defaults" : {
            "vmlNS" : "urn:schemas-microsoft-com:vml",
            "vmlDashed" : 3
        },
        
        "createVMLElement": function( tag ) {
            var vmlPrefix = 'v';
            if( !vmlCreatorDoc ) {
                vmlCreatorDoc = "t";
                //vmlCreatorDoc = document.createDocumentFragment();
                document.namespaces.add( vmlPrefix,this.defaults.vmlNS, "#default#VML");
            }
            var elem = document.createElement( vmlPrefix + ':' + tag );
            s = elem.style;
            s['behavior'] = 'url(#default#VML)';
            return elem;
        },
        
        "createVMLShape" : function($shape) {
            var mainDiv = this.createVMLContainer($shape), shapeVML;
            //var vml = mainDiv.firstChild;
            if ($shape.hasClass("ellipse")) {
                shapeVML = this.createEllipse();
            } else if ($shape.hasClass("triangle") || $shape.hasClass("callout")) {
                shapeVML = this.createPathShape();
            }else if ($shape.hasClass("line")) {
                shapeVML = this.createLineShape($shape);
            }

            if (shapeVML != null) {
                shapeVML.shapewrapper = mainDiv;
                
                //css2svg stores all the CSS properties of SVG elements that cannot be retrieved from CSS
                shapeVML.css2svg = {
                    "top" : 0,
                    "left" : 0,
                    "width" : -1,
                    "height" : -1,
                    "background-color": "transparent",
                    "background-image": "none",
                    "border-top-width" : 1,
                    "border-top-color" : "black",
                    "border-top-style" : "solid",
                    "padding-top" : 0,
                    "padding-bottom" : 0,
                    "padding-left" : 0,
                    "padding-right" : 0,
                    "position" : "absolute",
                    "transform": "rotate(0deg)",
                    "filter" : "alpha(opacity=100)",
                    "text-top":0,
                    "text-left":0,
                    "text-width":0,
                    "text-height":0,
                    "-pie-background": "none",
                    "rotation" : 0,
                    "margin-left" : 0,
                    "margin-top" : 0,
                    "z-index" : 1,
                    "original-path": $shape.attr("path"),
                    "original-width":  parseInt($shape.css("width")),
                    "original-height":  parseInt($shape.css("height")),
                    "original-text-top" : parseInt($shape.children(".shapert-clipping").css('top')),
                    "original-text-left" : parseInt($shape.children(".shapert-clipping").css('left')),
                    "original-text-width" : parseInt($shape.find(".content").css('width')),
                    "original-text-height" : parseInt($shape.find(".content").css('height'))
                };
                
                //set VML id
                //$(vml).attr("id", "vml-" + $shape.prop("id"));
                $(mainDiv).attr("id", "shapewrapper-" + $shape.prop("id"));
                var autofitClass = $shape.hasClass("autofit")?" autofit":"";
                
                $(mainDiv).attr("class", "shapewrapper " + "shapewrapper-"+jimUtil.getBaseID($shape.prop("id"))+autofitClass);

                cloneElement($shape, shapeVML);
                $(mainDiv).append(shapeVML);
                
                $shape.jimForceVisibility();
                //set style
                var style = {
                    "attributes" : {
                        "top" : parseInt($shape.css("top")),
                        "left" : parseInt($shape.css("left")),
                        "width" : parseInt($shape.css("width")),
                        "height" : parseInt($shape.css("height")),
                        "background-color": $shape.css("background-color"),
                        "background-image": $shape.css("background-image"),
                        "padding-top" : parseInt($shape.css("padding-top")),
                        "padding-bottom" : parseInt($shape.css("padding-bottom")),
                        "padding-left" : parseInt($shape.css("padding-left")),
                        "padding-right" : parseInt($shape.css("padding-right")),
                        "filter": $shape.css("filter"),
                        "position" : $shape.css("position"),
                        "-webkit-transform": $shape.css("transform"),
                        "border-top-width" : isNaN(parseInt($shape.css('border-top-width')))?0:parseInt($shape.css('border-top-width')),
                        "border-top-color" : $shape.css('border-top-color'),
                        "border-top-style" : $shape.css('border-top-style'),
                        "text-top" : parseInt($shape.children(".shapert-clipping").css('top')),
                        "text-left" : parseInt($shape.children(".shapert-clipping").css('left')),
                        "text-width" : parseInt($shape.find(".content").css('width')),
                        "text-height" : parseInt($shape.find(".content").css('height')),
                        "-pie-background": $shape.get(0).currentStyle ? $shape.get(0).currentStyle.getAttribute('-pie-background') : null,
                        "margin-left" : $shape.css("margin-left"),
                        "margin-top" : $shape.css("margin-top"),
                        "rotation" : $shape.css("rotation"),
                        "z-index" : $shape.css("z-index")
                    }
                };
                
				if($shape.hasClass("autofit") && !$shape.hasClass("callout")){
					//autosize
					shapeVML.css2svg["original-height"] = style.attributes['text-height'];
					style.attributes['height'] = style.attributes['text-height'];
				}
				
				shapeVML.css2svg["original-text-top"] = parseInt($shape.children(".shapert-clipping").css('top'));
				shapeVML.css2svg["original-text-left"] = parseInt($shape.children(".shapert-clipping").css('left'));
				shapeVML.css2svg["original-text-width"] = parseInt($shape.find(".content").css('width'));
                shapeVML.css2svg["original-text-height"] = parseInt($shape.find(".content").css('height'));
                
                 $shape.jimUndoVisibility();
                 
                if(shapeVML.shapeType === 'line'){
                }
                else{
                    //keep text, change parent
                    this.createTextBox(shapeVML, $shape);
                    
                }
                
                this.createFillElement(shapeVML,$shape);
                this.createStrokeElement(shapeVML,$shape);

                var shapePath = $shape.attr("path");
                
                //UPDATE SHAPE FROM CSS and Style
                 jimShapes.updateStyle(shapeVML, style, shapePath);      
                 $shape.remove();                   
  
                //HTML code injection (necessary in IE8 to render shape modifications)        
                var cloneArray = shapeVML.css2svg;           
                shapeVML.outerHTML = shapeVML.outerHTML;
                //var shapeVMLNew = document.getElementById(shapeVML.id);
                var shapeVMLNew = jQuery(".ui-page:last #" + shapeVML.id)[0];
                shapeVMLNew.css2svg = cloneArray;
                shapeVMLNew.shapewrapper = shapeVMLNew.parentNode;
                //Need to set rotation the first time for the shape to be repositioned
                shapeVMLNew.rotation = parseInt($(shapeVML).shapeStyle("rotation"));
            }
            return shapeVMLNew;
        },
        
        "createFillElement" : function(shapeVML,$shape){
            var fill = this.createVMLElement("fill");
            fill.setAttribute("class", "vml");
            fill.type = "solid";
            fill.setAttribute("id", "fill-" + $shape.prop("id"));                 
            $(shapeVML).append(fill);
        },
        
        "createStrokeElement" : function(shapeVML,$shape){
           //stroke element
           var stroke = this.createVMLElement("stroke");
           $(stroke).attr("class", "vml");
           $(stroke).attr("id", "stroke-" + $shape.prop("id"));
           $(stroke).attr("o:insetpen","t");
           $(shapeVML).append(stroke);
        },

        "createVMLContainer" : function($shape) {
            var mainDiv = document.createElement("div"), 
            css = "overflow:hidden;", 
            shapeClasses = "shapecontainer", 
            wrapperClasses = "shapewrapper";
            //mainDiv.style.margin = "0 auto";

            $(mainDiv).attr("class",wrapperClasses);
            $shape.parent()[0].insertBefore(mainDiv, $shape[0]);

            return mainDiv;
        },
        
        "createEllipse" : function() {
            var ellipseVML = this.createVMLElement("oval");           
           $(ellipseVML).attr("shapeType","ellipse");

            return ellipseVML;
        },
        
        "createPathShape" : function() {
            var shapeVML = this.createVMLElement("shape");
            var pathElement = this.createVMLElement("path");
            $(pathElement).attr("class","vml");
            $(shapeVML).attr("o:insetpen","true");
            $(pathElement).attr("o:insetpen","true");
            
            $(shapeVML).append(pathElement);

            $(shapeVML).attr("shapeType","path");

            return shapeVML;
        },
        
         "createLineShape" : function($shape) {
            var shapeVML = this.createVMLElement("shape");
            var pathElement = this.createVMLElement("path");
            $(pathElement).attr("class","vml");
            
            $(shapeVML).append(pathElement);

            $(shapeVML).attr("shapeType","line");
            $(shapeVML).attr("startMarker",$shape.attr("startMarker"));
            $(shapeVML).attr("endMarker",$shape.attr("endMarker"));

            return shapeVML;
        },
        
        "createTextBox" : function(shapeVML, $shape) {         
            //get child content
            var $textDiv = $shape.find(".content");
            $textDiv.attr("id", "shapert-" + $shape.prop("id"));
            $textDiv.attr("class", "content firer " + getEventClasses(shapeVML));
            var $textClipDiv = $shape.children(".shapert-clipping");
            if($textClipDiv.size() > 0)
            	$(shapeVML.shapewrapper).append($textClipDiv);
            else
            	$(shapeVML.shapewrapper).append($textDiv);            
        },
        
         // saves styles that cannot be retrieved from CSS style sheet
        "translateCSSChanges" : function(shapeVML, style) {
            var newWidth, newHeight;
            //check border width
            if (style.attributes) {
                if (style.attributes['border-top-width'] != null) {
                    this._setBorder(shapeVML, parseInt(style.attributes['border-top-width']),style.attributes['border-top-color'],style.attributes['border-top-style']);
                }
                if(style.attributes['text-top'] !=null && style.attributes['text-left'] !=null && style.attributes['text-width'] !=null && style.attributes['text-height'] !=null){
                    //first time init
                    this._setTextBoxBoundsInit(shapeVML,style.attributes['text-top'],style.attributes['text-left'],style.attributes['text-width'],style.attributes['text-height']);
                }
                if (style.attributes['top'] != null && style.attributes['left'] != null) {
                    this._setPosition(shapeVML, parseInt(style.attributes['top']), parseInt(style.attributes['left']), style.attributes['position']);
                }
                if (style.attributes['width'] != null || style.attributes['height'] != null) {
                    if($(shapeVML).shapeStyle("width") != -1 && $(shapeVML).shapeStyle("height") != -1){
                    	newHeight = parseInt(style.attributes['height']);
                    	if(style.attributes['height']=="auto"){
                    		if(shapeVML.shapeType==="callout")
                    			newHeight = ((style.attributes['text-height'] + $(shapeVML).shapeStyle("padding-top") + $(shapeVML).shapeStyle("padding-bottom") + $(shapeVML).shapeStyle("border-top-width")*2) * parseInt(shapeVML.css2svg["original-height"]))/shapeVML.css2svg["original-text-height"];
                    		else
                    			newHeight = style.attributes['text-height'];
                    		style.attributes['height'] = newHeight;
                    	}
                        this._setTextBoxBounds(shapeVML,{'width':shapeVML.css2svg["original-width"], 'height':shapeVML.css2svg["original-height"]},{'width':parseInt(style.attributes['width']), 'height':newHeight});
                    }
                    	this._setSize(shapeVML, parseInt(style.attributes['width']), parseInt(style.attributes['height']));
                }
                if (style.attributes['padding-top'] != null && style.attributes['padding-bottom'] != null && style.attributes['padding-left'] != null && style.attributes['padding-right'] != null) {
                    var padding = {
                        "top" : parseInt(style.attributes['padding-top']),
                        "bottom" : parseInt(style.attributes['padding-bottom']),
                        "left" : parseInt(style.attributes['padding-left']),
                        "right" : parseInt(style.attributes['padding-right'])
                    };
                    this._setPadding(shapeVML, padding);
                }
                 if (style.attributes['-webkit-transform'] != null) {
                    this._setTransform(shapeVML, style.attributes['-webkit-transform']);
                }
                if (style.attributes['background-color'] != null || style.attributes['background-image'] != null || style.attributes['-pie-background'] != null) {
                    this._setBackground(shapeVML, style.attributes['background-color'], style.attributes['background-image'], style.attributes['-pie-background']);
                }
                if (style.attributes['filter'] != null) {
                    this._setOpacity(shapeVML, style.attributes['filter'], style.attributes['margin-left'],style.attributes['margin-top']);
                }
                 if (style.attributes['rotation'] != null) {
                     this._setRotation(shapeVML, style.attributes['rotation']);
                }
                if (style.attributes['margin-left'] != null && style.attributes['margin-top']) {
                     this._setTextMargins(shapeVML, style.attributes['margin-left'],style.attributes['margin-top']);
                }
                if(style.attributes['z-index']){
                    this._setZIndex(shapeVML, style.attributes['z-index']);
                }
            }
            if (style.expressions) {
                if (style.expressions['width'] != null && style.expressions['height'] != null) {
                    newWidth = (isNaN(parseInt(style.expressions['width'], 10))) ? eval(style.expressions['width']) : style.expressions['width'];
                    newHeight = (isNaN(parseInt(style.expressions['height'], 10))) ? eval(style.expressions['height']) : style.expressions['height'];
                    //update values, needs old size and old text bounds
                    this._setTextBoxBounds(shapeVML,{'width':$(shapeVML).shapeStyle("width"), 'height':$(shapeVML).shapeStyle("height")},{'width':newWidth, 'height':newHeight});
                    this._setSize(shapeVML, parseInt(newWidth), parseInt(newHeight));
                }
            }
        },
        
        "_setPosition" : function(shapeVML, top, left, position) {
            shapeVML.css2svg["top"] = top;
            shapeVML.css2svg["left"] = left;
            shapeVML.css2svg["position"] = position;
            
            //reset
            $(shapeVML).css("top","0px");
            $(shapeVML).css("left","0px");
        },

        "_setPadding" : function(shapeVML, padding) {
            shapeVML.css2svg["padding-top"] = padding.top;
            shapeVML.css2svg["padding-bottom"] = padding.bottom;
            shapeVML.css2svg["padding-left"] = padding.left;
            shapeVML.css2svg["padding-right"] = padding.right;
        },
        
        "_setBorder" : function(shapeVML, borderWidth, borderColor,borderStyle) {
            shapeVML.css2svg["border-top-width"] = borderWidth;
            shapeVML.css2svg["border-top-color"] = borderColor;
            shapeVML.css2svg["border-top-style"] = borderStyle;
            
            //reset
            $(shapeVML).css("border","none");
            $(shapeVML).css("border-style","none");
            $(shapeVML).css("border-width","0px");
        },
        
        "_setSize" : function(shapeVML, width, height) {
            if(jimUtil.exists(width) && !isNaN(width))
            	shapeVML.css2svg["width"] = width;
            if(jimUtil.exists(height) && !isNaN(height))
            	shapeVML.css2svg["height"] = height;
        },
        
        "_setTextBoxBoundsInit" : function(shapeVML, top, left, width, height){
            shapeVML.css2svg["text-top"] = top;
            shapeVML.css2svg["text-left"] = left;
            shapeVML.css2svg["text-width"] = width;
            shapeVML.css2svg["text-height"] = height;
        },
        
        "_setTextBoxBounds" : function(shapeVML, oldSize, newSize){
            if(jimUtil.exists(newSize.width) && jimUtil.exists(newSize.height)){
                shapeVML.css2svg["text-top"] = (parseInt(newSize.height) * parseInt(shapeVML.css2svg["original-text-top"]))/ parseInt(oldSize.height);
                shapeVML.css2svg["text-left"] = (parseInt(newSize.width) * parseInt(shapeVML.css2svg["original-text-left"]))/ parseInt(oldSize.width);
                shapeVML.css2svg["text-width"] = (parseInt(newSize.width) * parseInt(shapeVML.css2svg["original-text-width"]))/ parseInt(oldSize.width);
                shapeVML.css2svg["text-height"] = (parseInt(newSize.height) * parseInt(shapeVML.css2svg["original-text-height"]))/ parseInt(oldSize.height);
            }
        },
        
        "_setTransform" : function(shapeVML, transform) {
            shapeVML.css2svg["transform"] = transform;
        },
        
        "_setOpacity" : function(shapeVML, filter) {
            shapeVML.css2svg["filter"] = filter;
        },
        
        "_setRotation" : function(shapeVML, rotation) {
            shapeVML.css2svg["rotation"] = rotation;
        },
        
        "_setTextMargins" : function(shapeVML, marginLeft, marginTop) { 
           shapeVML.css2svg["margin-left"] = marginLeft;
           shapeVML.css2svg["margin-top"] = marginTop; 
            
            //reset
             $(shapeVML).css("margin-left", "0px");
             $(shapeVML).css("margin-top", "0px");
             $(shapeVML.shapewrapper).css("margin-left", "0px");
             $(shapeVML.shapewrapper).css("margin-top", "0px");
        },
        
        "_setBackground" : function(shapeVML, color, image, pie) {
            if(color != undefined){
                shapeVML.css2svg["background-color"] = color;
            }
            if(image != undefined)
                shapeVML.css2svg["background-image"] = image;
            if(pie != undefined){
                shapeVML.css2svg["-pie-background"] = pie;
            }
            else{
                shapeVML.css2svg["-pie-background"] = 'none';
            }
            
            //reset
            $(shapeVML).css("background-color","transparent");
            $(shapeVML).css("background-image","none");
            //$(shapeVML).css("-pie-background","none");
        },
        
        "_setZIndex" : function(shapeVML, index) {
            shapeVML.css2svg["z-index"] = index;
            $(shapeVML).css("z-index","auto");
        },
        
        
        "updateStyle" : function(shapeVML, style, shapePath) {
            var oldSize, oldTextSize, oldBorderWidth;
            oldSize = {
                "width" : $(shapeVML).shapeStyle("width"),
                "height" : $(shapeVML).shapeStyle("height")
            };
            
            if (style) {
                //translate changes in CSS
                this.translateCSSChanges(shapeVML, style);
                //end translate
                
                //RESPECT STYLE ORDER UPDATE
                //UPDATE BORDER may change size
                this.updateBorder(shapeVML);
                if (style.attributes) {
                    //UPDATE POSITION
                    if (style.attributes["top"] != null || style.attributes["left"] != null)
                        this.updatePosition(shapeVML);
                    //UPDATE OPACITY    
                    if(style.attributes["opacity"] || style.attributes["filter"]){
                        this.updateOpacity(shapeVML);
                    }
                }
                //UPDATE SIZE (width, height, paddings ...)
                //if ((style.attributes && (style.attributes["width"] != null || style.attributes["height"] != null)) || style.expressions) {
                    this.updateSize(shapeVML, oldSize);
                //}
            }       
            //UPDATE SHAPE
            this.updateShape(shapeVML, shapePath, oldSize);
            //UPDATE BACKGROUND
            this.updateBackground(shapeVML);
            this.updateZIndex(shapeVML);
        },
        
        "updateSize" : function(shapeVML, oldSize) {
            //find radius and center
            var borderWidth = $(shapeVML).shapeStyle("border-top-width"), 
            width = $(shapeVML).shapeStyle("width"), 
            height = $(shapeVML).shapeStyle("height");
            
            // if($(shapeVML).attr("shapeType") === "line"){
                // //border width is height + arrows
                // height = this._getLineHeight(shapeVML);
                // this._setSize(shapeVML,width,height);
            // }
            
            $(shapeVML.shapewrapper).css("width", width);
            $(shapeVML.shapewrapper).css("height", height);
 
            //re-layout
            this._updateVMLBox(shapeVML, width, height);
            this._updateTextBox(shapeVML, width, height);
        },
        
        "_updateVMLBox" : function(shapeVML, width, height) {
            // $(shapeVML.vml).css("width", width);
            // $(shapeVML.vml).css("height", height);
            
             $(shapeVML).css("width", width);
             $(shapeVML).css("height", height);
        },
        
        "_updateTextBox" : function(shapeVML, newWidth, newHeight) {       
            var textBoxWidth = parseInt($(shapeVML).shapeStyle("text-width")) - parseInt($(shapeVML).shapeStyle("padding-left")) - parseInt($(shapeVML).shapeStyle("padding-right")) - parseInt($(shapeVML).shapeStyle("border-top-width"))*2; 
            var textBoxHeight = parseInt($(shapeVML).shapeStyle("text-height")) - parseInt($(shapeVML).shapeStyle("padding-top")) - parseInt($(shapeVML).shapeStyle("padding-bottom")) - parseInt($(shapeVML).shapeStyle("border-top-width"))*2;
            
            //set global text attributes: line-height
            var $content = $(shapeVML.parentNode).find(".content");
            $content.css("line-height", $(shapeVML).shapeStyle("line-height"));
            $content.css("font-family", $(shapeVML).shapeStyle("font-family"));
            $content.css("font-size", $(shapeVML).shapeStyle("font-size"));
            //set padding
            var $contentClip = $(shapeVML.shapewrapper).children(".shapert-clipping");
            $contentClip.css("top", parseInt($(shapeVML).shapeStyle("text-top")) + parseInt($(shapeVML).shapeStyle("padding-top")) + parseInt($(shapeVML).shapeStyle("border-top-width")));
            $contentClip.css("left", parseInt($(shapeVML).shapeStyle("text-left")) + parseInt($(shapeVML).shapeStyle("padding-left")) + parseInt($(shapeVML).shapeStyle("border-top-width")));
            $contentClip.css("width", textBoxWidth + "px");
            $contentClip.css("height", textBoxHeight + "px");
            $content.css("width", textBoxWidth + "px");
            $content.css("height", textBoxHeight + "px");
        },
        
        "updatePosition" : function(shapeVML) { 
            //change vml wrapper position
            $(shapeVML).css("position","absolute");
            $(shapeVML.parentNode).css("position", $(shapeVML).shapeStyle("position"));
            $(shapeVML.parentNode).css("left", parseInt($(shapeVML).shapeStyle("left")) + "px");
            $(shapeVML.parentNode).css("top", parseInt($(shapeVML).shapeStyle("top")) + "px");
        },
        
        "updateZIndex" : function(shapeVML) { 
            $(shapeVML.parentNode).css("z-index", $(shapeVML).shapeStyle("z-index"));
        },
        "updateOpacity" : function(shapeVML) {
            //$(shapeVML.shapewrapper).css("filter", $(shapeVML).shapeStyle('filter'));
            
            $(shapeVML.parentNode).css("filter", "");
           // $(shapeVML.parentNode).css("filter",  "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)");
            
            

            //var opacity = this._getOpacity(shapeVML);     
            
            // $(shapeVML).children("stroke").attr("opacity", opacity);
            // $(shapeVML).children("fill").attr("opacity", opacity);
            // $(shapeVML).children("fill").attr("o:opacity2", opacity);
            // $(shapeVML).css("filter", "alpha(opacity=100)");
        },

        "updateBorder" : function(shapeVML) {
            var borderWidth = $(shapeVML).shapeStyle("border-top-width");
            shapeVML.strokecolor = $(shapeVML).shapeStyle('border-top-color');
            if($(shapeVML).attr("shapeType")=== "ellipse" || $(shapeVML).attr("shapeType") === "path")
                borderWidth = parseInt(borderWidth);
            shapeVML.strokeweight = borderWidth+"px";
            if(borderWidth <= 0){
                //$(shapeVML).attr("stroked", "false");
                shapeVML.stroked ="false";
            }
            //border style
            //get stroke element
            var $stroke = $(shapeVML).find("#stroke-"+$(shapeVML).prop("id"));
            $stroke[0].joinstyle = "miter";
            var dashPattern = borderWidth;
            switch($(shapeVML).shapeStyle('border-top-style')) {
                case "dotted":
                    $stroke[0].dashstyle = "dot";
                    break;
                case "dashed":
                    $stroke[0].dashstyle = "dash";
                    break;
                default:
                    $stroke[0].dashstyle = "solid";
                    break;
            };
             //$(shapeVML).attr("insetpen", "t");
             
             if($(shapeVML).attr("shapeType")=== "line"){
              //update markers
              $stroke.attr("StartArrow", $(shapeVML).attr("startMarker"));
              $stroke.attr("EndArrow", $(shapeVML).attr("endMarker"));  
             }
        },
        
        "updateShape" : function(shapeVML, shapePath, oldSize) {
            var size = {
                "width" : $(shapeVML).shapeStyle("width"),
                "height" : $(shapeVML).shapeStyle("height")
            };
            var borderWidth = $(shapeVML).shapeStyle("border-top-width");

            switch ($(shapeVML).attr("shapeType")) {
                case "ellipse":
                    //oval dimensions
                    shapeVML.coordorigin = "0 0";
                    $(shapeVML).css("width", size.width - (borderWidth));
                    $(shapeVML).css("height", size.height - (borderWidth));
                    $(shapeVML).css("top", (borderWidth/2));
                    $(shapeVML).css("left", (borderWidth/2));
                    break;
                case "path":
                    if (jimUtil.exists(shapePath)) {
                        shapePath = shapePath.replace("Z","xe");
                        //IE9
                        $(shapeVML).children("v\\:path").attr("v", shapePath);
                        //IE8
                        $(shapeVML).children("path").attr("v", shapePath);
                        //coordsize
                        $(shapeVML).attr("coordsize", size.width + " " + size.height);
                        $(shapeVML).attr("coordorigin", "0 0");
                    } else if (oldSize) {
                        // //check size change
                        // var newPath = this._getScaledPath($(shapeVML).children("path").attr("v"), oldSize, size,true);
                        // $(shapeVML).children("path").attr("v", newPath);
                    }
                    break;
                case "line":
                    if (shapePath) {
                        //IE9
                        $(shapeVML).children("v\\:path").attr("v", shapePath);
                        //IE8
                        $(shapeVML).children("path").attr("v", shapePath);
                        //coordsize
                        $(shapeVML).attr("coordsize", size.width + " " + size.height);
                        $(shapeVML).attr("coordorigin", "0 0");
                    }
                    break;
                default:
                    break;
            }
            //apply transformations to wrapper
           this._updateTransform(shapeVML);
        },
        
        "_updateTransform" : function(shapeVML) {
            //IE8: rotation and opacity are set together
            var degrees = parseInt($(shapeVML).shapeStyle("rotation"));
            var opacity = this._getOpacity(shapeVML);  
            
            //$(shapeVML).attr('style', $(shapeVML).attr('style') +"; rotation:"+  degrees +";");
            
            
            //rotate text
            var $content = $(shapeVML.parentNode).find(".content");
            $content.css("margin-top", parseInt($(shapeVML).shapeStyle("margin-top")));
            $content.css("margin-left", $(shapeVML).shapeStyle("margin-left"));
            
            shapeVML.rotation = degrees;
            
            var deg2radians = Math.PI * 2 / 360;

            var rad = degrees * deg2radians;
            var costheta = Math.cos(rad);
            var sintheta = Math.sin(rad);

            var matrixTransformValue = "";
            if (degrees != 0.0){
                matrixTransformValue = " progid:DXImageTransform.Microsoft.Matrix(SizingMethod = 'auto expand',M11=" + costheta + ",M12=" + -sintheta + ",M21=" + sintheta + ",M22=" + costheta + ") alpha(opacity=" + opacity +")";
            }
            else{
                matrixTransformValue = " alpha(opacity=" + opacity +")";
            }
            
            $content.css('filter', matrixTransformValue);
            //$(shapeVML.parentNode).css('filter', matrixTransformValue);
            
        },
        
        "updateBackground" : function(shapeVML) {
            shapeVML.fillcolor = $(shapeVML).shapeStyle('background-color');
            if($(shapeVML).shapeStyle('background-color') ==="transparent"){
                shapeVML.filled = "f";
            }
            else{
                shapeVML.filled = "t";
            }
            
            var fillElement = $(shapeVML).find("#fill-"+$(shapeVML).prop("id"))[0];
            
            if($(shapeVML).shapeStyle('-pie-background') && $(shapeVML).shapeStyle('-pie-background') !== 'none'){
                var backgroundImg = $(shapeVML).shapeStyle('-pie-background'), defsContent;
            } else {
                var backgroundImg = $(shapeVML).shapeStyle('background-image'), defsContent;
                fillElement.type = "solid";
            }

            var parts=[backgroundImg];
            
            if(backgroundImg.match('url.*-gradient')!=null){
                var i=backgroundImg.indexOf(',');
                if(i!=-1){
                    parts=[backgroundImg.substring(0,i), backgroundImg.substring(i+1)];
                }
            }
            
            var patternContainer;
            if(parts.length > 1){
                patternContainer = this.createVMLElement("fill");
                patternContainer.setAttribute("id","shape-fill-pattern-" + $(shapeVML).prop("id"));
                patternContainer.setAttribute("rotate", "false");
            }
            
            for(var j=0; j < parts.length; j++){
                var part=parts[j];
                if (part.match("linear-gradient")){
                    //final proposed draft
                    patternContainer = this._updateStandardGradient(part,shapeVML);
                    shapeVML.filled="t";
                } else if (part.match("url") != null) {
                    //TODO
                    //image
                    var repeat = $(shapeVML).shapeStyle('background-repeat');
                    var shapeSize = {
                        width : parseInt($(shapeVML).shapeStyle("width")),
                        height : parseInt($(shapeVML).shapeStyle("height"))
                    };
                    // patternContainer = this._getImagePattern(part, repeat, shapeSize);
                    // patternContainer.setAttribute("id", "svg-fill-image-"+ $(shapeVML).prop("id"));
                }else{
                    //solid background
                    if(fillElement.colors){
                        fillElement.colors.value = "";
                    }
                    else{
                        fillElement.colors = "";
                    }
                    fillElement.color2 = "";
                    fillElement.type = "solid";
                    if(part!=="none"){
                        shapeVML.fillcolor = part;
                        shapeVML.filled="t";
                    }
                }
            }
        },
        
        "_getOpacity" : function(elem) {
            var opa = $(elem).css('filter');
            if (opa) {
              opa = parseInt( opa.replace(')','').replace('alpha(opacity=','') );
              if (isNaN(opa) || opa === '') {
                return "100";
              }
            }
            return opa;
        },
        
        "_updateStandardGradient" : function(background,shapeVML) {
            var gradientObj = $(shapeVML).find("#fill-"+$(shapeVML).prop("id"))[0];
            gradientObj.type = "gradient";
                
            var sParams = background.substring(background.indexOf('(', 0) + 1, background.length - 1), params = sParams.split(',');

            var orient = params[0];

            var regExp3Colors = /(#[a-f0-9A-F]{3,6}),\s?(#[a-f0-9A-F]{3,6}) \d{1,3}\%,\s?(#[a-f0-9A-F]{3,6})/, 
            regExp2Colors = /(#[a-f0-9A-F]{3,6}),\s?(#[a-f0-9A-F]{3,6})/,
            colors = sParams.match(regExp3Colors);

            if (colors == null) {
                colors = sParams.match(regExp2Colors);
            }

            //normal gradient
            gradientObj.color = "";
            gradientObj.color2 = "";
            
            if (colors.length == 3) {
                gradientObj.color = colors[2];
                gradientObj.color2 = colors[1];
                if(gradientObj.colors){
                    gradientObj.colors.value = "";
                }
                else{
                    gradientObj.colors = "";
                }
            }
            //double gradient
            else if (colors.length == 4) {
                gradientObj.color = colors[1];
                gradientObj.color2 = colors[1];
                if(gradientObj.colors){
                    gradientObj.colors.value = ".5 " + colors[2];
                }
                else{
                    gradientObj.colors = ".5 " + colors[2];
                }
                shapeVML.fillcolor = colors[1];
            }

            if(orient==="to right"){
                gradientObj.angle = "90";
            } else {
                gradientObj.angle = "0";
            }

            return gradientObj;
        },
        
         "_getImagePattern" : function(background, repeat, shapeSize) {
            var sImage = background.replace(/"/g, '');
            sImage = sImage.replace(/'/g,'');
            
           var patternObj = $(shapeVML).find("#fill-"+$(shapeVML).prop("id"))[0];
           patternObj.type = "frame";

            sImage = sImage.substring(sImage.indexOf('(', 0) + 1, sImage.indexOf(')'));

            this._getImgSize(sImage, function(imageSize) {
                var width = imageSize.width, height = imageSize.height;
                
                var repeatString = repeat.split(',');
                //chrome sends us strings like "repeat, repeat", "repeat-x, repeat-x", etc...
                switch (repeatString[0]) {
                    case "repeat":
                        patternObj.setAttribute("patternUnits", "userSpaceOnUse");
                        break;
                    case "repeat-x":
                        patternObj.setAttribute("patternUnits", "objectBoundingBox");
                        width = imageSize.width / shapeSize.width;
                        height = 1;
                        break;
                    case "repeat-y":
                        patternObj.setAttribute("patternUnits", "objectBoundingBox");
                        width = 1;
                        height = imageSize.height / shapeSize.height;
                        break;
                    default:
                        patternObj.setAttribute("patternUnits", "objectBoundingBox");
                        width = imageSize.width / shapeSize.width;
                        height = imageSize.height / shapeSize.height;
                        break;
                }
                patternObj.setAttribute("width", width);
                patternObj.setAttribute("height", height);

                imageObj.setAttribute("x", 0);
                imageObj.setAttribute("y", 0);
                imageObj.setAttribute("width", imageSize.width);
                imageObj.setAttribute("height", imageSize.height);

                imageObj.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', sImage);

                patternObj.appendChild(imageObj);
            });

            return patternObj;
        },
        
        "_getScaledPath" : function(path, oldSize, newSize, closedPath) {
            var regExpPathM = /^M\s(\d*\s\d*)/, 
            scaledPoint = {
                "x" : 0,
                "y" : 0
            };
            
            var LS = path.replace(" xe","").split("L ");
            var pointsL = [];
            for (var i = 1; i < LS.length; i++) {
                if( LS[i].indexOf("x")==-1 && LS[i].indexOf("M")==-1)
                    pointsL.push(LS[i].trim());
            }

            var pointM = path.match(regExpPathM)[1].split(" "), 
            scaledPath = "";

            (pointM[0] == 0) ? scaledPoint.x = 0 : scaledPoint.x = parseInt((newSize.width * pointM[0]) / oldSize.width);
            (pointM[1] == 0) ? scaledPoint.y = 0 : scaledPoint.y = parseInt((newSize.height * pointM[1]) / oldSize.height);
            scaledPath = "M " + scaledPoint.x + " " + scaledPoint.y;

            for (var i = 0; i < pointsL.length; i++) {
                   var point = pointsL[i].split(" ");
                   (point[0] == 0) ? scaledPoint.x = 0 : scaledPoint.x = parseInt((newSize.width * point[0]) / oldSize.width);
                   (point[1] == 0) ? scaledPoint.y = 0 : scaledPoint.y = parseInt((newSize.height * point[1]) / oldSize.height);
                   scaledPath += " L " + scaledPoint.x + " " + scaledPoint.y;
            }
            if(closedPath)
                scaledPath += " xe";
            return scaledPath;
        },
        
        "_getRotationDegrees": function(sFilter) {
        var angle = 0; 
        if(jQuery.browser.msie && jQuery.browser.version<=8) {
            var filter = sFilter;
            if(filter===undefined || filter==="auto")
            	return angle;
            filter = filter.slice(filter.indexOf("M11=")+4,filter.length);
            var a = filter.substring(0, filter.indexOf(","));
            filter = filter.slice(filter.indexOf("M21=")+4,filter.length);
            var b = filter.substring(0, filter.indexOf(","));
            angle = ((Math.round(Math.atan2(b, a) * (180/Math.PI)) + 360) % 360);
        }
        return parseInt(angle);
      },
     }

})(window); 
