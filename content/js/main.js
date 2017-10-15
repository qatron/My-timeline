// JavaScript Document
$(function(){
	"use strict";
	$('.main-title').click(()=>{
		
		function loadContent(target, source, callback) {
			target.children().fadeOut('slow', ()=>{
				target.load(source, ()=>{
					target.children().hide().fadeIn('slow', callback());
					console.log(target);
				});
			});
		}
		
		loadContent($('header'), "timeline.html header > *", ()=>{});
		loadContent($('#content'), "timeline.html #content > *", function(){$.getScript("content/js/timeline.js");});
		
	});
});