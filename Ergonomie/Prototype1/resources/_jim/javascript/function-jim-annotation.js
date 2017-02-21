/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {

  var
  /*********************** START LOCAL FIELD DECLARATION ************************/
  activeClass = "selected",
  hiddenClass = "hidden",
  scopedClass = "scoped",
  replyingClass = "replying";
  editingClass = "editing";
  closedClass = "closed",
  commentOnClass = "on",
  commentOffClass = "off",
  attachmentSetCalss = "attachment-set",
  currentComponentClass = "current-element",
  overCurrentComponentClass = "over-current-element",
  $navigationBtn = jQuery("#navigate-btn"),
  $grid = jQuery("#comment-grid"),
  $comments = jQuery("#comments"),
  $scopeButtons = jQuery("#scope-btns").children(".tabs"),
  $allScope = jQuery("#scope-all-btn"),
  $screenScope = jQuery("#scope-screen-btn"),
  $simulation = jQuery("#simulation"),
  $body = jQuery("body"),
  $sidepanel = jQuery("#sidepanel"),
  $commentpanel = jQuery(".commentpanel"),
  $commentsBtnImg = jQuery("#comments-switch-img"),
  $jimBody = jQuery("#jim-body"),
  $userDialog = jQuery("#user-dialog"),
  $removeUserImage = jQuery("#user-dialog #remove-button"),
  $tutorial = jQuery("#tutorial-ui");
  templates = {},
  rootTemplate = "root-template",
  commentTemplate = "comment-template",
  reloadDelay = 180000, /* reload every 3 min */
  reloadCounterLimit = 50,
  reloadCounter = 50, /* set reload limit */

  /*********************** END LOCAL FIELD DECLARATION **************************/
  
  /*********************** START REMOTE FIELD DECLARATION ***********************/
  message = "Leave a comment...",
  addCommentClass = "add-comment",
  $blockui = jQuery("#blockui"),
  $dialog = jQuery("#dialog"),
  $textareaAnnotation = jQuery("textarea.annotation"),
  messageTemplate = "message-template",
  isRemote = false, /* set true when loading remote data was successful */
  currentData = { "author": null };
  /*********************** END REMOTE FIELD DECLARATION *************************/
  
  /*********************** START LOCAL METHOD DEFINITION ************************/
  /* START DATA FUNCTIONS */
  function loadDataLocal() {
	    if(jimUtil.isChromeLocal() && jimUtil.chromeExtension){
	    	//use extension
	    	//send ready event to extension
		    var getCommentsEvent = window.document.createEvent('Event');
		    getCommentsEvent.initEvent('getCommentsEvent', true, true);  
	    	document.getElementById('chromeTransfer').dispatchEvent(getCommentsEvent);
	    
			$('#chromeTransfer').bind('ajaxCommentsDoneEvent', function () {
			  var json = JSON.parse($(this).text());
			  
    	      if(json && json.comments && json.comments.length) {
	    	        updateComments(json.comments, false);
	    	  }
    	      else {
	    	        removeComments();
	    	  }
    	      document.getElementById('chromeTransfer').innerText="";
    	      console.log("Comments loaded.");
		    });
			$('#chromeTransfer').bind('ajaxCommentsFailEvent', function () {
				removeComments();
				document.getElementById('chromeTransfer').innerText="";
		    });
	    }
	    else{
	    	jQuery.ajax({
	    	      "url": "comments/annotations.json",
	    	      "dataType": "json"
	    	    })
	    	    .done(function(json, textStatus, jqXHR) {
	    	    	console.log("Comments loaded.");
	    	      if(json && json.comments && json.comments.length) {
	    	        updateComments(json.comments, false);
	    	      } else {
	    	        removeComments();
	    	      }
	    	    })
	    	    .fail(function(xhr, status, error) {
	    	      removeComments();
	    	    });
	    }
  }
  /* END DATA FUNCTIONS */
  
  /* START GRID FUNCTIONS */
  function filterComments() {
    var $rootComment;
    $scopeButtons.removeClass(activeClass);
    $screenScope.addClass(activeClass);
	var numIcons = filterCommentIcons();
	updateCommentCounter(numIcons);
  }
  
  function updateCommentCounter(numIcons){
  var numComments = 0;
  var $canvases = jimUtil.getCanvases();
  /*if(numIcons>0){
	numComments = numIcons;
  }
  else{*/
	  $(".groupComments").each(function(index){
			fullElementID = $(this).find("input#elementID").val();
			var endIndex = fullElementID.indexOf("/");
			var canvasID=fullElementID.substr(0,endIndex);
			var elementID=fullElementID.substr(endIndex+1,fullElementID.length);
			var elem = jQuery("#"+elementID);
			if($canvases.contains(canvasID)){
				numComments += $(this).find(".root").length;
			}
		});
		
	/*}*/
	if(numComments>0)
		$("#comments-page-counter-img").css("display","inline-block");
	else
		$("#comments-page-counter-img").hide();
	$("#comments-page-counter").text(numComments);
  }
  /* END GRID FUNCTIONS */
  
  function updateCurrentUser(authorName, authorEmail, authorID, hasPicture){
	$("#user-name").text(authorName);
	$("#user-email").text(authorEmail);
	$("#user-image").css('background-image','');
	
	var newSrc = "";
	if(!hasPicture){
		$("#user-image").addClass("nopicture");
		$("#user-image").removeClass("userImage");
	}
	else {
		$("#user-image").removeClass("nopicture");
		$("#user-image").addClass("userImage");
		newSrc = '../../../../images/pictures/'+authorID+'.png?' + Math.random();
		$("#user-image").css('background-image',"url('"+newSrc+"')");
	}
	$("#user-id").val(authorID);
	
	updateCommentUserImages(authorID,newSrc,hasPicture);
  }
  
    function removeDialogImage(){
	$("#dialog-user-img").addClass("nopicture");
	$("#dialog-user-img").attr('src','./resources/_jim/images/sidepanel/nopicture_icon.png');
	$("#change-img-clipping span").text("UPLOAD PICTURE");
	//replace file input
	jQuery("#user-dialog .input-file").replaceWith("<input type='file' class='input-file' name='file' value='' tabindex='-1' />");
	addInputFileListeners();
  }
  
  function updateDialogImage(imageFile){
	if(imageFile && imageFile.files[0] && window.annotation.isImage($(imageFile).val())){
		//check size
		if(imageFile.files[0].size>(1024 * 1024)){
			//error size
			showError($("#user-dialog #error-insertion"),"","The image file exceeds the limit of 1MB.");
		}
		else{
			var reader  = new FileReader();
			reader.onload = function(e){
				$("#dialog-user-img").attr('src',e.target.result);
				$("#dialog-user-img").removeClass("nopicture");
			}
			reader.readAsDataURL(imageFile.files[0]);
			$("#change-img-clipping span").text("CHANGE PICTURE");
		}
	}
  }
  
  function renderAttachment(root,comment,callback){
	var $image = $(root).find('img.attachment');
	if($image.length){
		$image.each(function(index){
		getAttachmentFilePath(comment.code,comment.fileName,this,function(currentImage,source){
					$(currentImage).attr('src',source);
				});
		});
	}
  }
  
  function addCalloutEventListener($calloutWrap){
	addCalloutEventListenerLocal($calloutWrap);
	if(isRemote)
		addCalloutEventListenerRemote($calloutWrap);
  }
  
  
  /* START COMMENT FUNCTIONS */  
  function updateComments(comments, refresh) {
	if(!refresh){
		$(".comments-dialog-layer").remove();
		jimComments.itemsArray = [];
		jimComments.itemsCommentCount=[];
	}
	else{
		if(comments.length){
			//rebuild markers
			createCommentIcons();
		}
	}
    var c, len, comment, $root, root, fragment, $context;
    if (comments && comments.length>0) {
      fragment = document.createDocumentFragment();
      for(c=0, len=comments.length; c<len; c+=1) {
        comment = comments[c];
		if(comment.canvasID == "") {
		  continue;
		}
        if (comment.parentCode) {
          $root = jQuery(fragment.childNodes).find("input#code[value='" + comment.parentCode + "']").parents(".root");
          if($root.length === 0) {
            $root = $jimBody.find(".groupComments input#code[value='" + comment.parentCode + "']").parents(".root");
          }
		  var genCom = lookUpTemplate(commentTemplate)(comment);
          $root.children(".replies").append(genCom);
          updateIsRead($root, comment.isRead);
          updateNumReplies($root);
          $root.find("textarea.annotation").autoGrow();
		  
          renderAttachment($root.find("input#code[value='" + comment.code + "']").parent()[0],comment);
		  
        } else {

		  /*expecting the order is correct for timestamp*/
		  root = document.createElement("div");
          root.innerHTML = lookUpTemplate(rootTemplate)(comment);
          root = root.firstChild;
		  
		  renderAttachment(root,comment);
         
		  //new code
		  var elementID = comment.canvasID + "/" + ((comment.elementID.indexOf("m-") == 0 && comment.canvasID != comment.elementID) ? 
		  												"m-" + comment.canvasID.substring(2,10) + "-" + comment.elementID.substring(2) :
		  												comment.elementID );
		  
		  if($.inArray(elementID,jimComments.itemsArray) == -1){
			jimComments.itemsArray.push(elementID);
			jimComments.itemsCommentCount.push(1);
			//create wrap
			var calloutWrap = document.createElement("div");
			$(calloutWrap).addClass("comments-dialog-layer");
			$(calloutWrap).addClass("callout-wrap");
			
			addCalloutEventListener($(calloutWrap));
			
			//create new div group '.groupComments'
			var groupDiv = document.createElement("div");
			$(groupDiv).addClass("groupComments");
			$(groupDiv).addClass("callout-right");
			//callout notch
			var notch = document.createElement("b");
			$(notch).addClass('notch');
			$(groupDiv).append(notch);
			//end callout notch
			var groupIDInput = document.createElement("input");
			groupIDInput.id = "elementID";
			groupIDInput.setAttribute('type', 'text');
			groupIDInput.setAttribute('value', elementID);
			$(groupIDInput).addClass('hidden');
			$(groupDiv).append(groupIDInput);
			$(groupDiv).append(root);
			$(calloutWrap).append(groupDiv);
			fragment.insertBefore(calloutWrap, fragment.firstChild);
			
			$("#sidepanel #navigationtree li input").each(function(index, elem){
				if($(elem).val() === comment.canvasID && $(elem).val()!== ""){
					$(elem).siblings(".menu_dotred").css("display","inline-block");
				}
			});
			
		  }
		  else{
			var index = $.inArray(elementID,jimComments.itemsArray);
			jimComments.itemsCommentCount[index]++;
			//join comment div after first div
			  $root = jQuery(fragment.childNodes).find("input#elementID[value='" + comment.canvasID + '/' + comment.elementID + "']").parents(".groupComments");
			  if($root.length === 0) {
				var $group = $jimBody.find("input#elementID[value='" + comment.canvasID + '/' + comment.elementID + "']").parents(".groupComments");
				$group.append(root);
			  }
			  else{
			  $root.append(root);
			  }
		  }

        }
      }
      if(fragment.childNodes.length) {
  		if(window.jimMobile)
  			$jimBody.append(fragment);
  	    else
  			$simulation.append(fragment);
        }
      /*if(refresh === false) {
        $grid.find("textarea.annotation").autoGrow();
      }*/
	  if(refresh && isActive()){
		if(comments.length){
			//rebuild markers
			createCommentIcons();
		}
	  }
	  updateCommentCounter(0);
    }
  }
  
  function createMarker(canvasID,elementID,num){
	var balloon = document.createElement("div");
	   var elementFullIDElem = document.createElement("input");
		$(elementFullIDElem).val(canvasID+'/'+elementID);
		$(elementFullIDElem).attr("id","fullElementID");
		$(balloon).append(elementFullIDElem);
	
		var canvasIDElem = document.createElement("input");
		$(canvasIDElem).val(canvasID);
		$(canvasIDElem).attr("id","canvasID");
		$(balloon).append(canvasIDElem);
		
		var elementIDElem = document.createElement("input");
		$(elementIDElem).val(elementID);
		$(elementIDElem).attr("id","elementID");
		$(balloon).append(elementIDElem);
		
		var spanElem = document.createElement("span");
		$(spanElem).text(num);
		$(balloon).append(spanElem);
		
		$(balloon).addClass("comment-balloon");
		$(balloon).addClass("comments-layer");
		if(num<10)
			$(balloon).addClass("bullet_one");
		else if(num<100)
			$(balloon).addClass("bullet_two");
		else
			$(balloon).addClass("bullet_three");
			
	    addBalloonListener($(balloon));		
	return balloon;
  }
  
  function addBalloonListener($balloon){
	$balloon.click(function(event){
		if($(this).hasClass("open")) {
			$(this).removeClass("open");
			return false;
		}
		else {
			$(".comments-dialog-layer").hide();
			deselectCurrentComponent();
			/*create dialog and fill with comments div*/
			/*find comments group div*/
			var elementID = $balloon.find("input#elementID").val();
			var canvasID = $balloon.find("input#canvasID").val();
			var fullElementID = canvasID+'/'+elementID;
			var $calloutWrap = $(".groupComments input#elementID[value='"+fullElementID+"']").parents(".callout-wrap");
			
			if($calloutWrap.length>0){
				showCommentBalloon($calloutWrap, elementID, event);
				$(this).addClass("open");
			}
			return false;
		}
	
	});
  }
  
  function showCommentBalloon($calloutWrap, elementID, event) {
    var topHeight =0;
	if(window.jimMobile && $('#toppanel').length>0 && $('#toppanel').is(":visible")){
	  topHeight += parseInt($('#toppanel').css('height'));
	}
	if($('#topInfo').length>0){
	  topHeight += parseInt($('#topInfo').css('height'));
	}
		
	var $parent = $("#simulation");
	if(window.jimMobile)
	  $parent = $("#jim-body");
			
	var topPos = event.pageY - 32 - topHeight + $parent.scrollTop();
	if(topPos<0) {
	  $calloutWrap.find(".notch").css('top',20-(0-topPos));
	  topPos=0;
	}
	else {
	  $calloutWrap.find(".notch").css('top','');
	}
		
	$calloutWrap.css('top',topPos);
	var docWidth = $(document).width();
	if($('#sidepanel').hasClass('open')){
	  docWidth-=$('#sidepanel').width();
	}
		
	var leftPos = event.pageX - parseInt($calloutWrap.css('width')) - 35 + $parent.scrollLeft();
		
	if((event.pageX < docWidth/2 && leftPos >= 0) || leftPos>=docWidth){
	  $calloutWrap.find(".groupComments").removeClass("callout-left");
	  $calloutWrap.find(".groupComments").addClass("callout-right");
	  $calloutWrap.css('left',leftPos);
	}
	else{
	  $calloutWrap.find(".groupComments").removeClass("callout-right");
	  $calloutWrap.find(".groupComments").addClass("callout-left");
	  $calloutWrap.css('left',event.pageX + $parent.scrollLeft() + 35);
	}
	$calloutWrap.show();
		
	var element = $("#"+elementID);
	if(element.is(".shape"))
	  element = element.closest(".shapewrapper");
	element.addClass(currentComponentClass);
  }
  
  function filterCommentIcons(){
  	$(".comments-dialog-layer").hide();
	return createCommentIcons();
  }
  
  function updateIsRead($comment, isRead) {
    if (isRead) {
      $comment.closest(".root").removeClass("unread");
    } else {
      $comment.closest(".root").addClass("unread");
    }
  }
  
  function updateNumReplies($comment) {
    var $root = $comment.closest(".root"), numReplies = $root.find(".replies").children(".comment").length;
    $root.find(".total").html((numReplies > 0) ? numReplies : "");
	if(numReplies>0){
		$comment.closest(".root").addClass("hasReplies");
	}
	else{
		$comment.closest(".root").removeClass("hasReplies");
	}
  }
  
  function showComment($comment) {
    var $rootComment, elementID, canvasID, canvasURL;
    $rootComment = $comment.closest(".root");
    elementID = $rootComment.find("input#elementID").val();
    canvasID = $rootComment.find("input#canvasID").val();
    canvasURL = $rootComment.find("input#canvasURL").val();
    
    if (elementID && canvasID && canvasURL) {
      selectCurrentComponent(elementID, canvasID, canvasURL, $rootComment);
    }
  }
  
  function markReadCommentLocal($rootComment) {
    $rootComment.removeClass("unread");
  }
  
  function getAttachmentFileLocal(filename) {
    if (filename) {
      window.open("comments/attachments/" + filename);
    }
  }
  
  function removeComments() {
    $comments.remove();
	$(".comments-dialog-layer").remove();
	$(".comments-layer").remove();
    jimLayout.setSidePanelLayout();
  }
  
  function showCommentsAtStart(commentId) {
    var $comment = $jimBody.find(".groupComments input#code[value='" + commentId + "']");
    var $calloutWrap = $comment.parents(".callout-wrap");
    if($calloutWrap.length>0) {
		commentsMode(true, false);
		$commentsBtnImg.removeClass(commentOffClass);
		$commentsBtnImg.addClass(commentOnClass);
			
		$(".comments-dialog-layer").hide();
		deselectCurrentComponent();
		
		fullElementID = $calloutWrap.find("input#elementID").val();
		var endIndex = fullElementID.indexOf("/");
		canvasID=fullElementID.substr(0,endIndex);
		var elementID=fullElementID.substr(endIndex+1,fullElementID.length);
		var elem = jQuery("#"+elementID);
		if(elem.length<=0)/*inside data grid*/
		  elem = jQuery("#r0_"+elementID);	

		var event = jQuery.Event("click");
		var balloon = elem.prev('.comment-balloon');
		if(typeof balloon === 'undefined'){
		  /* failsafe in case balloon cannot be found */
		  event.pageX = elem.jimPosition().left-10;
		  event.pageY = elem.jimPosition().top-7 + parseInt($body.find("#topInfo").css('height'));
	    } else {
	      event.pageX = balloon.offset().left+17;
	      event.pageY = balloon.offset().top+17;
	    }
		
		$simulation.animate({ scrollTop: $(elem).offset().top - ( $(window).height() - $(elem).outerHeight(true) ) / 2, scrollLeft: $(elem).offset().left - ( $(window).width() - $(elem).outerWidth(true) ) / 2  }, 500);
	    showCommentBalloon($calloutWrap, elementID, event);
	    
	    $('input#code[value="' + commentId +'"] ~ .comment-content').css('border-left','5px solid #21c0c0');
	    
	    if($comment.prev('.comment').length==0 && $comment.parent().prev().hasClass('notch')){
	    	$calloutWrap.find('.callout-left .notch').css('border-right','10px solid #21c0c0');
	    	$calloutWrap.find('.callout-right .notch').css('border-left','10px solid #21c0c0');
	    }
	    
		if(jimUtil.isOnScreen($comment.closest(".root"), 1, 1)) {
			if($comment.closest(".replies").length>0) {
				toggleComment($comment.closest(".root"));
			}
		}
		else {
			var scrollY = 0;
			if($comment.closest(".replies").length>0) {
			  if($comment.closest(".comment").prevAll().length>0) {
				$.each($comment.closest(".comment").prevAll("div"), function() {
					scrollY += $(this).height();
				});
			  }
			}
			if($comment.closest(".root").prevAll("div").length>0) {
			  $.each($comment.closest(".root").prevAll("div"), function() {
				scrollY += $(this).height();
			  });
			}
			if($comment.closest(".replies").length>0) {
			  toggleComment($comment.closest(".root"));
			}
			
			$simulation.animate({ scrollTop: $(elem).offset().top - ( $(window).height() - $(elem).outerHeight(true) ) / 2 + scrollY }, 500);
		}
	}
  }
  /* END COMMENT FUNCTIONS */
  
  /* START ANNOTATION FUNCTIONS */
  function isActive() {
	return jimComments.commentsMode;
  }
  
  function hasPicture() {
	return !$("#sidepanel #user-image").hasClass("nopicture");
  }
  
  function	endsWith(str, suffix) {
	  return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  
  function lookUpTemplate(template) {
    if(!templates.hasOwnProperty(template)) {
      templates[template] = doT.template(document.getElementById(template).text, undefined, undefined);
    }
    return templates[template];
  }
  
  function getCanvasID($element) {
	var id = $element.attr("id");
	if($element.closest(".datalist, .datagrid").length){
		var $parentsAndSelf = $element.parents(".datarow:first,.gridcell:first").andSelf(".datarow,.gridcell");
		var instanceIndex = $parentsAndSelf.parent().children(".datarow, .gridcell").index($parentsAndSelf);
		id = id.substr(("r"+instanceIndex+"_").length);
	}
	return getCanvasIDFromString(id);
  }
  
    function getCanvasIDFromString(idElement) {
    var canvasID;
    switch(idElement.substring(0,2)) {
      case "s-":
        canvasID = jQuery(".screen:first").attr("id");
        break;
      case "t-":
        canvasID = jQuery(".template:first").attr("id");
        break;
      case "m-":
        canvasID = $("#"+idElement).closest(".master").attr("id");
        break;
    }
    return canvasID;
  }
  
  function focusBalloon(canvasID,elementID){
	var fullElementID = canvasID + "/" + elementID;
    jQuery(".comment-balloon").find("input#fullElementID").each(function(index){
	  if($(this).val() == fullElementID){
		$balloon = $(this).closest(".comment-balloon");
		settings = {"effect":{"duration": 1000,"easing": "linear","queue": false}};
		jimUtil.jimPointTo($balloon,settings);
		jimUtil.jimFocusOn($balloon);
		return;
      }
	});
  }
  
  function selectCurrentComponent(component, canvasID, canvasURL, $row) {
    var $component,settings;
    if (jimUtil.exists(component) && component.length) {
      if(jimUtil.exists(canvasID) && jimUtil.exists(canvasURL) && !jimUtil.hasCanvas(canvasID)) {
        jimMain.navigate(canvasURL).done(function() {
          selectCurrentComponent(component, canvasID, canvasURL, $row);
        });
      } else {
        /* highlight component */
        $simulation.find("." + currentComponentClass).removeClass(currentComponentClass).jimUndoVisibility();
        $component = (canvasID === component) ? jQuery(".template, .screen").closest("." + canvasID) : jQuery("." + canvasID).find("#" + component+",."+component);
        showCommentableFeedback($component.jimForceVisibility()[0]);
        settings = {"effect":{"duration": 1000,"easing": "linear","queue": false}};
        jimUtil.jimPointTo($component,settings);
        jimUtil.jimFocusOn($component);
      }
    }
  }
  
  function deselectCurrentComponent() {
    $(".comments-dialog-layer").hide();
    $simulation.find("." + currentComponentClass).removeClass(currentComponentClass);
  }
  
  function toggleComment($root) {
    if ($root.hasClass(closedClass)) {
	//open
	  $root.find(".expand-btn-text").text("Collapse");
	  $root.find(".expand-btn-img").removeClass("expand").addClass("collapse");
      //$jimBody.find(".groupComments .root").addClass(closedClass);
      $root.removeClass(closedClass);
      if ($root.hasClass("unread")) {
        markReadComment($root);
      }
	  if(jimUtil.isOnScreen($($root.find(".replies .comment")[0]), 1, 1)) {}
	  else {
		  var scrollY = $simulation.scrollTop();
		  if($root.find(".comment").length>0) {
			var limit = 0;
			$.each($root.find(".comment"), function() {
				scrollY += $(this).height();
				limit++;
				if(limit === 5)
					return;
			});
		  }
		  $simulation.animate({scrollTop: scrollY }, 500);
	  }
      /*var elementID, canvasID, canvasURL;
      elementID = $root.find("input#elementID").val();
      canvasID = $root.find("input#canvasID").val();
      canvasURL = $root.find("input#canvasURL").val();
      if (elementID && canvasID && canvasURL) {
        selectCurrentComponent(elementID, canvasID, canvasURL, $root);
      }*/
    } else {
	//close
	  $root.find(".expand-btn-text").text("Expand");
	  $root.find(".expand-btn-img").removeClass("collapse").addClass("expand");
      $root.addClass(closedClass);
    }
    /*}*/
  }
  
  function activateLocal() {
  }
  
  function deactivateLocal() {
    deselectCurrentComponent();
  }
  
  function setSimulationElements() {
    $simulation = jQuery($simulation.selector);
    $commentpanel = jQuery($commentpanel.selector);
  }
  
  function commentsMode(active) {
	  commentsMode(active, true);
  }
  
  function switchWhiteIMG(obj, fadeIn) {
	obj.fadeOut(250, function() {
  	  obj.toggleClass("whiteIMG");
  	  obj.fadeIn(250);
	});
  }
  
  function switchWhiteIMGs() {
	switchWhiteIMG($("#closefilterImage"));	
    switchWhiteIMG($('#toggle-panel-btn span.menu_off'));
    switchWhiteIMG($('#infoContent #logo div'));
  }
  
  function commentsMode(active, tutorial) {
  if(active){
	jimComments.commentsMode = true;
	
	if(window.jimMobile){
		jimMobile.disableTools();
		jQuery("#jim-container").addClass("touch");
	    jimMobile.tool = "touch"; 
	}
	
	if(tutorial && getTutorialCookie()!=='false')
	  $tutorial.show();
	
	switchWhiteIMGs();
	
	$(document.body).toggleClass("commentsMode");
	setTimeout(function() {$("#topSeparationLine").css("background-color", "#10d1d1");}, 450);
	$('#gestureTool').prop('disabled', 'disabled');
    $(".scenarioShadow").trigger('click');
	
	deselectCurrentComponent();
    $simulation.addClass(addCommentClass);
	$('#toppanel').addClass(addCommentClass);
	
	createCommentIcons();
  }
  else {
	jimComments.commentsMode = false;
	
	if(tutorial)
	  $tutorial.hide();
  
	$("#topSeparationLine").css("background-color", "");
	$jimBody.css('bottom','0px');
	
	switchWhiteIMGs();
	
	$(document.body).toggleClass("commentsMode");
	$('#gestureTool').prop('disabled', false);
	
	$simulation.removeClass(addCommentClass);
	$('#toppanel').removeClass(addCommentClass);
	deselectCurrentComponent();
	
	$(".comments-dialog-layer").hide();
	$(".comments-layer").remove();
  }
  }
  
  
  $("#commentsBackground").bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	if ($("#commentsBackground").hasClass('active')) {
	  $("#topSeparationLine").addClass("active");
	  $jimBody.css('bottom','8px');
	}
	
    jimUtil.refreshPageMinSize();
    jimLayout.endLayoutAnimation();
  });
  
  function findMarkedElement($element){
  /*marker position exceptions*/
	var $markedElem = $element;
	if($markedElem.is("path") || $markedElem.is("ellipse")){
		$markedElem = $markedElem.closest(".shapewrapper");
	}
	if($markedElem.hasClass("master") && $markedElem.closest(".masterinstance").length>0){
		$markedElem = $markedElem.closest(".masterinstance");
	}
	if($markedElem.hasClass("panel")){
		$markedElem = $markedElem.closest(".dynamicpanel");
	}
	if($markedElem.hasClass("cellcontainer") || $markedElem.hasClass("textcell")){
		$markedElem = $markedElem.closest(".table");
	}
	//offset
	if($markedElem.hasClass("menunode")){
		$markedElem = $markedElem.closest(".menu");
	}
	if($markedElem.hasClass("datacell")){
		$markedElem = $markedElem.closest(".datalist");
	}
	return $markedElem;
  }
  
  function createCommentIcons(){
  	$(".comments-layer").remove();
  	$(".comments-layer").css('display','block');
	var numIcons = 0;
	if(jimComments.commentsMode){
	  	/*must be called after building the whole DOM for simulation*/
		var fullElementID, canvasID;
		var $canvases = jimUtil.getCanvases();
		$(".groupComments").each(function(index){
			fullElementID = $(this).find("input#elementID").val();
			var endIndex = fullElementID.indexOf("/");
			canvasID=fullElementID.substr(0,endIndex);
			var elementID=fullElementID.substr(endIndex+1,fullElementID.length);
			var balloonElem = jQuery(".comment-balloon").find("input#fullElementID[value='" + fullElementID + "']").parents(".comment-balloon");
			var elem = jQuery("#simulation #"+elementID);
			if(elem.length<=0)/*inside data grid*/
				elem = jQuery("#r0_"+elementID);
			elem.each(function(index2, item){
				var e = $(item);
				if($canvases.contains(canvasID)){
					/*find element location*/
					
					balloonElem = createMarker(canvasID,elementID,jimComments.itemsArray.indexOf(fullElementID)+1);
					e = findMarkedElement(e);
					e.before(balloonElem);
					
					var top=0;
					var left=0;
					if(e.css('top')=="auto" || e.css('left')=="auto" || e.css('top')=="" || e.css('left')=="" || e.parent("td.layout").length>0){
						/*horizontal and vertical layouts*/
						top = parseInt(e[0].getBoundingClientRect().top - e.parent()[0].getBoundingClientRect().top) - parseInt($(balloonElem).css('height'))+10;
						left = parseInt(e[0].getBoundingClientRect().left - e.parent()[0].getBoundingClientRect().left) - parseInt($(balloonElem).css('width'))+10;
					}
					else{
						/*free layouts*/
						top = parseInt(e.css('top')) - parseInt($(balloonElem).css('height'))+10;
						left = parseInt(e.css('left')) - parseInt($(balloonElem).css('width'))+10;
					}
					if(top<0)top=0;
					if(left<0)left=0;
					
					$(balloonElem).css('top',top+'px');
					$(balloonElem).css('left',left+'px');
					
					$(balloonElem).show();
					numIcons++;
				}
				else{
					$(balloonElem).hide();
				}
			});
		});
	}
  }
  
  function addCalloutEventListenerLocal($object){
      $object.click(function(event) {
      var firer, $firer;
      $firer = jQuery(event.target || event.srcElement).closest(".firer");
      firer = $firer[0];
      if(firer === $navigationBtn[0]) {
        deactivate();
        return false;
      } else if ($firer.hasClass("show")) {
        showComment($firer.closest(".root"));
        return false;
      } else if ($firer.hasClass("attachment")) {
        /* show file dialog */
		/*return false;*/
      } else if ($firer.hasClass("expand-btn")) {
        toggleComment($firer.closest(".root"));
        return false;
       }
    });
  }
  
  function addEventListenerLocal($object) {	
	$body.mousedown(function(event) {
	  if($(event.target).closest('.comments-dialog-layer').length){}
	  else if($(event.target).closest('.comment-balloon').length) {
		deselectCurrentComponent();
	  }
	  else if($(event.target).is("#simulation")) {}
	  else {
	    $simulation.find(".comment-balloon").removeClass("open");
        deselectCurrentComponent();
	  }
    });
    
    $commentsBtnImg.click(function(event){
    	jimLayout.startLayoutAnimation();
    	if($commentsBtnImg.hasClass(commentOnClass)){
		  commentsMode(false);
		  $commentsBtnImg.addClass(commentOffClass);
		  $commentsBtnImg.removeClass(commentOnClass);
    	}
    	else {
    	  //Fast fix (could be better)
		  commentsMode(true);
		  $commentsBtnImg.removeClass(commentOffClass);
		  $commentsBtnImg.addClass(commentOnClass);
    	}
    	
	    return false;
    });
	
	$tutorial.click(function(event){
		$tutorial.fadeOut("500");
		createTutorialCookie();
	});
  }
  
  function createTutorialCookie() {
	var name = "jim_comments_tutorial";
	var value = "false";
	
	var days =1;
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
	
    /*document.cookie = name + "=" + value + "; path=/";*/
  }
  
  function getTutorialCookie(){
	var name ="jim_comments_tutorial";
	if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(name + "=");
        if (start != -1) {
            start = start + name.length + 1;
            var end = document.cookie.indexOf(";", start);
            if (end == -1) {
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(start, end));
        }
    }
    return "";
  }
  /* END ANNOTATION FUNCTIONS */
  /*********************** END LOCAL METHOD DEFINITION **************************/
  
  /*********************** START REMOTE METHOD DEFINITION ***********************/
  /* START DATA FUNCTIONS */
  function loadDataRemote(refresh) {
	if(jimUtil.isChromeLocal()){
		loadDataLocal();
		return;
	}
    if(reloadCounter > 0 && !$sidepanel.hasClass("hidden")) {
      jQuery.ajax({
        "url": "listComments.action",
        "data": {"refresh": refresh},
        "dataType": "json"
      })
      .done(function(json, textStatus, jqXHR) {
        if(!isRemote) {
          isRemote = true;
          $body.removeClass("offline");
		  if(!refresh)
			addEventListenerRemote();
        }
        reloadCounter -= 1;
        if (json && json.result) {
          switch(json.result) {
            case "success":
              currentData.author = json.data.author;
			  currentData.authorID = json.data.authorID;
			  currentData.authorEmail = json.data.authorEmail;
			  currentData.hasPicture = json.data.hasPicture;
			  currentData.timestamp = json.data.timestamp;
              updateComments(json.data.comments, refresh);
			  updateCurrentUser(currentData.author,currentData.authorEmail,currentData.authorID, currentData.hasPicture);
              break;
            case "error":
              showError($("#user-info"), "", "New comment data could not be retrieved.");
              break;
            case "not-allowed":
              showError($("#user-info"), "", "You are not authorized to retrieve comment data.");
              break;
          }
        }
        setTimeout(function() {loadDataRemote(true);}, reloadDelay);
      })
      .fail(function(xhr, status, error) {
        loadDataLocal();
      });
    }
  }
  /* END DATA FUNCTIONS */
  
  /* START DIALOG FUNCTIONS */
  function lockUI() {
    $blockui.removeClass(hiddenClass);
  }
  
  function unlockUI() {
    $blockui.addClass(hiddenClass);
  }
  
  function showDialog($element) {
	//hide other dialogs
	$(".comments-dialog-layer").hide();
    if ($element && $element.length) {
      showCommentableFeedback($element[0]);
      currentData.$element = $element;
      currentData.elementID = $element.attr("id");
      currentData.canvasID = getCanvasID($element);
      $dialog.removeClass(hiddenClass);
      $dialog.find("textarea").focus();
      lockUI();
    }
  }
  
  function closeDialog() {
    unlockUI();
    $dialog.addClass(hiddenClass);
    resetForm($dialog);
    if(jimUtil.exists(currentData.$element)) {
      removeCommentableFeedback(currentData.$element[0]);  
    }
  }
  
  function saveDialog() {
    var text, $element, position, newComment;
    text = $dialog.find("textarea").val();
    if (text && text !== message) {
      $element = currentData.$element;
      position = $element.jimPosition();
      switch($element.jimGetType()) {
        case itemType.screen:
        case itemType.template:
          break;
        default:
          position.top -= 23;
          position.right -= 10;
          break;
      }
      newComment = {
        "author": currentData.author,
        "content": text,
        "canvasID": getCanvasID($element),
        "elementID": currentData.elementID,
        "canvasURL": getCanvasURL($element)
      };
      
      if (newComment.elementID.search(/m\-[a-f0-9]{8}\-/) == 0) 
    	newComment.elementID = "m-" + newComment.elementID.substring(11);
      if ($element.hasClass("masterinstance")) {
    	newComment.elementID = $element.children().children().attr("id");
    	newComment.canvasID = newComment.elementID;
    	newComment.canvasURL = "masters/" + newComment.elementID.substring(2);
      }
      
      saveAction(newComment, $dialog.find("form.attachment"));
    } else {
      showError($dialog.find("textarea").closest(".replier"), "", "The comment is empty.");
    }
  }
  
  function addInputFileListeners(){
  	jQuery("#user-dialog .input-file")
			.change(function(){
				$(this).closest("#user-img-wrapper").data("changed",true);
				updateDialogImage(this);
			});
  }
  
  function saveUserDialog(){
    var userSettings = {
        "imageChanged": $("#user-dialog #user-img-wrapper").data("changed")
    };
	var currentData;
	$("form.user-profile").ajaxSubmit({
      "type": "POST",
      "url": "saveUserProfile.action",
	  "data" : userSettings,
      "dataType": "json",
      "iframe":"true",
      "beforeSubmit": function() {
        lockUI();
      },
      "success": function(json, status, xhr) {
	  	closeUserDialog();
        if (json && json.result) {
          switch(json.result) {
            case "success":
              currentData = json.data;
			  updateCurrentUser(currentData.completeName,currentData.email,currentData.id,currentData.hasPicture);
              break;
            case "error":
              showError($("#user-dialog #error-insertion"),"","Server internal error");
              break;
            case "not-allowed":
			  showError($("#user-dialog #error-insertion"),"","You are not authorized to do this operation");
              break;
          }
        }
	  },
      "error": function(xhr, status, error) {
		showError($("#user-dialog #error-insertion"),"","Server internal error");
      }
	  });
  }
  
  function updateCommentUserImages(authorID, newSrc, hasPicture){
	$(".groupComments div.comment input[id='userID'][value='"+authorID+"']").each(function(index){
		$(this).closest(".comment").find("div.user-comment-img").css('background-image',(hasPicture) ? "url('"+newSrc+"')" : "").addClass((hasPicture) ? "userImage" : "").removeClass((!hasPicture) ? "userImage" : "");
	});
	
	var repliers = $(".replier").find("div.user-comment-img");
    if (hasPicture) {
      $("span.user-comment-img-add").hide();
      repliers.addClass("userImage");
      repliers.css('background-image',"url('"+newSrc+"')");
    }
    else {
      $("span.user-comment-img-add").show();
      repliers.removeClass("userImage");
      repliers.css('background-image',"");
    } 		
  }
  
  function closeUserDialog(){
	$userDialog.find(".message").remove();
	$("#blockui").addClass(hiddenClass);
    $userDialog.addClass(hiddenClass);
  }
  
  function openUserDialog(){
  	$("#blockui").removeClass(hiddenClass);
	$userDialog.find("#dialog-user-name").val($("#sidepanel #user-name").text());
	$("#sidepanel #user-image").hasClass("nopicture") ? $userDialog.find("#dialog-user-img").addClass("nopicture") : $userDialog.find("#dialog-user-img").removeClass("nopicture");
	$("#sidepanel #user-image").hasClass("nopicture") ? $userDialog.find("#change-img-clipping span").text("UPLOAD PICTURE") : $userDialog.find("#change-img-clipping span").text("CHANGE PICTURE");
	$("#sidepanel #user-image").hasClass("nopicture") ? $userDialog.find("#dialog-user-img").attr("src","./resources/_jim/images/sidepanel/nopicture_icon.png") : $userDialog.find("#dialog-user-img").attr("src",$("#sidepanel #user-image").css("background-image").replace(/(url\("|"\))/g,""));
	$userDialog.find("#dialog-user-id").val($("#sidepanel #user-id").val());
    $userDialog.removeClass(hiddenClass);
  }
  
  /* END DIALOG FUNCTIONS */
    
  /* START COMMENT FUNCTIONS */
  function updateAttachmentFile(file) {
    var $file, value;
    if(jimUtil.exists(file)) {
      $file = jQuery(file);
      value = $file.val();
      if(value.length > 0) {
        $file.siblings(".filename").html((jQuery.browser.msie) ? value.substring(value.lastIndexOf("\\") + 1, value.length) : value);
		$file.parent('form.attachment').addClass(attachmentSetCalss);
      }
    }
  }
  
  function getCommentableFeedbackTarget(source) {
    var target = source;
    if(target.shapewrapper){
        target = target.shapewrapper;
    }
    return target;
  }
  
  function showCommentableFeedback(source){
      var target = getCommentableFeedbackTarget(source);
      jQuery(target).addClass(currentComponentClass);
  }
  
  function removeCommentableFeedback(source){
      var target = getCommentableFeedbackTarget(source);
      jQuery(target).removeClass(currentComponentClass);
  }
  
  function replyComment($root) {
	//cancel all comment active editors
	cancelComment($(".editor, .replier"));
    var $textarea = $root.removeClass(closedClass).children(".replier").hide().slideDown(250).find("textarea");
	$root.addClass(replyingClass);
    /* TODO: scroll required? $grid.animate({"scrollTop": $textarea.position().top + 20}, 0, function() { $textarea.trigger("focusin").focus(); }); */
    $textarea.trigger("focusin").focus();
  }
  
  function editComment($comment) {
    $comment.find(".editormode textarea").val($comment.find(".viewmode .text").text()).autoGrow().focus().end().addClass("editor");
	/*$comment.find(".editormode form.attachment .filename").text($comment.find(".viewmode span.attachment.filename").text());*/
	$comment.addClass(editingClass);
  }
  
  function deleteComment($comment) {
    var message = ($comment.children("#code").val() === $comment.parents(".root").children("#parentCode").val() && $comment.parents(".root").find(".replies").children().length>0) ? "Delete comment and replies?" : "Delete comment?";
    showFeedback($comment.find(".comment-content"), message, jimUtil.createCallback(deleteAction, {"args": [$comment], "scope": this}));
  }
  
  function cancelComment($editor) {
    var $root = $editor.parents(".root");
    /*resetForm($editor);*/
    $editor.removeClass("editor");
    if($editor.hasClass("replier")) {
      $editor.hide();
    }
	$editor.closest(".comment").removeClass(editingClass);
	if($root.length){
		$root.removeClass(replyingClass);
		$root.each(function(index){
				if($(this).find(".replies .comment").length === 0) {
					$(this).addClass(closedClass);
				}
			}
		);
	}
  }
  
  function saveComment($comment) {
    var text, $root, newComment;
    text = $comment.find("textarea:visible").val();
    if (text && text !== message) {
      $root = $comment.closest(".root");
      newComment = {
        "author": currentData.author,
        "content": text,
        "canvasID": $root.children("input#canvasID").val(),
        "elementID": $root.children("input#elementID").val(),
        "canvasURL": $root.children("input#canvasURL").val(),
        "parentCode": $root.children("input#parentCode").val(),
        "code": $comment.children("input#code").val()
      };
      
      //scenario
      var str = $root.children("input#canvasURL").val(); 
      if (str.indexOf("scenarios") == 0) {
    	var index = str.indexOf("/"); 
    	newComment["scenario"] = str.substring(index + 1);
      }
      
      saveAction(newComment, $comment.find("form.attachment"));
    } else {
      showError($comment.find("textarea:visible").closest(".replier"), "", "Your comment is empty.");
    }
  }
  
  function markReadCommentRemote($comment) {
    var code = $comment.find("input#parentCode").val();
    if (code) {
      jQuery.ajax({
        "type": "POST",
        "url": "markAsRead.action",
        "data": {"code": code},
        "dataType": "json"
      })
      .done(function(json, status, xhr) {
        if (json && json.result) {
          if (json.result === "success") {
            updateIsRead($comment, true);
            updateComments(json.data.comments,true);
          } else if (json.result === "error") {
            
          } else if (json.result === "not-allowed") {
            
          }
        } else {
          
        }
      })
      .fail(function(xhr, status, error) {
        /* TODO */
      });
    }
  }
  
  function getAttachmentFilePath(code,filename,image,callback){
    if(isRemote) {	
      getAttachmentFilePathRemote(code,image,callback);
    } else {
      getAttachmentFilePathLocal(filename,image,callback);
    }
  }
  
  function getAttachmentFilePathRemote(code,image,callback) {
    if (code) {
		var jqxhr = jQuery.ajax({
			cache : false,
			async: false,
			type: "POST",
			url: "getCommentFile.action?code=" + code +"&encoded=true",
			dataType: "text",
			contentType:"application/octet-stream"
		  })
		  .done(function(json) {
			callback(image,"data:application/octet-stream;base64," + json);
			return;
		  })
		  .fail(function(xhr, status, error) {
			callback(image,"");
			return;
		  });
    }
  }
  
  function getAttachmentFilePathLocal(filename,image,callback) {
    if (filename) {
		callback(image,"comments/attachments/" + filename);
    }
  }
  
  function getAttachmentFileRemote(code) {
    if (code) {
      window.open("getCommentFile.action?code=" + code);
    }
  }
  
  function saveAction(newComment, $form) {
    var fromDialog, $errorElement, isEdit, code, $comment, $root;
    fromDialog = ($form.parents("#dialog").length) ? true : false;
    $errorElement = (fromDialog) ? $dialog.find("#content") : $form.parents(".groupComments").find("textarea:visible").closest(".replier");
    
    $form.ajaxSubmit({
      "type": "POST",
      "url": "saveComment.action",
      "data": newComment,
      "dataType": "json",
      "iframe":"true",
      "beforeSubmit": function() {
        lockUI();
      },
      "success": function(json, status, xhr) {
        if (json && json.result) {
          if (json.result === "success") {
            updateComments(json.data.comments,true);
            
            isEdit = (newComment.code) ? true : false;
            code = (isEdit) ? newComment.code : json.data.code;
            
            if (fromDialog) {
              closeDialog();
			  focusBalloon(newComment.canvasID,newComment.elementID);
            } else {
              unlockUI();
              if (isEdit) {
                newComment.author = json.data.author;
				newComment.authorID = json.data.authorID;
                newComment.date = json.data.date;
				//keep creation timestamp
				$comment = $form.parents(".comment");
				newComment.timestamp = $comment.children("input#timestamp").val();
                newComment.fileName = $form.children("input[type='file']").val();
                $comment.replaceWith(lookUpTemplate(commentTemplate)(newComment));
              } else {
                cancelComment($form.closest(".editor, .replier"));
              }
            }
          } else if (json.result === "error") {
            if(!fromDialog) { unlockUI(); }
            showError($errorElement, "", "Communication with the server failed.");
          } else if (json.result === "not-allowed") {
            if(!fromDialog) { unlockUI(); }
            showError($errorElement, "", "Your are not authorized to add comments.");
          } else if (json.result === "error-filesize") {
            if(!fromDialog) { unlockUI(); }
            showError($errorElement, "", "The attached file exceeds the limit of 1MB.");
          }
        } else {
          if(!fromDialog) { unlockUI(); }
          showError($errorElement, "", "Communication with the server failed.");
        }
      },
      "error": function(xhr, status, error) {
        if(!fromDialog) { unlockUI(); }
        showError($errorElement, "", "Communication with the server failed.");
      }
    });
  }
  
  function updateCurrentCanvasCommentsMarker(){
  var hide=true;
  $(".comment-balloon").each(function(index, elem){
		if($(elem).children("input[id='canvasID']").val() == jimUtil.getCurrentScreen()){
			hide=false;
			$("#sidepanel #navigationtree li input[value='" + jimUtil.getCurrentScreen() + "']").siblings(".menu_dotred").css("display","inline-block");
			return false;
		}
	});
	
	if(hide)
		$("#sidepanel #navigationtree li input[value='" + jimUtil.getCurrentScreen() + "']").siblings(".menu_dotred").css("display","none");
  }
  
  //bubble sort inspired
  function reorderCommentsArray(elementID){
	var index = $.inArray(elementID,jimComments.itemsArray);
	var currentElementID,currentTimestamp,group, tempSwap, reordered=false;
	var elementTimestamp = $(".groupComments").children("input#elementID[value='"+elementID+"']").closest(".groupComments").find(".root").first().find(".comment").first().find("input#timestamp").first().val();
	if(index>-1){
		for (var i = index+1; i < jimComments.itemsArray.length; i++) {
			currentElementID = jimComments.itemsArray[i];
			//get first comment timestamp
			group = $(".groupComments").find("input#elementID[value='"+currentElementID+"']").closest(".groupComments");
			if(group.length){
				//check timestamp
				currentTimestamp = group.find(".root").first().find(".comment").first().find("input#timestamp").first().val();
				if(currentTimestamp < elementTimestamp){
					//swap elements
					tempSwap = jimComments.itemsArray[i];
					jimComments.itemsArray[i] = jimComments.itemsArray[index];
					jimComments.itemsArray[index] = tempSwap;
					//swap count array
					tempSwap = jimComments.itemsCommentCount[i];
					jimComments.itemsCommentCount[i] = jimComments.itemsCommentCount[index];
					jimComments.itemsCommentCount[index] = tempSwap;
					reordered=true;
				}
			}
		}
	}
	return reordered;
  }
  
  function deleteAction($comment) {
    var code, $root;
    code = $comment.children("input#code").val();
    if (code) {
      jQuery.ajax({
        "type": "POST",
        "url": "deleteComment.action",
        "data": {"code": code},
        "dataType": "json"
      })
      .done(function(json, status, xhr) {
        if (json && json.result) {
          if (json.result === "success") {
            updateComments(json.data.comments,true);
            $root = $comment.parents(".root");
            if(code === $root.children("#parentCode").val()) {
			  var $group = $root.closest(".groupComments");
			  if($group.children(".root").length ==1){
			  		  var elementID = $group.find("input#elementID").val();
					  var index = $.inArray(elementID,jimComments.itemsArray);
					  if(index > -1){
						jimComments.itemsArray.splice(index,1);
						jimComments.itemsCommentCount.splice(index,1);
					  }
				$root.closest(".comments-dialog-layer").remove();
				//update numbers
				var numIcons = createCommentIcons();
			  }
			  else{
					  var elementID = $group.find("input#elementID").val();
					  var index = $.inArray(elementID,jimComments.itemsArray);
					  if(index > -1){
						jimComments.itemsCommentCount[index]--;
					  }
			  }
			  
			  //check if first comment of its group was deleted
			  if($group.find(".root").first()[0] === $root[0]){
				$root.remove();
				//reorder arrays
				if($group.children(".root").length > 0){
					var elementID = $group.find("input#elementID").val();
					var reordered = reorderCommentsArray(elementID);
					if(reordered)createCommentIcons();
				}
			  }
			  else{
				$root.remove();
			  }

			  //update current screen comments marker
			  updateCurrentCanvasCommentsMarker();
			  updateCommentCounter(0);
            } else {
              $comment.remove();
              updateNumReplies($root);
              if($root.find(".replies .comment").length === 0) {
                $root.addClass(closedClass);
              }
            }
          } else if (json.result === "error") {
            showError($comment.find(".comment-content"), "", "The comment was not deleted due to an error");
          } else if (json.result === "not-allowed") {
            showError($comment.find(".comment-content"), "", "You are not entitled to delete this comment");
          }
        } else {
          showError($comment.find(".comment-content"), "", "Connection to server failed.");
        }
      })
      .fail(function(xhr, status, error) {
        showError($comment.find(".comment-content"), "", "Connection to server failed.");
      });
    }
  }
  /* END COMMENT FUNCTIONS */
  
  /* START MESSAGE FUNCTIONS */
  function showFeedback($insertionPoint, title, okCallback, cancelCallback) {
	//remove other feebacks first
	$(".message").remove();
    var $firer, $message;
    jQuery(".message.feedback").remove();
    jQuery(lookUpTemplate(messageTemplate)({"type": "feedback", "text": title}))
      .insertAfter($insertionPoint)
      .show("slide", {"direction": "up"}, 250)
      .click(function(event) {
        event.stopPropagation();
        $firer = jQuery(event.target || event.srcElement);
        if($firer.hasClass("ok") && okCallback) {
          okCallback();
        } else if ($firer.hasClass("cancel") && cancelCallback) {
          cancelCallback();
        }
        $message = jQuery(this);
        $message.removeAttr("style").fadeOut("","",function(){$message.remove();});
      });
  }
  
  function showError($insertionPoint, title, text) {
  	//remove other feebacks first
	$(".message").remove();
    var $message;
    jQuery(".message.error").remove();
    jQuery(lookUpTemplate(messageTemplate)({"type": "error", "title": title, "text": text}))
    .insertAfter($insertionPoint)
    .show("slide", {"direction": "up"}, 250, function() { $dialog.css("height", "auto"); })
    .click(function(event) {
      event.stopPropagation();
      $message = jQuery(this);
      $message.removeAttr("style").fadeOut("","",function(){ $message.remove(); $dialog.css("height", "auto"); });
    });
  }
  /* END MESSAGE FUNCTIONS */
  
  /* START ANNOTATION FUNCTIONS */
  function getCanvasURL($element) {
    var canvasURL;
    var idSubs = $element.attr("id").substring(0,2);
    var rowPattern = new RegExp("^r[0-9]+_");
    if(rowPattern.test($element.attr("id"))){
    	var temp = $element.attr("id").replace(/^r[0-9]+_/,"");
    	idSubs = temp.substring(0,2);
    }
    switch(idSubs) {
      case "s-":
        canvasURL = "screens/" + jQuery(".screen:first").attr("id").substring(2);
        break;
      case "t-":
        canvasURL = "templates/" + jQuery(".template:first").attr("id").substring(2);
        break;
      case "m-":
        canvasURL = "masters/" + $element.closest(".master").attr("id").substring(2);
        break;
    }
    return canvasURL;
  }

  
  function resetForm($element) {
    var $editor, $textarea;
    $editor = ($element.closest("#dialog").length) ? $element.closest("#dialog") : $element.closest(".editor, .replier");
    $textarea = $editor.find("textarea.annotation:first"); 
    $textarea.val(message).attr("rows", $textarea[0].rowsDefault);
    $editor.find("input.file").val("");
    $editor.find(".message").remove();
	resetAttachmentForm($editor.find("form.attachment"));
  }
  
  function isExecutable() {
    var $textarea = $grid.find("textarea:visible");
    if($textarea.length) {
      /*
       * TODO: scroll required?
       *      $grid.animate({"scrollTop": $textarea.position().top + 20}, 0, function() {
       *        $textarea.trigger("focusin").focus().next().find(".save .action, .cancel .action").animate({"font-size": "11px"}, 200).animate({"font-size": "9px"}, 200);
       *      });
       */
      $textarea.trigger("focusin").focus().next().find(".save .action, .cancel .action").animate({"font-size": "11px"}, 200).animate({"font-size": "9px"}, 200);
      return false;
    } else {
      return true;
    }
  }
  
  function activateRemote() {
    activateLocal();
    $commentpanel.removeClass(hiddenClass);
    deselectCurrentComponent();
    $simulation.addClass(addCommentClass);
	$('#toppanel').addClass(addCommentClass);
  }
  
  function deactivateRemote() {
    deactivateLocal();
    $commentpanel.addClass(hiddenClass);
    $simulation.removeClass(addCommentClass);
	$('#toppanel').removeClass(addCommentClass);
  }
  
  function addEventListenerRemote(){
	  $dialog
		  .resizable({
			"handles": "se",
			"minHeight": 130,
			"minWidth": 185,
			"alsoResize": $dialog.find("textarea.annotation")
		  })
		  .draggable({
			"containment": "parent",
			"cursor": "move"
		  })
		  .bind("click", function(event) {
			switch((event.target || event.srcElement).id) {
			  case "dialog-close":
			  case "dialog-cancel":
				closeDialog();
				break;
			  case "dialog-save":
				saveDialog();
				break;
			}
		  })
		  .find("textarea.annotation").autoGrow();
		
		jQuery("html").keyup(function(event) {
		  if(event.keyCode === 27) {
			closeDialog();
			closeUserDialog();
			//close callouts
			$(".comments-dialog-layer").hide();
		  }
		});
		
		$dialog.find("form.attachment .delete_attach")
			.bind("click",function(event){
				//remove attachment from file input. replace input
				resetAttachmentForm($dialog.find("form.attachment"));
			});
		
    $dialog.find("textarea.annotation")
      .live("focusin", function(event) {
        var $textarea = jQuery(this);
        if($textarea.val() === message) {
          $textarea.val("");
        }
      })
      .live("focusout", function(event) {
        var $textarea = jQuery(this);
        if($textarea.val() === "") {
          resetForm($textarea);
        }
      });
		
	$simulation
      .on("mouseenter", ".add-comment .commentable", function(event) {
        showCommentableFeedback(this);
        return false;
      })
      .on("mouseleave", ".add-comment .commentable", function(event) {
        if(!$dialog.is(":visible")) {
          removeCommentableFeedback(this);
        }
        return false;
      })
      .on("click", ".add-comment .commentable", function(event) {
        showDialog(jQuery(this));
        return false;
      })
      .bind("canvasunload", function() {
        deactivate();
      });

	  //user dialog
	 $userDialog
		  .draggable({
			"containment": "parent",
			"cursor": "move"
		  })
		  .bind("click", function(event) {
			switch((event.target || event.srcElement).id) {
			  case "close-button":
				closeUserDialog();
				break;
			  case "dialog-save":
				saveUserDialog();
				break;
			}
		  });
	  
	$removeUserImage
		.bind("click", function(event){
			$("#user-dialog #user-img-wrapper").data("changed",true);
			removeDialogImage();
		});
	
	addInputFileListeners();
			
	jQuery("#user-config")
		.bind("click", function(event){
			$("#user-dialog #user-img-wrapper").data("changed",false);
			openUserDialog();
		});
		
	jQuery("#user-image")
		.bind("click", function(event){
			$("#user-dialog #user-img-wrapper").data("changed",false);
			openUserDialog();
		});

  }
  
  function resetAttachmentForm($form){
	$form.find("input.file").replaceWith("<input type='file' tabindex='-1' onchange='annotation.updateAttachmentFile(this);' value='' size='5' name='file' class='file'>");
	$form.find("span.filename").text("Attach file");
	$form.removeClass(attachmentSetCalss);
  }
  
  function addCalloutEventListenerRemote($object) {
    $object.click(function(event) {
      var $firer, firer, $root;
      $firer = jQuery(event.target || event.srcElement).closest(".firer");
      $root = $firer.closest(".root");
      firer = $firer[0];
      if ($firer.hasClass("save")) {
        saveComment($firer.closest(".editor, .replier"));
        return false;
      } else if ($firer.hasClass("cancel")) {
        cancelComment($firer.closest(".editor, .replier"));
        return false;
      } else if($firer.is("textarea")) {
        return false;
      } else if ($firer.is(".attachment")) {
        /* ignore */
		/*return false;*/
	  } else if($firer.is(".delete_attach")){
		resetAttachmentForm($firer.closest("form.attachment"));
      } else if(isExecutable($root)) { 
        if ($firer.hasClass("reply")) {
          replyComment($root);
          return false;
        } else if ($firer.hasClass("edit")) {
          editComment($firer.closest(".comment"));
          return false;
        } else if ($firer.hasClass("delete")) {
          deleteComment($firer.closest(".comment"));
          return false;
        } else if($firer.hasClass("user-comment-img") || $firer.hasClass("user-comment-img-add")){
		  openUserDialog();
		  return false;
		}
      }
    });
    
    $object.find("textarea.annotation")
      .live("focusin", function(event) {
        var $textarea = jQuery(this);
        if($textarea.val() === message) {
          $textarea.val("");
        }
      })
      .live("focusout", function(event) {
        var $textarea = jQuery(this);
        if($textarea.val() === "") {
          resetForm($textarea);
        }
      });
  }
  /* END ANNOTATION FUNCTIONS */
  /************************ END REMOTE METHOD DEFINITION ************************/
  
  /****************************** START ANNOTATION ******************************/
  function markReadComment($root) {
    if(isRemote) {
      markReadCommentRemote($root);
    } else {
      markReadCommentLocal($root);
    }
  }
  
  function getAttachmentFile(code, filename) {
    if(isRemote) {
      getAttachmentFileRemote(code);
    } else {
      getAttachmentFileLocal(filename);
    }
  }
  
  function activate() {
    if(isRemote) {
      activateRemote();
    } else {
      activateLocal();
    }
  }
  
  function deactivate() {
    if(isRemote) {
      deactivateRemote();
    } else {
      deactivateLocal();
    }
  }
  /******************************* END ANNOTATION *******************************/
  
  /* START EXPOSE ANNOTATION */
  window.annotation = {
    "isActive": isActive,
    "load": function() {
      if(isRemote) {
        reloadCounter = reloadCounterLimit;
      }
      setSimulationElements();
      deselectCurrentComponent();
      filterComments();
      if (isActive()) {
        $commentpanel.removeClass(hiddenClass);
		$simulation.addClass(addCommentClass);
      }
    },
    "unload": function() {
      if(isRemote) {
        closeDialog();
      }
    },
    "toHTML": function(value) {
      return jimUtil.toHTML(value);
    },
    "hasPermission": function(author) {
      return author && currentData.author && author === currentData.author;
    },
    "getCurrentAuthor": function() {
      return currentData.author || "";
    },
	"getCurrentAuthorID": function() {
      return currentData.authorID || "";
    },
	"hasPicture": hasPicture,
    "render": function(data, template) {
      return lookUpTemplate(template)(data);
    },
    "updateAttachmentFile": updateAttachmentFile,
    "getAttachmentFile": getAttachmentFile,
	"getAttachmentFilePath": getAttachmentFilePath,
	"isImage" : function(str){
		if(endsWith(str,".png") || endsWith(str,".jpg") || endsWith(str,".jpeg") || endsWith(str,".bmp") || endsWith(str,".gif"))
			return true;
		return false;
	}
  };
  /* END EXPOSE ANNOTATION */
  
  /* START MAIN */
//  addEventListenerLocal();
//  loadDataRemote(false);
  var jimComments = {
	"load" : function(){
		addEventListenerLocal();
		loadDataRemote(false);
	},
    "itemsArray" : [],
	"itemsCommentCount" : [],
	"updateComments" : function(){
		/*relocateMarkers();*/
	},
	"commentsMode" : false,
	"showComments": function(id) {
		showCommentsAtStart(id);
	},
	"openCommentByID" : ""
  }
  window.jimComments = jimComments;
  
  
  /* END MAIN */
  
})(window);
