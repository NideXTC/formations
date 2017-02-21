(function ($) {
    'use strict';

    function hideHighlightMenu ($menu, $highlightContainer) {
		$menu.hide('slide',{direction:'up',duration:500,
			complete: function () {$highlightContainer.removeClass("open");}});
    }
    
    $.fn.extend({
        customMenu: function (options) {
            var defaults = {
                    customClass: 'customMenu'
            },
            options = $.extend(defaults, options),
            prefix = options.customClass,
            $mainDiv = $(this),
            $menu = $mainDiv.children("ul");
            document.getElementById("topInfo").appendChild($menu[0]);
			var $highlightContainer = $(this).closest(".highlight");
            
			$('#highlight-select').on("click",function(){
				if (!jimComments.commentsMode && $(".ui-scenario").length <= 0) {
					if(!$highlightContainer.hasClass("open")){
						$highlightContainer.addClass("open");
						$menu.css('left',$highlightContainer[0].offsetLeft);
						$menu.css('width',$highlightContainer[0].offsetWidth);
						$menu.show('slide',{direction:'up'},500);
					}
					else hideHighlightMenu($menu, $highlightContainer);
				}
				
            });
            
            var $options = $menu.children("li");
			$options.on("click",function(){
				hideHighlightMenu($menu, $highlightContainer);
			});
			
			$("body").mousedown(function(event){
				if($(event.target).closest(".highlight").length || $(event.target).closest("#highlight-menu").length)return;
				if($highlightContainer.hasClass("open")){
					hideHighlightMenu($menu, $highlightContainer);
				}
			});
			
			window.onresize = function(event){
				if($highlightContainer.hasClass("open"))
					hideHighlightMenu($menu, $highlightContainer);
			};
        }
    });
})(jQuery);