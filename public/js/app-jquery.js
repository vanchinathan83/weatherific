$(document).ready(function(){
    $('#tabs').tab();
    getNewsAndPhotos($,true);
	$('#weatherCarousel').on('slide.bs.carousel', function(){
		getNewsAndPhotos($,false);
	})
	
	$('.celcius').hide();
	$('#toggler').click(function(){
		if($('.celcius').css('display') === 'none'){
			$('#toggler').text('Show temperature in Fahrenheit');
		}
		else{
			$('#toggler').text('Show temperature in Celcius');
		}
		$('.celcius').toggle();
		$('.fahrenheit').toggle();
	});
});


function getNewsAndPhotos($,isStart){
	var classSelector = $('.item.active');
	var index = 0
	if(!isStart)
		index = $('.item.active').index() + 1;
	if(index === 4)
		index = 0;
	var location = $('#item-' + index).text().split(',');
	var city = location[0];
	var state = location[1].slice(0,3).trim();
	var image_search_url = '/search/image/' + city + '/' + state;
	var news_search_url = '/search/news/' + city + '/' + state;
	$.ajax({
			type: 'GET',
			url: image_search_url
		}).done(function(html){
			$('#photos').html(html);
		});

		$.ajax({
			type: 'GET',
			url: news_search_url
		}).done(function(html){
			$('#news').html(html);
		});
}




