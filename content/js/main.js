// JavaScript Document
$(function(){
	"use strict";
	$('.main-title').click(()=>{
		
		let header = $('header');
		header.children().fadeOut(()=>{
			header.load("timeline.html header > *", ()=>{
				header.children().hide().fadeIn();
			});
		});
		
		let content = $('#content');
		content.children().fadeOut(()=>{
			content.load("timeline.html #timeline-content", ()=>{
				content.children().hide().fadeIn();
			});
		});
		
		
	});
});