$(document).ready(function(){
	$("#weatherCarousel").on("slide.bs.carousel", function(){
		var classSelector = $('.item.active');
		var index = $('.item.active').index() + 1;
		if(index === 4){
			index = 0;
		}
		var location = $("#item-" + index).text().split(',');
		var city = location[0];
		var state = location[1].slice(0,3).trim();
		var url = "/search/image/" + city + "/" + state;
		$.ajax({
			type: 'GET',
			url: url
		}).done(function(data){
			var html = "";
			data.d.results.forEach(function(result){
				html += "<a href=\"" + result.SourceUrl + "\"><img src=\"" + result.Thumbnail.MediaUrl +"\" width=100 height=100></a>";
			});
			$("#imageresults").html(html);
		});
	})
	
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




