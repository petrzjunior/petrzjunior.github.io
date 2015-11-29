$(function() {
	var canvas = $("#c");
	var canvasHeight;
	var canvasWidth;
	};
	
	function init() {
		updateCanvasDimensions();
		
		
	};
	function updateCanvasDimensions() {
		canvas.attr({height: $(window).height(), width: $(window).width()});
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
		draw();
	};