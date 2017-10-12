// JavaScript Document
$(function(){
	"use strict";
	
	class Part {
		constructor(element) {
			this._element = element;
		}
		
		get element() {
			return this._element;
		}
		set element(item) {
			this._element = item;
		}
		
		get flexGrow() {
			return this._element.css('flex-grow');
		}
		set flexGrow(val) {
			this._element.css('flex-grow', val);
		}
	}
	
	
	let timeline = {
		part: [],
		masterPoint: []
	};
	
	for(let parts = $('.part'), q = 0; q < parts.length; q++) {
		timeline.part.push(new Part(parts.eq(q)));
	}	
	
	
	console.log('loaded');
	
});