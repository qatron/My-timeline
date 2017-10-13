// JavaScript Document
$(function(){
	"use strict";
	
	class Part {
		constructor(element) {
			this._element = element;
		}
		
		get flexGrow() {
			return this._element.css('flex-grow');
		}
		set flexGrow(val) {
			this._element.css('flex-grow', val);
		}
	}
	
	
	let timeline = {
		
		_parts: [],
		partsInit() {
			for(let parts = $('.part'), q = 0; q < parts.length; q++) {
				timeline._parts.push(new Part(parts.eq(q)));
			}
		},
		
		_activePart: undefined,
		partActivate(index) {
			let activePart = timeline._activePart;
			if(activePart) {
				activePart.flexGrow = 0;
			}
			activePart = timeline._parts[index];
			activePart.flexGrow = 1;
			timeline._activePart = activePart;
		},
		
		_masterPoints: [],
		masterPointsInit() {
			let items = $('.master-point');
			for(let q = 0; q<items.length; q++) {
				timeline._masterPoints.push(items.eq(q));
			}
			
			items.click((e)=>{
				let that = $(e.currentTarget);
				timeline.partActivate(that.index()/2);
			});
			
		}
	};
	
	timeline.partsInit();
	timeline.masterPointsInit();
	
	
	console.log('loaded');
	
});