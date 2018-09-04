/*
  Image copyright - Ivaylo Yovchev Photography ( http://ivayloyovchev.com/ )

*/

var $window = $(window);
var $holder = $("#slides-holder");
var $slides = $holder.find(".slide");

$slides.each(function(index, element) {
	$(element).css("z-index", 100 + index).after($("<div />", {
		class: "slide-fake-height"
	}));
});

var $fakeHeights = $slides.next(".slide-fake-height");
var $toReize = $holder.add($slides).add($fakeHeights);
var scrollFixer = 3;

$window.on("resize", onResize).resize();

$window.on("scroll", function(event) {
	( !! window.requestAnimationFrame) ? requestAnimationFrame(onScroll) : onScroll();
});

function onResize(event) {
	$toReize.css({
		height: $window.innerHeight() + "px"
	});
	onScroll();
}

function onScroll(event) {
	
  var scrollTop = Math.abs($window.scrollTop()) + scrollFixer;
	
  $slides.each(function(index, element) {
		
		var $slide = $(element);
		var $fakeHeight = $slide.next(".slide-fake-height");
		
		//This can be optimised a lot, but this is just a demo effect
		var slideTop = $slide.hasClass("fixed") ? $fakeHeight.offset().top : $slide.offset().top;
		if (slideTop < scrollTop ) {
			$slide.addClass("fixed");
			$fakeHeight.addClass("visible");
		} else {
			$slide.removeClass("fixed");
			$fakeHeight.removeClass("visible");
		}
	});
}
function myMap() {
  var mapCanvas = document.getElementById("map");
  var myCenter = new google.maps.LatLng(51.508742,-0.120850); 
  var mapOptions = {center: myCenter, zoom: 5};
  var map = new google.maps.Map(mapCanvas,mapOptions);
  var marker = new google.maps.Marker({
    position: myCenter,
    animation: google.maps.Animation.BOUNCE
  });
  marker.setMap(map);
}