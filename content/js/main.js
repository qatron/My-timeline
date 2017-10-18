// JavaScript Document
$(function(){
	"use strict";
	screen.orientation.lock('landscape');
	
	function loadContent(target, file, source, callback) {
		
		target.children().fadeOut('slow').promise().done(()=>{
			$.get(file, function(data){
				let content = $($.parseHTML(data));
				content = content.find(source).children().add(content.filter(source).children());
				console.log(content);
				content.hide();
				target.html(content).children().fadeIn('slow', ()=>{
					if($.isFunction(callback)) {callback();}
				});
			});
		});
			
	}
	
	$('.main-title').click(()=>{
		loadContent($('header'), "timeline.html", "header");
		loadContent($('#content'), "timeline.html", "#content", function(){$.getScript("content/js/timeline.js");});
	});
});