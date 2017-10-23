// JavaScript Document
$(function(){
	"use strict";
	//Definition of Part class
	//Part is div aera between master-points of timeline
	class Part {
		constructor(element, points) {
			this._element = element;
			this._points = points;
		}
		
		get flexGrow() {
			return this._element.css('flex-grow');
		}
		set flexGrow(val) {
			this._element.css('flex-grow', val);
		}
		get points() {
			return this._points;
		}
		get element() {
			return this._element;
		}
	}
	//Point class definition
	//Points are div 'dots' inside each part. One point for each story.
	class Point {
		constructor(content, year) {
			this._element = $('<div>', {
				class: 'point'
			});
			this._year = year;
			this._content = content;
		}
		get element() {
			return this._element;
		}
		get content() {
			return this._content;
		}
		get year() {
			return this._year;
		}
	}
	
	//Main timeline object
	let timeline = {
		proceeding : false,
		_parts: [], //array for part objects
		//loading stories from xml, parsing
		//creating objects for each point
		//filling with loaded data, adding points to parts and adding parts to array
		partsInit() {
			function loadXML (callback){
				let xmlDoc;
				$.ajax({
					url: 'content/stories.xml',
					type: 'GET',
					dataType: 'xml',
					success: function(response){callback(response);}
				});
				return xmlDoc;
			}
			loadXML((rs)=>{
				let xml = $(rs);
				let parts = xml.find('stories').children();
				
				for (let p = $('.part'), q = 0; q < p.length; q++) {
					
					let points = [];
					let pointsNumber = parts.eq(q).children().length;
					for (let pointsCount = 0; pointsCount<pointsNumber;  pointsCount++){
						let pointContent = parts.eq(q).children().eq(pointsCount).find('content').text();
						let pointYear = parts.eq(q).children().eq(pointsCount).find('year').text();
						let point = new Point(pointContent, pointYear);
						points.push(point);
					}
					timeline._parts.push(new Part(p.eq(q), points));
				}
			});
		},
		
		_activePart: undefined, //currently active part
		points: {
			//loading points to DOM
			load(callback) {
				let element = timeline._activePart.element;
				let points = timeline._activePart.points;
				for(let q = 0; q < points.length; q++){
					element.append(points[q].element);
				}
				element.children().fadeIn('fast').promise().done(callback);
				timeline.proceeding = false;
			},
			//removing points from DOM
			clear(callback) {
				let element = timeline._activePart.element;
				element.children().fadeOut().promise().done(()=>{
					element.children().remove();
					$('.story.container').animate({opacity: 0}, 500, ()=>{$('.story.text').empty().promise().done(callback);});
				});
			},
			//binding click action to points
			init() {
				if(timeline._activePart) {
					let element = timeline._activePart.element;
					let points = timeline._activePart.points;
					element.children().click(function() {
						//displaying story text for selected point
						let that = $(this);
						let text = $('.story.text');
						if($.trim(text.html())){
							text.fadeOut(()=>{
							text.empty().append(points[that.index()].content);
							});
							text.fadeIn();
						}
						//showing story container if hidden
						if ($('.story.container').css('opacity') === '0') {
							text.empty().append(points[that.index()].content);
							text.show();
							$('.story.container').animate({opacity: 1}, 500);
						}
					});
				}
			}
		},
		//Activation of part for chosen master-point
		partActivate(index) {
			timeline.proceeding = true;
			function partLoader(){
				activePart = timeline._parts[index];
				activePart.flexGrow = 1;
				timeline._activePart = activePart;
				timeline.points.load(timeline.points.init);
			}
			let activePart = timeline._activePart;
			//when any part is already activated
			if(activePart) {
				// when already activated part is same as chosen one
				if(activePart === timeline._parts[index]){
					activePart.flexGrow = 0;
					timeline.points.clear(()=>{timeline.proceeding = false;});
					timeline._activePart = undefined;
				}
				else {
					//when part is not the same
					activePart.flexGrow = 0;
					timeline.points.clear(partLoader);
				}	
			}
			else {
				//when none part is activated yet
				partLoader();
			}
			
			
			
		},
		//array for master-points
		_masterPoints: [],
		//
		masterPointsInit() {
			let items = $('.master-point');
			for(let q = 0; q<items.length; q++) {
				timeline._masterPoints.push(items.eq(q));
			}
			
			items.click((e)=>{
				if(!timeline.proceeding){
					let that = $(e.currentTarget);
					timeline.partActivate(that.index()/2);
				}
			});
			//hiding dates on first click
			function hideDates() {
				let dates = $('.dates');
				dates.fadeOut('slow', ()=>{dates.remove();});
				items.unbind('click', hideDates);
			}
			items.click(hideDates);
			
		}
	};
	timeline.partsInit();
	timeline.masterPointsInit();
	
});