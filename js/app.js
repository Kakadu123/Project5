var NeighborhoodMap = (function() {
	
	var view = {
		map : null,
		init : function() {
			var mapDiv = document.getElementById("googleMap");
			var mapProp = {
				center : new google.maps.LatLng(49.145068, 19.996418),
				zoom : 10,
				mapTypeId : google.maps.MapTypeId.HYBRID
			};
			map = new google.maps.Map(mapDiv, mapProp);
		},

		point : function(name, lat, long, heading, pitch) {
			this.name = name;
			this.lat = ko.observable(lat);
			this.long = ko.observable(long);

			var marker = new google.maps.Marker({
				position : new google.maps.LatLng(lat, long),
				title : name,
				map : map
			});

			google.maps.event.addListener(marker, 'click', function() {

				var wikiurl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exchars=500&titles=" + name;
				var htmlWiki = "<div id='content'><h3>" + name + "</h3>";		
				htmlWiki += '<img class="photoimg" src="https://maps.googleapis.com/maps/api/streetview?size=150x150&location=' +  lat + ',' +  long + '&heading=' +  heading + '&pitch=' + pitch +  '"><span>';


				$.ajax({
					url : wikiurl,
					dataType : "jsonp",
					success : function(response) {
						var obj = response.query.pages;
						for (var prop in obj) {
							htmlWiki += obj[prop].extract + "</span><p>Source: <a href='https://en.wikipedia.org/w/index.php?title=" + name + "'>wikipedia</a></p></div>";
						}

						var infowindow = new google.maps.InfoWindow({
							content : htmlWiki,
							maxWidth : 300
						});

						infowindow.open(map, marker);
					}
				});
			});
		}
	}; 

	view.init();

	var viewModel = {
		points : ko.observableArray([
			
			new view.point("Poprad", 49.055194, 20.303424, 280, -0.75),
			new view.point("Batizovce", 49.068092,20.190787, 340.78, 10.9 ),
			new view.point("Gerlachov", 49.097556, 20.207349, 20.78, 21.9 ),
			new view.point("Mlynica", 49.101184,20.312114, 90.78, +22.9),
			new view.point("Zakopane", 49.292134,19.958986, 230.78, +10.9 )
			
			/*		
						new view.point("Hybe", 49.0724292, 19.8538407),
						new view.point("Zuberec", 49.2337907, 19.6701133 )*/
			
		])
	};

	ko.applyBindings(viewModel);

	/*

	 var points = [{
	 name : "Poprad",
	 lat : 49.0587799,
	 long : 20.29744795
	 }, {
	 name : "Mlynica",
	 lat : 49.1043459,
	 long : 20.3032228
	 }, {
	 name : "Tatry",
	 lat : 49.17,
	 long : 20.13
	 }];

	 var viewModel = {
	 query : ko.observable(''),
	 };

	 viewModel.points = ko.dependentObservable(function() {
	 var search = this.query().toLowerCase();
	 return ko.utils.arrayFilter(points, function(point) {
	 return point.name.toLowerCase().indexOf(search) >= 0;
	 });
	 }, viewModel);

	 ko.applyBindings(viewModel);

	 var initialize = function() {

	 var mapDiv = document.getElementById("googleMap");
	 var mapProp = {
	 center : new google.maps.LatLng(49.055068, 20.296418),
	 zoom : 10,
	 mapTypeId : google.maps.MapTypeId.HYBRID
	 };
	 var map = new google.maps.Map(mapDiv, mapProp);

	 var places = [['Poprad', 49.0587799, 20.29744795], ['Mlynica', 49.1043459, 20.3032228], ['Tatry', 49.17, 20.13]];

	 // Hybe
	 // Vrbov
	 // Pieniny
	 // Rysy
	 // Tatry
	 // Zuberec

	 for (var i = 0; i < places.length; i++) {
	 var myLatLng = new google.maps.LatLng(places[i][1], places[i][2]);
	 var marker = new google.maps.Marker({
	 position : myLatLng,
	 map : map,
	 title : places[i][0]
	 });
	 }

	 google.maps.event.addListener(marker, 'click', function() {

	 city = "Poprad";

	 var wikiurl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exchars=500&titles=" + city;
	 var htmlWiki = "<div id='content'><h3>" + city + "</h3>";
	 htmlWiki += '<img class="photoimg" src="http://maps.googleapis.com/maps/api/streetview?size=150x150&location=' + city + '"><span>';

	 $.ajax({
	 url : wikiurl,
	 dataType : "jsonp",
	 success : function(response) {
	 var obj = response.query.pages;
	 for (var prop in obj) {
	 htmlWiki += obj[prop].extract + "</span><p>Source: <a href='https://en.wikipedia.org/w/index.php?title=" + city + "'>wikipedia</a></p></div>";
	 }

	 var infowindow = new google.maps.InfoWindow({
	 content : htmlWiki,
	 maxWidth : 300
	 });

	 infowindow.open(map, marker);
	 }
	 });

	 });
	 }
	 google.maps.event.addDomListener(window, 'load', initialize);*/

}
)();

