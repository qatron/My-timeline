// JavaScript Document
$(function(){
	"use strict";
	$('.main-title').click(()=>{
		
		function loadContent(target, source, callback) {
			target.children().fadeOut('slow', ()=>{
				target.load(source, ()=>{
					target.children().hide().fadeIn('slow', callback);
				});
			});
		}
		
		loadContent($('header'), "timeline.html header > *");
		loadContent($('#content'), "timeline.html #timeline-content", ()=>{$.getScript("content/js/timeline.js");});
		
	});
});