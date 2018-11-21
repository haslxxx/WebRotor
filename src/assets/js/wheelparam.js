$("#knobcontainer").timerangewheel({
	indicatorWidth: 12,
	handleRadius: 15,
	handleStrokeWidth: 1,
	accentColor: '#fed766',
	handleIconColor: "#8a9097",
	handleStrokeColor: "#8a9097",
	handleFillColorStart: "#374149",
	handleFillColorEnd: "#374149",
	tickColor: "#8a9097",
	indicatorBackgroundColor: "#8a9097",
	data: {"start":"19:10", "end":"02:00"},
	onChange: function (timeObj) {
		$(".graph-left").html("Start: "+timeObj.start);
		$(".graph-right").html("End: "+timeObj.end);
		$(".graph-center").html("Duration: "+timeObj.duration);
	}
});