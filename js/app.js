function initialize() {

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
					maxWidth: 300
				});

				infowindow.open(map, marker);
			}
		});

	});

}

google.maps.event.addDomListener(window, 'load', initialize);

