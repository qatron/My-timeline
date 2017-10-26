// JavaScript Document
$(function(){
	"use strict";
	
	//Content loader
	//with fade off of old content and fade in of new content.
	function loadContent(target, file, source, callback) {
		
		target.children().fadeOut('slow').promise().done(()=>{
			$.get(file, function(data){
				let content = $($.parseHTML(data));
				content = content.find(source).children().add(content.filter(source).children());
				content.hide();
				target.html(content).children().fadeIn('slow').promise().done(()=>{
					if($.isFunction(callback)) {callback();}
				});
			});
		});
			
	}
	
	$('.main-title').click(()=>{
		loadContent($('header'), "timeline.html", "header");
		loadContent($('#content'), "timeline.html", "#content", function(){$.getScript("content/js/timeline.js");}); // loading timeline scripts when content loaded
	});
});