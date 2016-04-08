$(document).ready(function(){
	var isPlaying = false;
	var vid = document.createElement('video');
	vid.setAttribute('src', 'Users/michaelkong/Desktop/Harith Iskandar Women are Better than Men.mp4');  
	vid.preload = "auto";
	
	//event listener to listen for when video data has loaded
	vid.addEventListener("loadeddata", function(){
		var sec_total = Math.floor(vid.duration);
		var zero_total = "";
		if((sec_total % 60) < 10){
			zero_total = "0";
		} else{
			zero_total = "";
		}
		$('#total_time').text("/" + Math.floor(sec_total / 60) + ":" + zero_total + (sec_total % 60));
		$('progress').attr('max', sec_total);
	});
	
	//event listener to listen when video has ended
	vid.addEventListener('ended', function(){
		$('#play_video').attr('value', 'Play!');
		isPlaying = false;
	});
	
	$('#play_video').click(player);
	$('#stop_video').click(stopper);
	$('#loop_video').click(looper);
	$('#go').click(process);
	
	//event listeners to listen for volume bar events
	$('#vol').mousemove(volume_control);
	$('#vol').click(volume_control);
	$('#vol').on('swipemove', volume_control);
	
	//event listeners to listen for progress bar events
	$('progress').click(function(e){
		var x_loc = e.pageX - this.offsetLeft;
		vid.currentTime = (x_loc / $(this).width()) * Math.floor(vid.duration);
		timer();
	});
	$('progress').mouseenter(function(){
		document.body.style.cursor = "pointer";
	});
	$('progress').mouseleave(function(){
		document.body.style.cursor = "default";
	});
	
	//event listeners to listen for keypresses
	$(document).on('keypress', function(e){
		if(e.keyCode == 13 && ($('#position_grabber').val() !== "")){
			process();
		} else if(e.keyCode == 32){
			player();
		}
	});
	
	//function for loop button
	function looper(){
		if(!vid.loop){
			vid.loop = true;
			$('#loop_video').attr('value', 'Don\'t Loop!');
		} else{
			vid.loop = false;
			$('#loop_video').attr('value', 'Loop!');
		}
	}
	
	//function to control volume
	function volume_control(){
		var volume = $('#vol').val();
		vid.volume = volume / 100;
		$('#vol_num').text(volume + "%");
	}
	
	//function to play and pause + start timer
	function player(){
		if(!isPlaying){
			vid.play();
			isPlaying = true;
			$('#play_video').attr('value', 'Pause!');
		}
		else{
			vid.pause();
			isPlaying = false;
			$('#play_video').attr('value', 'Play!');
		}
		$('#note').text("");
		timer();
		$('#vol').val(vid.volume * 100);
	}
	
	//function to stop video
	function stopper(){
		if(isPlaying){
			$('#play_video').attr('value', 'Play!');
			vid.pause();
			isPlaying = false;
		}
		vid.currentTime = 0;
		$('#note').text("");
	}
	
	//function to play from given point in text box
	function process(){
		var time = $('#position_grabber').val();
			if(isPlaying){
				vid.pause();
			}
		vid.currentTime = time;
		vid.play();
		isPlaying = true;
		$('#play_video').attr('value', 'Pause!');
		$('#position_grabber').val("");
		$('#note').text("Playing from " + time + " seconds!");
		$('#note').slideDown(1000, function(){
			$(this).delay(3000).slideUp(1000);
		});
		timer();
	}
	
	//function to create a timer to update song progress
	function timer(){
		setInterval(function(){
			var sec_curr = Math.floor(vid.currentTime);
			var zero_curr = "";
			if((sec_curr % 60) < 10){
				zero_curr = "0";
			} else{
				zero_curr = "";
			}
			var current_time = Math.floor(sec_curr / 60) + ":" + zero_curr + (sec_curr % 60);
			$('#curr_time').text(current_time);
			$('progress').attr('value', sec_curr);
		}, 1000);
	}
	
});