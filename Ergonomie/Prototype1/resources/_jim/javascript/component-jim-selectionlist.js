/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function (window, undefined) {
  jQuery("#simulation")
    .on("click", ".selectionlist, .multiselectionlist", function(event) {
      var $firer = jQuery(this), $option, oldValue, newValue;
      if (jimUtil.isAnnotationInactive() && typeof($firer.attr("readonly")) === "undefined") {
        oldValue = $firer.find(".selected").text();
        if (typeof($firer.attr("multiple")) === "undefined") {
          $firer.find(".option").removeClass("selected");
        }
        $option = jQuery(event.target || event.srcElement).closest(".option").toggleClass("selected");
        newValue = $firer.find(".selected").text();
        if (oldValue !== newValue) {
          $firer.trigger("change");
        }
      }
    });
})(window);