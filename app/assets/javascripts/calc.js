

function Build(attributes){
	this.attributes = attributes
}

Build.prototype.rimRadius = function(){
	return this.attributes.erd / 2;
};

Build.prototype.flangeRadius = function(){
	return this.attributes.flange_diam / 2;
};

Build.prototype.flangeOffset = function(){
	return this.attributes.flange_offset;
};

Build.prototype.cosCrossOverLength = function(){
	var top = 720 * this.attributes.spoke_crosses * Math.PI;
	var bot = 180 * this.attributes.rim_holes;
	return Math.cos(top / bot);
};

Build.prototype.spokeHoleRadius = function(){
	return this.attributes.spoke_hole_diam / 2;
};

Build.prototype.spokeLength = function(){
	rimRadSq = square(this.rimRadius())
	flangeRadSq = square(this.flangeRadius())
	flangeOffsetSq = square(this.flangeOffset())
	radRimRadFlange = 2*this.rimRadius()*this.flangeRadius()

	insideSqrt = (rimRadSq+flangeRadSq+flangeOffsetSq) - (radRimRadFlange*this.cosCrossOverLength())

	return Math.sqrt(insideSqrt) - this.spokeHoleRadius()
};

function square(x){
	return Math.pow(x, 2);
};

function extractBuild(form){
	return new Build({
		erd: parseFloat(form.find("#erd").val()),
		flange_diam: parseFloat(form.find("#flange_diam").val()),
		flange_offset: parseFloat(form.find("#flange_offset").val()),
		rim_holes: parseInt(form.find("#rim_holes").val()),
		spoke_crosses: parseInt(form.find("#spoke_crosses").val()),
		spoke_hole_diam: parseFloat(form.find("#spoke_hole_diam").val()),
	});
};

$(document).on('ready page:load', function(){
	$( '#calculator' ).slideDown(900).css('opacity', 0.3);
	$('#calculator').mouseenter(function(){
		$(this).fadeTo('slow', 1);
	});
	// $('#calculator').mouseleave(function(){
	// 	$(this).fadeTo('slow', 0.4);
	// });

	disableBtn();
});

function disableBtn() {
	$("#button").click(function(e){
		e.preventDefault();
		build = extractBuild($('#spoke-form'));
		console.log(build);
		$('#spokelength').html(Math.round(build.spokeLength()));
		$('#spokemodal').fadeIn();
		//$(document.body).append("Spoke length for this is: " + build.spokeLength());
	});
};
$(document).on('ready page:load', function(){
// if ($('body').data('controller') === "calc" &&
// 	$('body').data('action') === "index") {
// 	alert("I'm here");
// }
	$("#spokemodal").click(function() {
		$("#spoke-form")[0].reset();
	});
});	
