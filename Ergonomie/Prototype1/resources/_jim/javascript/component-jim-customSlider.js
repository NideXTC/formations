(function ($) {
	
//	START LOCAL VARIABLE DECLARATION	
	var $zoomPlusBtn = jQuery("#zoom-slider-plus"),
		$zoomMinusBtn = jQuery("#zoom-slider-minus"),
		$zoomSliderEmpty = jQuery("#zoom-slider-empty"),
		$zoomSliderFull = jQuery("#zoom-slider-full"),
		$zoomCursor = jQuery("#zoom-slider-cursor"),
		$zoomSlider = jQuery("#zoom-slider");
		$zoomBar = jQuery("#zoom-bar-hotspot");
		
	var maxW = parseInt($zoomSliderEmpty.css("width"));
	var barLeft = parseInt($zoomBar.css("left"));
	var step = 10;
// END LOCAL VARIABLE DECLARATION
	
	function setZoom(value) {
		$zoomSliderFull.css("width", value);
		$zoomCursor.css("left",  parseInt($zoomBar.css("left")) + value - parseInt($zoomCursor.css("width"))/2);
		jimMobile.setZoom((value/2 + 50) /100);
	}
	
	$zoomCursor.drag(function (event , drag) {
		var cOrigin = barLeft -  parseInt($zoomCursor.css("width"))/2;
		var value = drag.offsetX - barLeft + step;

		if (drag.offsetX >= cOrigin && drag.offsetX <= cOrigin + maxW) setZoom(value);
		else if (drag.offsetX < cOrigin) setZoom(0);
		else setZoom(maxW);
	}, {relative: true});

	$zoomPlusBtn.bind('click', function(event) {
		var value = parseInt($zoomSliderFull.css("width"));
		
		if (value + step >= maxW) setZoom(maxW);
		else setZoom(value + step);
	});
	
    $zoomMinusBtn.bind('click', function(event) {
		var value = parseInt($zoomSliderFull.css("width"));
		
		if (value - step <= 0) setZoom(0);
		else setZoom(value - step);
	});
    
    $zoomBar.bind('click', function(event) {
		setZoom(event.offsetX)
	});

})(jQuery);
