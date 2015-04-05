function initialize() {

	var mapDiv = document.getElementById("googleMap");
	var mapProp = {
		center : new google.maps.LatLng(49.055068, 20.296418),
		zoom : 10,
		mapTypeId : google.maps.MapTypeId.HYBRID
	};
	var map = new google.maps.Map(mapDiv, mapProp);

	var places = [['Poprad', 49.0587799, 20.29744795], ['Mlynica', 49.1043459, 20.3032228], ['Tatry', 49.17, 20.13]];

	for (var i = 0; i < places.length; i++) {
		var myLatLng = new google.maps.LatLng(places[i][1], places[i][2]);
		var marker = new google.maps.Marker({
			position : myLatLng,
			map : map,
			title : places[i][0]
		});
	}

	 var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';


	var infowindow = new google.maps.InfoWindow({
		content : contentString
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});

}

google.maps.event.addDomListener(window, 'load', initialize);

