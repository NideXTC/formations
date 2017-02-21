/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  var $navigationTree = jQuery("#sidepanel #navigationtree"),
      $canvasName = jQuery("#infoContent").find("#canvasname"),
	  $requirements = jQuery("#sidepanel .requirement .requirement-node"),
	  $reqComponents = jQuery("#sidepanel .requirement .requirement-component");
	  $reqIntegrations = jQuery("#sidepanel .requirement .requirement-integration");
	  $reqFilter = jQuery("#sidepanel .requirement #filterRequirements"),
	  $allRequirements = jQuery("#sidepanel .requirement .filterAllRequirements"),
	  $screenRequirements = jQuery("#sidepanel .requirement .filterScreenRequirements"),
	  $dialogShadow = jQuery(".dialogShadow");
	  $reqCompDialog = jQuery(".requirementComponentsDialog");
	  
  var uuidREGEXP = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;	  
	  
  $navigationTree
    .click(function(event) {
      var $firer = jQuery(event.target || event.srcElement), $node = $firer.closest("li");
      if($node.length) {
        event.stopPropagation();
        if(($firer.hasClass("icon") && !$node.hasClass("leaf")) || $node.hasClass("folder")) {
          $node.toggleClass("closed").toggleClass("open");
        } else if (!$node.hasClass("folder") && !$node.closest(".section").hasClass("requirement")) {
          closeRequirementDialog();
          jimMain.navigate($node.children("a").attr("href"), {"transition": "none"}, 2);
        }
        return false;
      }
    })
    .bind("load", function(event, target) {
      var name;
      $navigationTree.find(".current").removeClass("current").end().find("a").each(function(i, link) {
        if(link.attributes.href.value === target) {
          link.className += " current";
		  $(link).closest("li").addClass("current");
          return false;
        }
      });
      
      name = lookUpName(target);
      $canvasName.text("/ "+name).attr("title", name);
    });
  
  function showElement(element, done) {
	element.show();
	var height = element[0].getBoundingClientRect().height;
	element.css("height", 0);
	element.animate({height:height}, {
		done: function() {
		  element.css("height", "");
		  done();
		}
	});
  }
  
  function hideElement(element, done) {
	element.animate({height:0},
		{done: function() {
		  element.css("height","");
		  element.hide();
		  done();
		}}
	);
  }
  
  $(".sidepanelTab").bind("click", function (event) {
  	selectPanelTab($(this));
  });
 
  $requirements.click(function(event) {
	var obj = $(this);
	selectRequirement(obj);
  });
  
  $reqComponents.click(function(event) {
  	var obj = $(this);
  	var dialog = $()
  	var components = obj.attr("componentid").split(",");
  	
  	if (components.length == 1) {
  	  closeRequirementDialog();
  	  showRequirementElement(components[0], obj.attr("screen"));
  	}
  	else if (components.length > 1) {
  	  $("#requirementComponentsList").empty();
  	  var canvas = obj.attr("canvasID").split(",");
  	  var canvasUuid = obj.attr("screen").split(",");
  	  generateRequirementComponents(components, canvas, canvasUuid);
  		
  	  if (!$reqCompDialog.hasClass("active")) {
  	    $dialogShadow.fadeIn();
  	    $reqCompDialog.addClass("active");
  	  }
  	}
  });
  
   $reqIntegrations.click(function(event) {
  	var obj = $(this);
  	var url = obj.attr("integrationURL");

  	window.open(url, '_blank');
  });
   
  $allRequirements.click(function(event) {
    if (!$allRequirements.hasClass("active")) {
  	  $allRequirements.addClass("active");
  	  $screenRequirements.removeClass("active");
	  $reqFilter.parent().children().css("display","");
  	}
  });
  
  $screenRequirements.click(function(event) {
	if (!$screenRequirements.hasClass("active")) {
	  $screenRequirements.addClass("active");
	  $allRequirements.removeClass("active");
	  filterRequirements();
	}
  });
  
  $("#requirementCloseButton").add($dialogShadow).click(function (event) {
	closeRequirementDialog();
  });
  
  function closeRequirementDialog() {
	$dialogShadow.fadeOut();
	$reqCompDialog.removeClass("active");
	$("#requirementComponentsList").empty();
  }

  function generateRequirementComponents(components, canvas, canvasUuid) {
	var listComponent = $("#requirementComponentsList");
	
	components.map( function(x, i) {
	  var div = $("<div>", {"class" : "requirementDialogComponent"});
	  var label = $("<div>").text((x.match(uuidREGEXP)) ? canvas[i] : x);	  
	  div.append(label);
	  div.append($("<div>").text(canvas[i]));
	  
	  listComponent.append(div);
//	  if (i < components.length - 1) 
//		listComponent.append($("<div>", {"class" : "requirementComponentSeparator"}));
	  
	  label.on('click', function (event) {
		showRequirementElement(x, canvasUuid[i]);
		closeRequirementDialog();
	  });
	});
  }
  
  function filterRequirements() {
  	var currentScreen = $("#simulation").attr('class').match(/(?:s-|t-|sc-)[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
  	currentScreen = ((currentScreen == null) ? "" : currentScreen).concat($(".master").map(function () {return this.id;}).toArray());
	  
  	$requirements.each(function (index, value) {
  	  var object = $(value).closest("li");
  	  var link = object.find(".requirement-component");
			
  	  var showReq = link.length <= 0;
  	  var l = (showReq) ? "" : link.attr("screen").split(',');
  	  showReq = showReq || !(currentScreen.map(function(x) {return l.indexOf(x) > -1;})
  	  									  .reduce(function(a,b) {return a || b;}));
  	  if (showReq)
	  	object.css("display","none");
    });
  }
  
 function selectPanelTab(element){
 	var parent = $(element.parent());
 	if (!element.hasClass("active") && !parent.hasClass("animation")) {
  		parent.addClass("animation");
  		var active = element.parent().children(".active");
  		
  		active.removeClass("active");
  		element.addClass("active");
  		
  		var screens = $("#sidepanel .screens.section");
  		var scenarios = $("#sidepanel .scenario.section");
  		var requirements = $("#sidepanel .requirement.section");
  		
  		screens.stop();
  		scenarios.stop();
  		requirements.stop();
  		
  		var newActive;
  		if (element[0].id == "scenarioTab") newActive = scenarios;
  		else if (element[0].id == "screenTab") newActive = screens;
  		else newActive = requirements;
  		
  		var oldId = active.attr("id");
  		var oldActive;
  		if (oldId == "scenarioTab") oldActive = scenarios;
  		else if (oldId == "screenTab") oldActive = screens;
  		else oldActive = requirements;
  		
  		//FIREFOX FIX
  		oldActive.attr("openHeight", oldActive[0].getBoundingClientRect().height);
  		oldActive.animate({height:0},{duration: 400});
  		
  		newActive.show();
  		newActive.css("height","");
		var h = newActive[0].getBoundingClientRect().height;
		if (h == 0) h = newActive.attr("openHeight"); // firefox
  		newActive.css("height",0);
  		newActive.animate({height:h}, {duration: 400});

  		setTimeout(function () {parent.removeClass("animation"); newActive.css({"height":""})}, 450);
  	}
 }
 
 function selectRequirement(element){
 	element.closest(".section").css("height", "");
	
	if (!element.hasClass("animation")) {
	  var target = element.parent().children(".requirement-content");
	  element.addClass("animation");
	  var removeClass = function () {element.removeClass("animation")};
	  
	  if (!element.hasClass("active")) {
	    var oldActive = $($(element.closest("#navigationtree")).find("span.active"));
	    if (oldActive.length > 0) {
	      oldActive.removeClass("active");
		  element.addClass("active");
		  hideElement(oldActive.parent().children(".requirement-content"), removeClass);
          showElement(target, removeClass);
	    }
	    else {
	      element.addClass("active");
		  showElement(target, removeClass);
        }
      }
      else {
        element.removeClass("active");
        hideElement(target, removeClass);
      }
	}
 }
 
 function showRequirementElement(component, canvas){
	var prefix = canvas.substring(0,2);
  	
  	if (!jimUtil.hasCanvas(canvas)) {
  	  var folder;
  	  
  	  if (prefix == "s-") folder = "screens/";
  	  if (prefix == "t-") folder = "templates/";
  	  if (prefix == "m-") {
  		folder = "masters/";
  		if (canvas.substring(2) != component) component = canvas.substring(2,10) + "-" + component;
  	  }
  	  else if (prefix == "sc") {
  		if ($(document.body).hasClass("noScenarios")) return;
  		prefix += "-";
  		folder = "scenarios/";
  	  }

  	  jimMain.navigate(folder + canvas.substring(prefix.length));
  	  $("#simulation").attr("toHighlight", prefix + component);
  	} else {
  	  var masterclass = "";
  	  var m = "";

  	  // master
  	  if (canvas.substring(0,1) == "m") {
  		if (canvas.substring(2) != component) m = canvas.substring(2,10) + "-";
  		if ($("#" + prefix + m + component).closest(".masterinstance").length > 0) masterclass = ".masterinstance ";
  	  } 
  	  
  	  // scenario
  	  if (prefix == "sc") prefix += "-";
  	  
      var c = $(masterclass + "#" + prefix + m + component);
      jimHighlight.highlightElement(c);
    }
 }
  var jimRequirements = {
	"showRequirement": function(reqID) {
		$reqContents = jQuery("#sidepanel .requirement .requirement-content[reqID="+reqID+"]");
		var element = $reqContents.children(".requirement-links").children(".requirement-component");
		if(element && element.length>0)
			showRequirementElement(element.attr("componentid").split(',',1)[0], element.attr("screen").split(',',1)[0]);
			
		jQuery("#sidepanel").trigger("openPane");
		selectPanelTab(jQuery("#requirementsTab"));
		if(element && element.length>0)
			selectRequirement(element.closest(".requirement-content").siblings(".requirement-node"));
	},
	"openRequirementByID" : "",
	"filterRequirements" : function() {
	  if ($screenRequirements.hasClass("active")) {
		$reqFilter.parent().children().css("display","");
		filterRequirements();
	  }
	}
  }
  window.jimRequirements = jimRequirements;
  
})(window);