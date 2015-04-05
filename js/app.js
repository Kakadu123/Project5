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

						var infowindow = new google.maps.InfoWindow({
							content : htmlWiki,
							maxWidth : 300
						});

						infowindow.open(map, marker);
						clearTimeout(wikiRequestTimeout);
					}
				});
			});
		}
	};

	view.init();

	var viewModel = function() {

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
			name : "Mlynica",
			lat : 49.101184,
			long : 20.312114,
			heading : 90.78,
			pitch : +22.9
		}, {
			name : "Poprad",
			lat : 49.055194,
			long : 20.303424,
			heading : 280,
			pitch : -0.75

		}, {
			name : "Zakopane",
			lat : 49.292134,
			long : 19.958986,
			heading : 230.78,
			pitch : +10.9
		}];

		this.query = ko.observable('');

		/*
		 function clearOverlays() {
		 for (var i = 0; i < this.points.length; i++) {
		 this.points.setMap(null);
		 }
		 this.points.length = 0;
		 };

		 */

		this.pointsList = ko.dependentObservable(function() {
			search = this.query().toLowerCase();

			/*
			 for (var i = 0; i < this.points.length; i++) {
			 this.points.setMap(null);
			 }
			 this.points.length = 0;
			 */

			return ko.utils.arrayFilter(this.pointsSource, function(point) {
				return point.name.toLowerCase().indexOf(search) >= 0;
			});

		}, this);

		//		console.log(this.pointsList().length);

		this.points = ko.observableArray();

		for (var i = 0; i < this.pointsSource.length; i++) {
			this.points.push(new view.point(this.pointsSource[i].name, this.pointsSource[i].lat, this.pointsSource[i].long, this.pointsSource[i].heading, this.pointsSource[i].pitch));
		};

		/*
		 new view.point("Hybe", 49.0724292, 19.8538407),
		 new view.point("Zuberec", 49.2337907, 19.6701133 )
		 */
	};

	ko.applyBindings(new viewModel());

}
)();

