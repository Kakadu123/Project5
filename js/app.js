var NeighborhoodMap = (function() {

	var view = {
		map : null,

		// initialization of google maps
		init : function() {
			var mapDiv = document.getElementById("googleMap");
			var mapProp = {
				center : new google.maps.LatLng(49.225068, 20.136418),
				zoom : 10,
				mapTypeId : google.maps.MapTypeId.HYBRID
			};
			map = new google.maps.Map(mapDiv, mapProp);
		},

		// point render functionality
		point : function(name, lat, long, heading, pitch) {
			this.name = name;
			this.lat = ko.observable(lat);
			this.long = ko.observable(long);

			var marker = new google.maps.Marker({
				position : new google.maps.LatLng(lat, long),
				title : name,
				map : map
			});

			markersArray.push(marker);
			// marker click event
			google.maps.event.addListener(marker, 'click', function() {

				var wikiurl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exchars=500&titles=" + name;
				var htmlWiki = "<div id='content'><h3>" + name + "</h3>";
				htmlWiki += '<img class="photoimg" alt="Google Street View picture is currently not available" src="https://maps.googleapis.com/maps/api/streetview?size=150x150&location=' + lat + ',' + long + '&heading=' + heading + '&pitch=' + pitch + '"><span>';

				// wikipedia request error handling
				var wikiRequestTimeout = setTimeout(function() {
					htmlWiki += "Request of wikipedia resouces failed.</span></p></div>";
					var infowindow = new google.maps.InfoWindow({
						content : htmlWiki,
						maxWidth : 300
					});
					infowindow.open(map, marker);
				}, 3000);

				// jsonp ajax request to get Wikipedia extract
				$.ajax({
					url : wikiurl,
					dataType : "jsonp",
					success : function(response) {
						var obj = response.query.pages;
						for (var prop in obj) {
							htmlWiki += obj[prop].extract + "</span><p>Source: <a href='https://en.wikipedia.org/w/index.php?title=" + name + "'>wikipedia</a></p></div>";
						}

						// removing animation from non-selected items
						for (var i = 0; i < markersArray.length; i++) {
							markersArray[i].setAnimation(null);
						}

						// removing infowindow from non-active item
						if (!$.isEmptyObject(infoWindowElement)) {
							infoWindowElement.close();
						}

						// infowindow functionality
						var infowindow = new google.maps.InfoWindow({
							content : htmlWiki,
							maxWidth : 300
						});
						infowindow.open(map, marker);
						infoWindowElement = infowindow;

						// bounce effect lasting 4 seconds
						var tempMarker = marker;
						tempMarker.setAnimation(google.maps.Animation.BOUNCE);
						setTimeout(function() {
							tempMarker.setAnimation(null);
						}, 4000);

						// wikipedia error handling - clearing of timeout
						clearTimeout(wikiRequestTimeout);
					}
				});
			});
		}
	};

	var viewModel = function() {

		// source array of map point elements
		this.pointsSource = [{
			name : "Batizovce",
			lat : 49.068092,
			long : 20.190787,
			heading : 340.78,
			pitch : 10.9
		}, {
			name : "Gerlachov",
			lat : 49.097556,
			long : 20.207349,
			heading : 20.78,
			pitch : 21.9
		}, {
			name : "Haligovce",
			lat : 49.376291,
			long : 20.44889,
			heading : 20,
			pitch : 10
		}, {
			name : "Hybe",
			lat : 49.04469,
			long : 19.829603,
			heading : 135,
			pitch : 10
		}, {
			name : "Mengusovce",
			lat : 49.073884,
			long : 20.143327,
			heading : 200,
			pitch : 20
		}, {
			name : "Mlynica",
			lat : 49.101184,
			long : 20.312114,
			heading : 90.78,
			pitch : +22.9
		}, {
			name : "Pieniny",
			lat : 49.394274,
			long : 20.41164,
			heading : 10.78,
			pitch : +20.9
		}, {
			name : "Poprad",
			lat : 49.055194,
			long : 20.303424,
			heading : 280,
			pitch : -0.75
		}, {
			name : "Rysy",
			lat : 49.154415,
			long : 20.078588,
			heading : 120,
			pitch : 20
		}, {
			name : "Zakopane",
			lat : 49.292134,
			long : 19.958986,
			heading : 230.78,
			pitch : +10.9
		}, {
			name : "Zuberec",
			lat : 49.25851,
			long : 19.612763,
			heading : 20,
			pitch : 20
		}];

		// search input box variable
		this.query = ko.observable('');

		// filter functionality
		this.pointsList = ko.dependentObservable(function() {
			search = this.query().toLowerCase();

			// clearing all markers
			for (var i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray = [];

			// applying filtering
			var results = ko.utils.arrayFilter(this.pointsSource, function(point) {
				return point.name.toLowerCase().indexOf(search) >= 0;
			});

			// Looping through result set and setting markers
			results.forEach(function(item) {
				new view.point(item.name, item.lat, item.long, item.heading, item.pitch);
			});

			return results;
		}, this);

		// triggered by click event of left list section
		this.highlighPlace = function(item) {

			// animating markers
			for (var i = 0; i < markersArray.length; i++) {

				// removing animation from non-selected items
				markersArray[i].setAnimation(null);
				if (markersArray[i].title == item.name) {

					// centering the clicked location
					var panLocation = new google.maps.LatLng(item.lat, item.long);
					map.panTo(panLocation);

					// bounce effect for 4 seconds
					var tempMarker = markersArray[i];
					tempMarker.setAnimation(google.maps.Animation.BOUNCE);
					setTimeout(function() {
						tempMarker.setAnimation(null);
					}, 4000);
				}
			}
		};

	};

	// Initialization of view
	view.init();
	// markers kept in a global variable for clearing purposes as recommended by google
	// https://developers.google.com/maps/documentation/javascript/examples/marker-remove
	var markersArray = [];
	// last open InfoWindow element
	var infoWindowElement = null;
	// knockout binding
	ko.applyBindings(new viewModel());

}
)();

