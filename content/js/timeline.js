// JavaScript Document
$(function(){
	"use strict";
	
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
	
	let timeline = {
		proceeding : false,
		_parts: [],
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
				//console.log(parts.eq(0).children().eq(0).find('year').text());
				
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
				//console.log(timeline._parts);
			});
		},
		
		_activePart: undefined,
		points: {
			load(callback) {
				let element = timeline._activePart.element;
				let points = timeline._activePart.points;
				for(let q = 0; q < points.length; q++){
					element.append(points[q].element);
				}
				element.children().fadeIn('fast').promise().done(callback);
				timeline.proceeding = false;
			},
			clear(callback) {
				let element = timeline._activePart.element;
				//$('.point').fadeOut('fast');
				element.children().fadeOut().promise().done(()=>{
					element.children().remove();
					$('.story.container').animate({opacity: 0}, 500, ()=>{$('.story.text').empty().promise().done(callback);});
				});
			},
			init() {
				if(timeline._activePart) {
					let element = timeline._activePart.element;
					let points = timeline._activePart.points;
					element.children().click(function() {
						//console.log($(this).index());
						let that = $(this);
						let text = $('.story.text');
						console.log(timeline._activePart);
						if($.trim(text.html())){
							text.fadeOut(()=>{
							text.empty().append(points[that.index()].content);
							});
							text.fadeIn();
						}

						if ($('.story.container').css('opacity') === '0') {
							text.empty().append(points[that.index()].content);
							text.show();
							$('.story.container').animate({opacity: 1}, 500);
						}
					});
				}
			}
		},
		partActivate(index) {
			timeline.proceeding = true;
			function partLoader(){
				activePart = timeline._parts[index];
				activePart.flexGrow = 1;
				timeline._activePart = activePart;
				timeline.points.load(timeline.points.init);
				console.log('part loader');
			}
			let activePart = timeline._activePart;
			if(activePart) {
				if(activePart === timeline._parts[index]){
					activePart.flexGrow = 0;
					timeline.points.clear(()=>{timeline.proceeding = false;});
					timeline._activePart = undefined;
				}
				else {
					activePart.flexGrow = 0;
					timeline.points.clear(partLoader);
				}	
			}
			else {
				partLoader();
			}
			
			
			
		},
		
		_masterPoints: [],
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
	
	
	console.log('loaded');
	
});