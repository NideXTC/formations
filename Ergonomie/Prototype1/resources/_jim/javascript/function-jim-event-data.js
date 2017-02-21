/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  jQuery.extend(jimEvent.fn, {
    "jimCreateData": function(args, callback) {
      var self = this, datamaster, newInstance, field, value;
      if (args && args.datamaster && args.fields) {
        datamaster = args.datamaster;
        if (jimData.datamasters.hasOwnProperty(datamaster)) {
          /*get last data master id*/
          var lastId = 1;
          for(var instanceIndex in jimData.datamasters[datamaster]){
        	  if(jimData.datamasters[datamaster][instanceIndex].id >= lastId)
        		  lastId = jimData.datamasters[datamaster][instanceIndex].id + 1;
          }	
          newInstance = {
            "id": lastId,
            "datamaster": datamaster,
            "userdata": {}
          };
          
          for(field in args.fields) {
            if(args.fields.hasOwnProperty(field)) {
              value = args.fields[field];
              newInstance.userdata[field] = (jQuery.isEmptyObject(value)) ? "" : self.evaluateExpression(value);
            }
          }
          
          jimData.datamasters[datamaster].push(newInstance);
        }
        
        if(callback) { callback(); }
      }
    },
    "jimUpdateData": function(args, callback) {
      var self = this, datamaster, instances, instance, i, iLen, j, jLen, variable, records, record, value, $dataViews, g, gLen, k, kLen, $datarows, field, $field;
      if (args && args.fields) {
        /* update data */
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i = 0, iLen = instances.length; i < iLen; i += 1) {
          instance = instances[i];
          
          /* establish association with data master record, may have been lost on unload */
          datamaster = jimData.datamasters[instance.datamaster];
          for(j = 0, jLen = datamaster.length; j < jLen; j += 1) {
            if(datamaster[j].id === instance.id) {
              datamaster[j] = instance;
              break;
            }
          }
          
          /* establish association with variable, may have been lost on unload */
          for(variable in jimData.variables) {
            if(jimData.variables.hasOwnProperty(variable)) {
              records = jimData.variables[variable];
              if(jimUtil.isArray(records)) {
                for(j = 0, jLen = records.length; j < jLen; j += 1) {
                  record = records[j]; 
                  if(record.datamaster === instance.datamaster && record.id === instance.id) {
                    jimData.variables[variable][j] = instance;
                    break;
                  }
                }
              }
            }
          }
          
          for(field in args.fields) {
            if(args.fields.hasOwnProperty(field)) {
              value = args.fields[field];
              if(!jQuery.isEmptyObject(value)) {
                instance.userdata[field] = self.evaluateExpression(value, instance);
              }
            }
          }
        }
        /* update data grid */
        datamaster = args.datamaster || args.parameter && args.parameter.datamaster || instance.datamaster;
        $dataViews = jQuery(".datalist[datamaster='" + datamaster +"'], .datagrid[datamaster='" + datamaster +"']");
        for(g=0, gLen=$dataViews.length; g < gLen; g += 1) {
          var $dataView = jQuery($dataViews[g]);
          for (k=0, kLen=instances.length; k < kLen; k += 1) {
            instance = instances[k];
            var $rowOrGridCell;
            if($dataView.is(".datagrid")){
            	$rowOrGridCell = $dataView.find(".gridcell[instance='" + instance.id + "']");
            }else{
            	var $datarows = $dataView.find("[name='id'][value='" + instance.id + "']").parents(".datarow");
            	if($datarows.length)
            		$rowOrGridCell = jQuery($datarows[0]);
            }
            
            if($rowOrGridCell) {
              for (field in instance.userdata) {
                if (instance.userdata.hasOwnProperty(field)) {
                  value = instance.userdata[field];
                  $field = $rowOrGridCell.find("[name='" + field + "']");
                  $field.val(value);
                  switch($field.jimGetType()) {
                    case itemType.dropdown:
                    case itemType.nativedropdown:
                    case itemType.selectionlist:
                    case itemType.multiselectionlist:
                    case itemType.radiobuttonlist:
                    case itemType.checkboxlist:
                      self.jimSetSelection({"target": $field, "value": value});
                      break;
                      /* intentional fall-through */ 
                    default:
                      self.jimSetValue({"target": $field, "value": value});
                      break;
                  }
                }
              }
              $rowOrGridCell.closest(".datachange").trigger("datachange");
            }
          }
        }
        
        if(callback) { callback(); }
      }
    },
    "jimDeleteData": function(args, callback) {
      var self = this, datamaster, $grid,$gridCell, variable, instances, removeInstances, removeInstance, removeID, i, iLen, j, id;
      if (args) {
        datamaster = args.datamaster || args.parameter && args.parameter.datamaster;
        if (args.datatype === "datamaster") {
          /* delete data master */
          jimData.datamasters[datamaster] = [];
          /* update data grid */
          jQuery(".datalist[datamaster='" + datamaster +"']").each(function(index, grid) {
            jQuery(grid).children("tbody").html("<tr><td></td></tr>");
          });
          /* update variable */
          for(variable in jimData.variables) {
            if(jimData.variables.hasOwnProperty(variable)) {
              instances = jimData.variables[variable];
              if(jimUtil.isArray(instances)) {
                for(i=instances.length-1; i>=0; i-=1) {
                  removeInstance = instances[i];
                  if(removeInstance.datamaster === datamaster) {
                    instances.splice(i,1);
                  }
                }
              }
            }
          }
        } else {
          /* delete data master */
          removeInstances = jimUtil.toArray(self.evaluateExpression(args));
          datamaster = datamaster || removeInstances.length && removeInstances[0].datamaster;
          instances = jimData.datamasters[datamaster];
          removeID = [];
          for (i=instances.length-1; i>=0 && removeInstances.length; i-=1) {
            for (j=removeInstances.length-1; j>=0; j-=1) {
              id = removeInstances[j].id;
              if (instances[i].id === id) {
                removeID.push(id);
                removeInstances.splice(j, 1);
                instances.splice(i, 1);
                break;
              }
            }
          }
          /* update data grid */
          jQuery(".datalist[datamaster='" + datamaster +"']").each(function(index, grid) {
            $grid = jQuery(grid);
            for (i=0, iLen=removeID.length; i<iLen; i+=1) {
              $grid.find(".datarow:has([name='id'][value='" + removeID[i] + "'])").remove();
            }
            $grid.dataview("updateDataListPage");
            $grid.trigger("update.dataview");
          });
          
          jQuery(".datagrid[datamaster='" + datamaster +"']").each(function(index, grid) {
        	  $grid = jQuery(grid);
        	
        	  for (i=0, iLen=removeID.length; i<iLen; i+=1) {
        		var  $dataViewInstances = $grid.find(".gridcell");
        	  	$gridCell = $grid.find(".gridcell[instance='" + removeID[i] + "']");
        	  	var $visibleCells = $dataViewInstances.filter(":not(.hidden)");
        	  	var maxIndex = 0;
        	  	var j,jLen;
        	  	for (j=0, jLen=$visibleCells.length; j<jLen; j+=1) {
        	  		var instanceNumber = jQuery($visibleCells.get(j)).attr("instance");
        	  		maxIndex = Math.max(maxIndex,instanceNumber);
        	  	}
        	  	maxIndex= maxIndex+1;
        	  	var $nextVisibleCell =  $grid.find(".gridcell[instance='" + maxIndex + "']");
        	  	$gridCell.remove();
        	  	$nextVisibleCell.removeClass("hidden");
              }
        	  $grid.dataview("rebuildDataGridHierarchy");
        	  $grid.trigger("update.dataview");
          });
          
          
          /* update variable */
          for(variable in jimData.variables) {
            if(jimData.variables.hasOwnProperty(variable)) {
              instances = jimData.variables[variable];
              if(jimUtil.isArray(instances)) {
                for(i=0, iLen=removeID.length; i<iLen; i+=1) {
                  for(j=instances.length-1; j>=0; j-=1) {
                    removeInstance = instances[j];
                    if(removeInstance.datamaster === datamaster && removeInstance.id === removeID[i]) {
                      instances.splice(j,1);
                    }
                  }
                }
              }
            }
          }
        }
        
        if(callback) { callback(); }
      }
    },
    "jimFilterData": function(args) {
      var self = this, filteredInstances = [], instances, i, len, result, searchTokens, searchExpression, search, property;
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i=0, len=instances.length; i < len; i += 1) {
          result = self.evaluateExpression(args.value, instances[i]);
          instance = instances[i]; /* prevent overwrite from other inner filter instances */
          if (typeof (result) === "string") {
            searchTokens = jimUtil.escapeRegex(result).split(' ');
            searchExpression = '^(?=.*?' + searchTokens.join(')(?=.*?') + ').*$';
            search = new RegExp(searchExpression, "i");
            
            /* TODO: apply over whole instance not attributes
             * values = jimUtil.getValues(instance, ["id", "datamaster"]).join(" ");
             * if (search.test(values)) {
             *   filteredInstances.push(instance);
             * }
             */
            
            for(property in instance.userdata) {
              if(instance.userdata.hasOwnProperty(property)) {
                if (search.test(instance.userdata[property])) {
                  filteredInstances.push(instance);
                  break;
                }
              }
            }
          } else if (result) {
            filteredInstances.push(instance);
          }
        }
      }
      return filteredInstances;
    },
    "jimSumData": function(args) {
      var self = this, instances, result = 0, i, len, tmpResult;
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i=0, len=instances.length; i < len; i += 1) {
          tmpResult = jimEvent.tryNumberConversion(self.evaluateExpression(args.value, instances[i]));
          if (jimUtil.exists(tmpResult) && !isNaN(tmpResult)) {
            result += Number(tmpResult);
          } else {
            result = null;
            break;
          }
        }
        return result;
      }
    },
    "jimAvgData": function(args) {
      var self = this, result = null, sum, length;
      if (args) {
        length = jimUtil.toArray(self.evaluateExpression(args)).length;
        if (length !== 0) {
          sum = self.jimSumData(args);
          if (sum !== null && !isNaN(sum)) {
            result = sum / length;
          }
        }
      }
      return result;
    },
    "jimMaxData": function(args) {
      var self = this, values = [], instances, i, len;
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i=0, len=instances.length; i < len; i += 1) {
          values.push(self.evaluateExpression(args.value, instances[i]));
        }
      }
      return self.jimMax(values);
    },
    "jimMinData": function(args) {
      var self = this, values = [], instances, i, len;
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i=0, len=instances.length; i < len; i += 1) {
          values.push(self.evaluateExpression(args.value, instances[i]));
        }
      }
      return self.jimMin(values);
    },
    "jimCountData": function(args) {
      var self = this, tmpResult, result = null;
      if (args) {
        tmpResult = self.evaluateExpression(args);
        result = (tmpResult === "") ?  0 : jimUtil.toArray(tmpResult).length;
      }
      return result;
    },
    "jimSelectData": function(args) {
      var self = this, result = [], instances, i, len;
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i=0, len=instances.length; i < len; i += 1) {
          result.push(self.evaluateExpression(args.value, instances[i]));
        }
      }
      return result.join(",");
    },
    "jimSelectDistinctData": function(args) {
      var self = this, result = [], instances, i, len;
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        for(i=0, len=instances.length; i < len; i += 1) {
          instance = {
          	"key": self.evaluateExpression(args.value, instances[i]),
          	"value": ""
          };
          result.push(instance);
        }
        var aux = jimUtil.unique(result);
        result = [];
  	    for(i=0, len=aux.length; i < len; i++) {
  		  result.push(aux[i].key);
  	    }
      }
      return result.join(",");
    },
    "jimFilterDistinctData": function(args) {
      var self = this, result = [], instances, i, len;
      if(args) {
    	instances = jimUtil.toArray(self.evaluateExpression(args));
    	for(i=0, len=instances.length; i < len; i += 1) {
    	  instance = {
    		"key": self.evaluateExpression(args.value, instances[i]),
    		"value": instances[i]
    	  };
          result.push(instance);
        }
        var aux = jimUtil.unique(result);
        result = [];
  	    for(i=0, len=aux.length; i < len; i++) {
  		  result.push(aux[i].value);
  	    }
      }
      return result;
    },
    "jimAddToData": function(args) {
      var self = this, result = [], sourceA, datamasterA, sourceB, datamasterB, instances;
      if (jimUtil.exists(args) && jimUtil.exists(args[0]) && jimUtil.exists(args[1])) {
        sourceA = jimUtil.toArray(self.evaluateExpression(args[0]));
        sourceB = jimUtil.toArray(self.evaluateExpression(args[1]));
        
        if(args[0].datamaster) {
          datamasterA = args[0].datamaster;
        } else if (sourceA.length) {
          datamasterA = sourceA[0].datamaster;
        }

        if(args[1].datamaster) {
          datamasterB = args[1].datamaster;
        } else if (sourceB.length) {
          datamasterB = sourceB[0].datamaster;
        }
        
        if(datamasterA && datamasterB && datamasterA === datamasterB || datamasterA === undefined && datamasterB === undefined) {
          result = jQuery.merge(sourceA, sourceB);
        } else if (datamasterA === undefined && datamasterB) {
          result = sourceB;
        } else {
          result = sourceA;
        }
      }
      return result;
    },
    "jimRemoveFromData": function(args) {
      var self = this, result = [], sourceA, sourceB, i, j;
      if (jimUtil.exists(args) && jimUtil.exists(args[0]) && jimUtil.exists(args[1])) {
        sourceA = jimUtil.toArray(self.evaluateExpression(args[0]));
        sourceB = jimUtil.toArray(self.evaluateExpression(args[1]));
        for (i = sourceB.length - 1; i >= 0 && sourceA.length; i -= 1) {
          for (j = sourceA.length - 1; j >= 0; j -= 1) {
            if (sourceB[i] === sourceA[j]) {
              sourceA.splice(j, 1);
              sourceB.splice(i, 1);
              break;
            }
          }
        }
        result = sourceA;
      }
      return result;
    },
    "jimFirstPageData": function(args, callback) {
      var self = this, $target, size, $dataViewInstances;
      if (args && args.target) {
        $target = self.getEventTarget(args.target);
        if ($target.length) {
          size = parseInt($target.attr("size"), 10);
          if(size > 0) {
        	$dataViewInstances = $target.find(".datarow, .gridcell");
            $dataViewInstances.addClass("hidden").filter(":lt(" + size + ")").removeClass("hidden");
            $target.trigger("update.dataview");
          }
        }
        if(callback) { callback(); }
      }
    },
    "jimPrevPageData": function(args, callback) {
      var self = this, $target, size, $dataViewInstances, $prev,index;
      if (args && args.target) {
        $target = self.getEventTarget(args.target);
        if ($target.length) {
          size = parseInt($target.attr("size"), 10);
          $dataViewInstances = $target.find(".datarow, .gridcell");
          index = $dataViewInstances.index($dataViewInstances.filter(":visible").first())-1;
          if (index>=0) {
        	$dataViewInstances.addClass("hidden");
        	$prev = jQuery($dataViewInstances[index]);
            while (size>0 && $prev.length) {
            	$prev.removeClass("hidden");
                if (index>=0){
                	index -=1;
                	$prev = jQuery($dataViewInstances[index]);
                }
                size -= 1;
            }
            $target.trigger("update.dataview");
          }
        }
        if(callback) { callback(); }
      }
    },
    "jimNextPageData": function(args, callback) {
      var self = this, $target, size, $dataViewInstances, $next,index;
      if (args && args.target) {
        $target = self.getEventTarget(args.target);
        if ($target.length) {
          size = parseInt($target.attr("size"), 10);
          $dataViewInstances = $target.find(".datarow, .gridcell");
          index = $dataViewInstances.index($dataViewInstances.filter(":visible").last())+1;
          if (index<$dataViewInstances.length) {
        	$dataViewInstances.addClass("hidden");
        	$next = jQuery($dataViewInstances[index]);
            while (size>0 && $next.length) {
              $next.removeClass("hidden");
              if (index<$dataViewInstances.length){
            	  index +=1;
            	  $next =  jQuery($dataViewInstances[index]);
              }
              size -= 1;
            }
          }
          $target.trigger("update.dataview");
        }
        if(callback) { callback(); }
      }
    },
    "jimLastPageData": function(args, callback) {
      var self = this, $target, $dataViewInstances, gridSize, filterSize, index;
      if (args && args.target) {
        $target = self.getEventTarget(args.target);
        if ($target.length) {
        	$dataViewInstances = $target.find(".datarow, .gridcell");
          gridSize = $dataViewInstances.length;
          filterSize = parseInt($target.attr("size"), 10);
          index = (gridSize % filterSize === 0) ? gridSize - filterSize - 1 : gridSize - (gridSize % filterSize) - 1;
          if(!isNaN(index) && index>0) {
        	  $dataViewInstances.addClass("hidden").filter(":gt(" + index + ")").removeClass("hidden");
            $target.trigger("update.dataview");
          }
        }
        if(callback) { callback(); }
      }
    },
    "getDataInstancesById": function(instances, ids) {
      var result=[], i, ilen, j, jlen, instance;
      for (i=0, ilen=ids.length; i<ilen; i+=1) {
        for (j=0, jlen=instances.length; j<jlen; j+=1) {
          instance = instances[j];
          if (jimEvent.tryNumberConversion(ids[i]) === instance.id) {
            result.push(instance);
            break;
          }
        }
      }
      return result;
    },
    "jimSortDataAscendant": function(args) {
      var self = this, instances = [];
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        if(instances !== []) {
          instances.sort(function(a, b) {
            if(typeof(jimEvent.tryNumberConversion(a.userdata[args.value.field])) === "number") {
              return a.userdata[args.value.field] - b.userdata[args.value.field]
            }
            else if(typeof(jimEvent.tryDateConversion(a.userdata[args.value.field])) === "object" && typeof(a.userdata[args.value.field]) === "string") {
              return new Date(a.userdata[args.value.field]) - new Date(b.userdata[args.value.field])
            }
            else if(typeof(jimEvent.tryStringConversion(a.userdata[args.value.field])) === "string") {
              if (a.userdata[args.value.field] < b.userdata[args.value.field]) {
                return -1
              }
              if (a.userdata[args.value.field] > b.userdata[args.value.field]) {
                return 1
              }
              return 0
            }
          });
      }
      }
      return instances;
    },
    "jimSortDataDescendant": function(args) {
      var self = this, instances = [];
      if (args) {
        instances = jimUtil.toArray(self.evaluateExpression(args));
        if(instances !== []) {
          instances.sort(function(a, b) {
            if(typeof(jimEvent.tryNumberConversion(a.userdata[args.value.field])) === "number") {
              return b.userdata[args.value.field] - a.userdata[args.value.field]
            }
            else if(typeof(jimEvent.tryDateConversion(a.userdata[args.value.field])) === "object" && typeof(a.userdata[args.value.field]) === "string") {
              return new Date(b.userdata[args.value.field]) - new Date(a.userdata[args.value.field])
            }
            else if(typeof(jimEvent.tryStringConversion(a.userdata[args.value.field])) === "string") {
              if (b.userdata[args.value.field] < a.userdata[args.value.field]) {
                return -1
              }
              if (b.userdata[args.value.field] > a.userdata[args.value.field]) {
                return 1
              }
              return 0
            }
          });
        }
      }
      return instances;
    }
  });
})(window);