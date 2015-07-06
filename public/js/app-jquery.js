$(document).ready(function(){
	$(".celcius").hide();
	$(".toggler").click(function(){
		if($(".celcius").css('display') === 'none'){
			$(".toggler").text("Show temperature in Fahrenheit");
		}
		else{
			$(".toggler").text("Show temperature in Celcius");
		}
		$(".celcius").toggle();
		$(".fahrenheit").toggle();
	});
	$('#weatherCarousel').click(function() {
  		
	});
});




