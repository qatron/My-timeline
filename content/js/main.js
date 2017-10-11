// JavaScript Document
$(function(){
	"use strict";
	$('.main-title').click(()=>{
		
		function loadContent(target, source) {
			target.children().fadeOut('slow', ()=>{
				target.load(source, ()=>{
					target.children().hide().fadeIn('slow');
				});
			});
		}
		
		loadContent($('header'), "timeline.html header > *");
		loadContent($('#content'), "timeline.html #timeline-content");		
	});
});