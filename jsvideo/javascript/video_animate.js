$(document).ready(function(){
	var title = "Let It Go - Frozen";
	var artist = "Idina Menzel";
	var a_bool = false;
	var video = document.getElementById('video');
	var text_changer;
	var is_playing = false;
	var top_height = $("#video").offset().top;
	$('#click_p').css('top', top_height);

	$('#small').click(function(){
		setProportion(319, 133);
		if($(this).hasClass('normal'))
			$(this).removeClass('normal').addClass('selected');
		if($('#medium').hasClass('selected'))
			$('#medium').removeClass('selected').addClass('normal');
		if($('#big').hasClass('selected'))
			$('#big').removeClass('selected').addClass('normal');
	});
	$('#medium').click(function(){
		setProportion(638, 266);
		if($(this).hasClass('normal'))
			$(this).removeClass('normal').addClass('selected');
		if($('#small').hasClass('selected'))
			$('#small').removeClass('selected').addClass('normal');
		if($('#big').hasClass('selected'))
			$('#big').removeClass('selected').addClass('normal');
	});
	$('#big').click(function(){
		var width = $('body').width();
		var height = (266 * width) / 638; 
		setProportion(width, height);
		if($(this).hasClass('normal'))
			$(this).removeClass('normal').addClass('selected');
		if($('#small').hasClass('selected'))
			$('#small').removeClass('selected').addClass('normal');
		if($('#medium').hasClass('selected'))
			$('#medium').removeClass('selected').addClass('normal');
	});
	
	$('#loop').click(function(){
		if(video.loop){ //true if video is looping
			video.loop = false;
			$(this).text("Looping Off").removeClass('selected').addClass('normal').removeAttr('style');
		} else {
			video.loop = true;
			$(this).text("Looping On").removeClass('normal').addClass('selected').css('cursor', 'pointer');
		}
	});
	
	$('#click_p').click(function(){
		video.paused ? video.play() : video.pause();
	});
	
	video.addEventListener('play', function(){
		if(!is_playing){
			text_changer = setInterval(function(){
				$('#watermark').animate({
					'opacity': 0
				}, 1000, 'swing', function(){
					a_bool = !a_bool;
					if(a_bool)
						$(this).text(artist);
					else
						$(this).text(title);
				});
				$('#watermark').animate({
					'opacity': 0.5
				}, 1000, 'swing');
			}, 8000);
			is_playing = true;
		}
	});
	
	video.addEventListener('ended', function(){
		is_playing = false;
		$('#watermark').animate({
			'opacity': 0
		}, 1000, 'swing', function(){
			$(this).text(title);
		});
		$('#watermark').animate({
			'opacity': 0.5
		}, 1000, 'swing');
		clearInterval(text_changer);
	});
});

function setProportion(w, h){
	$('#video').animate({
		'height': h,
		'width': w
	}, 1000, 'easeInOutQuad');
	
	$('#click_p').animate({
		'height': h - 40,
		'width': w
	}, 1000, 'easeInOutQuad');
}