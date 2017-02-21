/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function (window, undefined) {
  
  var $simulation = jQuery("#simulation"), templates = {};
  
  function lookUpTemplate(template) {
    if(!templates.hasOwnProperty(template)) {
      templates[template] = doT.template(document.getElementById(template + "-template").text, undefined, undefined);
    }
    return templates[template];
  };
  
  $simulation
  .bind("loadcomponent", function() {
    templates = {}; /* reset the template cache when a new page is loaded */
  })
  .on("update.dataview", ".datalist, .datagrid", function(event){
    event.stopPropagation();
    var $grid = jQuery(event.target || event.srcElement).closest(".datalist, .datagrid");
    var oddRows = $grid.children("tbody").children("*:not(.hidden):odd");
    var evenRows = $grid.children("tbody").children("*:not(.hidden):even");
    oddRows.removeClass("odd").addClass("even");
    evenRows.removeClass("even").addClass("odd");
    if($grid.is(".datagrid"))
    	$grid.dataview("hideRows");
    jQuery(".summary[dataview='"+$grid.attr("id")+"']").trigger("update.dataview", [$grid]);
    jQuery(".index[dataview='"+$grid.attr("id")+"']").trigger("update.dataview", [$grid]);
    $grid.find(".tree").jimTree();
    $grid.find(".menu > .menunode > .submenu").appendTo($grid.closest(".template, .screen"));
    
    jimShapes.renderAll(jQuery(".non-processed-shape"));
    jimUtil.calculateMasterMinSize($grid);
    $grid.find(".datachange").trigger("datachange");
  })
  .on("update.dataview", ".summary", function(event, $grid) {
    event.stopPropagation();
    var $summary, size, total, start, end;
    $summary = jQuery(this);
    size = parseInt($grid.attr("size"), 10);
    if($grid.is(".datalist")){
	    total = $grid.children("tbody").children().length;
	    start = $grid.children("tbody").children("*:not(.hidden):first").index() + 1;	
    }else{
    	var $gridCells =  $grid.children("tbody").children("tr").children("td").children(".gridcell");
    	total = $gridCells.length;
    	var indexFirstVisibleGridCell = $gridCells.index($gridCells.filter(":not(.hidden):first"));
	    start = indexFirstVisibleGridCell+ 1;
    }
    end = (size === 0) ? total : start + size - 1;
    if (end > total) {
      end = total;
    }
    $summary.find("#total").text(total).next("#start").text(start).next("#end").text(end);
  })
  .on("update.dataview", ".index", function(event, $grid) {
    event.stopPropagation();
    var $index , size, current, total, c,length;
    $index = jQuery(this);
    size = parseInt($grid.attr("size"), 10);
    if($grid.is(".datalist")){
    	current = Math.floor($grid.children("tbody").children("*:not(.hidden):first").index() / size) + 1;
    }else{
    	var $gridCells =  $grid.children("tbody").children("tr").children("td").children(".gridcell");
    	var indexFirstVisibleGridCell = $gridCells.index($gridCells.filter(":not(.hidden):first"));
    	current = Math.floor(indexFirstVisibleGridCell/ size) + 1;
    }
    
    if(isNaN(current)) {
      current = 1;
    }
    if($grid.is(".datalist")){
    	length = $grid.children("tbody").children().length;
    }else{
    	length = $grid.children("tbody").children("tr").children("td").children(".gridcell").length;
    }
    
    total = (size === 0) ? 1 : Math.ceil(length / size);
    $index.find(".valign").html("");
    for (c=1; c <= total; c += 1) {
    	$index.find(".valign").append((current === c) ? "<span class=\"current\">" + c + "</span>" : "<span>" + c + "</span>");
    }
  });
  
  var gridMethods = {
    "init": function() {
      return this.each(function(i, grid) {
        var $grid = jQuery(grid);
        if($grid.hasClass("datalist") || $grid.hasClass("datagrid")) {
          $grid.dataview("update", jimData.datamasters[$grid.attr("datamaster")], {"init": true});
        }
      });
    },
    "update": function(instances, options) {
      var $grid = jQuery(this);
      if (jimUtil.exists(instances)) {
    	  if($grid.hasClass("datalist"))
    		  $grid.dataview("updateDataList", instances,options);
    	  else   if($grid.hasClass("datagrid"))
    		  $grid.dataview("updateDataGrid", instances,options);
      }
    },
    "updateDataList": function(instances, options) {
    	var $grid = jQuery(this), subGrids, i, iLen, tmpInstances, instance, $subGrid, gridHtml;
        if(instances === "" || (jQuery.isArray(instances) && instances.length === 0)) {
          $grid.find(".datarow").remove();
          $grid.trigger("update.dataview");
        } else {
          if(!jimUtil.isArray(instances)) {
            instances = jimUtil.toArray(instances);
          } else if (jQuery.browser.msie && jimMain.isPopup(window)) { /* IE bug: popup window converts array to object */
            tmpInstances = [];
            for (i=0, iLen=instances.length; i<iLen; i+=1) {
              tmpInstances.push(instances[i]);
            }
            instances = tmpInstances;
          }
          if(instances[0] && instances[0].datamaster === $grid.attr("datamaster")) {
            $grid.find(".datarow").remove();
            gridHtml = "";
            tmplFn = lookUpTemplate(jimUtil.getBaseID($grid.attr("id")));
            for(i=0, iLen=instances.length; i<iLen; i+=1) {
              instance = instances[i];
              instance.index = i + 1;
              gridHtml += tmplFn(instance);
            }
            
            $grid.children("tbody").html(gridHtml);
            changeGridDuplicatedIDs($grid);
            
            if(window.PIE){
              $grid.find('.pie:not(.hidden)').each(function() {  
            	if(!$(this).parent().hasClass("hidden")){
            	  PIE.attach(this);
            	}
              });
            }
            if(!window.jimMobile || window.jimMobile && !jimUtil.isMobileDevice()){
              changeInputType($grid);
            }
            
            if(options) {
              $grid.find(".datalist,.datagrid").dataview();
              if (options.type === "pageload") {
                //Prevent infinite loop when a set value into a datalist is triggered from a pageLoad event defined on a datalist descendant.
                if(!$grid.hasClass("pageLoadTriggered")){
                  $grid.addClass("pageLoadTriggered");
                  $grid.find(".pageload").trigger("pageload");
                  $grid.removeClass("pageLoadTriggered");
                }
              }
            }
            $grid.trigger("update.dataview");
          }
        }
        jimUtil.bindDateWidgets($grid);
        jimUtil.refreshPageMinSize();
    },
    "updateDataGrid": function(instances, options) {
    	var $grid = jQuery(this), subGrids, i, iLen, tmpInstances, instance, $subGrid, gridHtml;
        if(instances === "" || (jQuery.isArray(instances) && instances.length === 0)) {
        	 var gridHtml = "<tbody><tr><td></td></tr></tbody>";
             $grid.html(gridHtml);
             $grid.dataview("updateDataGridBounds");
             $grid.trigger("update.dataview");
        } else {
          if(!jimUtil.isArray(instances)) {
            instances = jimUtil.toArray(instances);
          } else if (jQuery.browser.msie && jimMain.isPopup(window)) { /* IE bug: popup window converts array to object */
            tmpInstances = [];
            for (i=0, iLen=instances.length; i<iLen; i+=1) {
              tmpInstances.push(instances[i]);
            }
            instances = tmpInstances;
          }
          if(instances[0] && instances[0].datamaster === $grid.attr("datamaster")) {
            gridHtml = '<tr class="gridrow">';
            tmplFn = lookUpTemplate(jimUtil.getBaseID($grid.attr("id")));
            for(i=0, iLen=instances.length; i<iLen; i+=1) {
              instance = instances[i];
              instance.index = i + 1;
              
              gridHtml += tmplFn(instance);
            }
            gridHtml += "</tr>";
            $grid.html(gridHtml);
            $grid.dataview("rebuildDataGridHierarchy","true");
            changeGridDuplicatedIDs($grid);
          
            
            if(window.PIE){
              $grid.find('.pie:not(.hidden)').each(function() {  
            	if(!$(this).parent().hasClass("hidden")){
            	  PIE.attach(this);
            	}
              });
            }
            if(!window.jimMobile || window.jimMobile && !jimUtil.isMobileDevice()){
              changeInputType($grid);
            }
            
            if(options) {
              $grid.find(".datagrid,.datalist").dataview();
              if (options.type === "pageload") {
                //Prevent infinite loop when a set value into a datalist is triggered from a pageLoad event defined on a datalist descendant.
                if(!$grid.hasClass("pageLoadTriggered")){
                  $grid.addClass("pageLoadTriggered");
                  $grid.find(".pageload").trigger("pageload");
                  $grid.removeClass("pageLoadTriggered");
                }
              }
            }
            $grid.trigger("update.dataview");
          }
        }
        jimUtil.bindDateWidgets($grid);
        jimUtil.refreshPageMinSize();
    },
	"getOrderedGridCells":function(init){
		var $grid = jQuery(this);
		if($grid.hasClass("datagrid")){
			var isHorizontal = $grid.is(".horizontal");
			var $oldRows = $grid.children("tbody").children("tr");
			var $gridCells;
			if(isHorizontal || init)
				$gridCells = $oldRows.children("td").children(".gridcell").parent();
			else{
				$gridCells = [];
				var numVisibleRows =  $oldRows.filter(":not(.hidden)").length;
				var numPages = $oldRows.length/numVisibleRows;
				var i, iLen,j,jLen,c,cLen;
				var numVisibleColumns = 0;
				for (i=0,iLen=$oldRows.length;i<iLen;i+=1){
					var $row = jQuery($oldRows[i]);
					numVisibleColumns = Math.max(numVisibleColumns,$row.children("td").length);
				}		
		        for (i=0,iLen=numPages;i<iLen;i+=1){
		        	for (c=0,cLen=numVisibleColumns;c<cLen;c+=1){
		        		for (j=0,jLen=numVisibleRows;j<jLen;j+=1){
		        			var rowIndex  = (i*numVisibleRows)+j;
		        			var $row = jQuery($oldRows[rowIndex]);
		        			var $currentCells = $row.children("td");
		        			var $currentGridCell = jQuery($currentCells.get(c)).children(".gridcell");
		        			if(c<$currentCells.length && $currentGridCell.length)
		        				$gridCells.push($currentGridCell.parent()[0]);
		        		}
		        	}
		        }
			}
			return $gridCells;
		}
	},
	"updateDataListPage": function(init){
		var $grid = jQuery(this);
		if($grid.hasClass("datalist")){
			//show as many rows as the page needs
			var $allRows = $grid.children("tbody").children("tr");
			var numInstances = $allRows.length;
			var items = parseInt($grid.attr("size"), 10);
			var itemsPerPage = Math.min(parseInt($grid.attr("size"), 10),numInstances);
			var itemsVisible = $allRows.filter(":not(.hidden)").length;
			
			if(itemsVisible<itemsPerPage){
				for (var j=0; j<itemsPerPage; j+=1) {
        	  		var $row = jQuery($allRows[j]);
        		    $row.removeClass("hidden");
        	  	}
			}
		}
	}, 
	"rebuildDataGridHierarchy": function(init){
		var $grid = jQuery(this);
		if($grid.hasClass("datagrid")){
			//get grid info
			var $oldRows = $grid.children("tbody").children("tr");
			var $gridCells = $grid.dataview("getOrderedGridCells",init);
			var numInstances = $gridCells.length;
			var isHorizontal = $grid.is(".horizontal");
			var itemsPerRowOrColumn = parseInt($grid.attr("items"), 10);
			var items = parseInt($grid.attr("size"), 10);
			var itemsPerPage = Math.min(parseInt($grid.attr("size"), 10),numInstances);
			if(items==0)
				itemsPerPage = numInstances;
			var numVisibleRows, numVisibleColumns; 
			if(isHorizontal){
				numVisibleColumns = /*Math.min(itemsPerPage,*/itemsPerRowOrColumn/*)*/;
	    		numVisibleRows = Math.ceil(itemsPerPage/numVisibleColumns);
	    	}else{
	    		numVisibleRows =  /*Math.min(itemsPerPage,*/itemsPerRowOrColumn/*)*/;
	    		numVisibleColumns = Math.ceil(itemsPerPage/numVisibleRows);
	    	}
			
            var numPages = 0;
            if(itemsPerPage>0)
            	numPages = Math.ceil(numInstances/itemsPerPage);
            var numTotalRows = numVisibleRows * numPages;
            
            
            //create new rows
            var $newRows= [];
            var i, iLen;
            for (i=0,iLen=numTotalRows;i<iLen;i+=1){
            	var $newRow = document.createElement('tr');
            	$newRow.className = 'gridrow';
            	$newRows[i] = $newRow;
            }
			
            //move gridCells to new rows
            var currentGridCell, rowIndex;
            for(i=0, iLen=numInstances; i<iLen; i+=1) {
            	currentGridCell = $gridCells[i];
            	rowIndex = 0;
            	var pageIndex = parseInt(i / itemsPerPage);
            	var i_pageTranslated = i-(pageIndex*itemsPerPage);
            	if(isHorizontal){
            		 var rowIndex_page= parseInt(i_pageTranslated/numVisibleColumns);  
            		 rowIndex = (pageIndex * numVisibleRows) + rowIndex_page;
            	}else{
            		var rowIndex_page= parseInt(i_pageTranslated%numVisibleRows);
            		rowIndex = (pageIndex * numVisibleRows) + rowIndex_page;
            	}
            	var $row = $newRows[rowIndex];
            	$row.appendChild(currentGridCell);
            }
            
          //append new rows to the grid
            for (i=0,iLen=numTotalRows;i<iLen;i+=1){
            	var row = $newRows[i];
            	$grid.children("tbody")[0].appendChild(row);
            }
            
            //remove old rows
            for (i=0,iLen=$oldRows.length;i<iLen;i+=1){
            	var row = $oldRows[i];
            	 $grid.children("tbody")[0].removeChild(row);
            }
            
            //fill rows with empty tds
            for (i=0,iLen=numTotalRows;i<iLen;i+=1){
            	var row = $newRows[i];
            	var numTD =jQuery(row).children("td").length;
             	for (j=numTD,jLen=numVisibleColumns;j<jLen;j+=1){
             		var emptyTD= document.createElement('td');
             		var emptyDIV = document.createElement('div');
             		emptyDIV.className ='layout';
             		emptyTD.appendChild(emptyDIV);
             		row.appendChild(emptyTD);
             	}            	
           }
            
           	$grid.dataview("hideRows",numVisibleRows);
			$grid.dataview("updateDataGridBounds");
		}
	}, 
	"hideRows": function(numVisibleRows) {
		var $grid = jQuery(this);
    	if($grid.hasClass("datagrid")){
    		var $rows = $grid.children("tbody").children("tr");
    		var $gridCells = $rows.children("td").children(".gridcell");
    		var $firstVisibleGridCell = $gridCells.filter(":not(.hidden)").first();
    		var rowIndex = 0;
    		if($firstVisibleGridCell.length>0)
    			rowIndex = $rows.index($firstVisibleGridCell.parent("td").parent("tr"));
        
    		if(numVisibleRows===undefined){
    			numVisibleRows = $rows.filter(":not(.hidden)").length; 
    			}
        
    		for(i=0, iLen=$rows.length; i<iLen; i+=1) {
    			$row = jQuery($rows[i]);
    			if(i>=rowIndex && i<rowIndex+numVisibleRows){
    				$row.removeClass("hidden");
    			}else{
    				$row.addClass("hidden");
    			}
    		}
    	}
    },
    "updateDataGridBounds": function() {
    	var $grid = jQuery(this);
    	if($grid.hasClass("datagrid")){
	    	var isHorizontal = $grid.is(".horizontal");
	    	var hSpacing =  parseInt($grid.attr("hSpacing"));
	    	var vSpacing =  parseInt($grid.attr("vSpacing"));
	    	var itemWidth =  parseInt($grid.attr("childwidth"));
	    	var itemHeight = parseInt($grid.attr("childheight"));
	    	var itemBorderWidth = 0;
	    	var itemBorderHeight = 0;
	    	var numColumns,numRows;
	    	if(isHorizontal){
	    		numColumns =  parseInt($grid.attr("items"));
	    		numRows = Math.ceil($grid.find(".gridcell:not(.hidden)").length/numColumns);
	    	}else{
	    		numRows = parseInt($grid.attr("items"));
	    		numColumns = Math.ceil($grid.find(".gridcell:not(.hidden)").length/numRows);
			}
			
	    	var $firstGridCell = $grid.find(".gridcell:not(.hidden):first");
			if($firstGridCell.length>0){
				itemBorderWidth =parseInt($firstGridCell.css("border-left-width")) + parseInt($firstGridCell.css("border-right-width"));
				itemBorderHeight =parseInt($firstGridCell.css("border-top-width")) + parseInt($firstGridCell.css("border-bottom-width"));
			}
			
			var numHSpacings = 1;
			if(numColumns>1)
				numHSpacings = numColumns;
			
			var numVSpacings = 1;
			if(numRows>1)
				numVSpacings = numRows;
			
			var w = ((itemWidth+itemBorderWidth) * numColumns) + (hSpacing*numHSpacings);
    		var h = ((itemHeight+itemBorderHeight) * numRows) + (vSpacing*numVSpacings);

    		
    		var $trs = $grid.children("tbody").children("tr");
    		var $tds = $trs.children("td");
    		var $gridCells = $tds.children(".gridcell");
  		$gridCells.css("width",itemWidth+"px");
  		$gridCells.css("height",itemHeight+"px");
    		
    		
  			$tds.css("padding-right",hSpacing+"px");
    		$tds.css("padding-bottom",vSpacing+"px");
    		
    		$tds.css("horizontal-align","left");
    		$tds.css("vertical-align","top");
    		$tds.css("width",(itemWidth)+"px");
    		$tds.css("height",(itemHeight)+"px");
    		
    	
    		$grid.css("width",w+"px");
    		$grid.css("height",h+"px");

    		$grid.css("padding-left",hSpacing+"px");
    		$grid.css("padding-top",vSpacing+"px");    		
    		
    		
    		$trs.css("border-spacing",+"0px");  
    		
    	}
	  }
  };
  

  
  function changeGridDuplicatedIDs($grid){
	  $grid.find("tbody>.datarow, .gridcell").each(function(instanceIndex,item) {
      	var $item= jQuery(item);
      	var $children = $item.find(".firer, .nodecontent, .menunode > span").andSelf().each(function(){
      		var closestDataView = $(this).closest(".datalist, .datagrid")[0];
      		if($(this).closest(".headerrow").length>0){
      			closestDataView = $(this).closest(".datalist").parent().closest(".datalist, .datagrid")[0];
      		}
      		if(closestDataView === $grid[0]){
      			changeElementID(instanceIndex,$(this));
      		}
      	});
      });
	  //Change datalist ID nested into another datalist after HTML is injected(original ID is used to find the CDATA template).  
      var $parentItem = $grid.closest(".datarow, .gridcell");
      if (jimUtil.exists($parentItem[0])){
      	var instanceIndex = $parentItem.parent().children(".datarow, .gridcell").index($parentItem);
      	changeElementID(instanceIndex,$grid);
      }
  }
  
  
  function changeElementID(instanceIndex, $element){
		var baseID = $element.attr("id");
		var newID = "r"+instanceIndex+"_"+baseID;
		$element.addClass(baseID);
		$element.attr("id",newID);
		
		if ($element.hasClass("image") && $element.children().is("svg")) {
		  var style = $element.find("style");
		  if (style.length > 0) 
		    style.html(style.html().replace(new RegExp(baseID,'g'),newID));
		}
  }
  
  function changeInputType($grid) {
	  $grid.find('input[type="date"], input[type="time"], input[type="datetime-local"], input[type="email"], input[type="url"], input[type="number"]').each(function() {
		if(jQuery(this).attr("readonly"))
		  $("<input type='text' />").attr({ name: this.name, value: this.defaultValue, tabindex: this.tabIndex, readonly:"readonly" }).insertBefore(this);
		else $("<input type='text' />").attr({ name: this.name, value: this.defaultValue, tabindex: this.tabIndex }).insertBefore(this);
	  }).remove();
  }
  
  
  jQuery.fn.dataview = function(method) {
    if (gridMethods[method]) {
      return gridMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof(method) === 'object' || !method) {
      return gridMethods.init.apply(this, arguments);
    } else {
      jimUtil.debug("Method " +  method + " does not exist.");
    }
  };
})(window);