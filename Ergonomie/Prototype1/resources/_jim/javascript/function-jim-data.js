/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  if(jimMain.isPopup(window)) {
    window.jimData = jimMain.getMainWindow().jimData; /* expose to global object */
  } else {
    var jimData = {
      "isInitialized": false,
      "variables": {},
      "datamasters": {},
      "getDataRowClass": function(index) {
        return ((index)%2===0) ? "even" : "odd";
      },
      "hasValue": function(array, value) {
        return jimUtil.toArray(array).contains(value);
      },
      "isTrue": function(value) {
        return (jimUtil.exists(value)) ? value.toString() === "true" : false;
      },
      "get": function(key) {
        return jimData.variables[key];
      },
      "set": function(key, value) {
        jimData.variables[key] = value;
      },
      "clearData": function() {
        window.initLoad = true;
        if(!jimMain.isPopup(window)) {
          window.top.name = "";
        }
      },
      "load": function(windowRef) {
        var json, data;
        if(!jimMain.isPopup(windowRef)) {
          json = window.top.name;
          if(json !== "") {
            try {
              data = JSON.parse(json);
              jimData.isInitialized = data.isInitialized;
              jimData.variables = data.variables;
              jimData.datamasters = data.datamasters;
              jimData.layout = data.layout;
            } catch(e) {
              jimUtil.debug(e); /* invalid JSON, access denied to property */
              jimData.isInitialized = false;
            }
          }
          if(jimData.isInitialized !== true && typeof(initData) === "function") {
            initData();
          }
        }
      },
      "unload": function(windowRef) {
        if(!jimMain.isPopup(windowRef)) {
          /* copy by value not reference! */
          var data = {
            "datamasters": jQuery.extend(true, {}, jimData.datamasters),
            "variables": jQuery.extend(true, {}, jimData.variables),
            "layout": (jimUtil.exists(windowRef.jimLayout) && typeof(windowRef.jimLayout.state) === "function") ? windowRef.jimLayout.state() : "",
            "isInitialized": jimData.isInitialized
          };
          try {
            window.top.name = JSON.stringify(data);
          } catch(error) {
            jimUtil.debug(error); /* invalid JSON */
          }
        }
      }
    };
    window.jimData = jimData; /* expose to global object */
  }
  /* END DATA FUNCTIONS */
})(window);