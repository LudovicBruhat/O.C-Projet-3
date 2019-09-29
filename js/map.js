var map = L.map('mapid').setView([47.2186371, -1.5541362], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom : 20
}).addTo(map);

/* icon marker */
var redIcon = new L.Icon({
	iconUrl: '../images/marker-icon-2x-red.png',
	shadowUrl: '../images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: '../images/marker-icon-2x-green.png',
	shadowUrl: '../images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: '../images/marker-icon-2x-yellow.png',
	shadowUrl: '../images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

$.getJSON( "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=fd14c3039a14217b91a0cde0113b12bb97825129", function( data ) {
	var stations = [];
	var canvas = document.getElementById("canvas");

    $.each( data, function (key, station) {
    stations.push( station );
    if (station.available_bikes > 3) {
		var marker = L.marker([station.position.lat, station.position.lng], {icon: greenIcon}).bindPopup(station.address).openPopup().addTo(map);
		marker.on("click", function(e) {
			document.getElementById("stationInfo").style.display = "block"; // on fait réapparaître le bloc info en cas de changement de résa.
			document.getElementById("canvasBlock").style.display = "none";
			document.getElementById("btnResa").disabled = false;
			document.getElementById("btnSign").disabled = true;

			// Affiche les différentes infos de la station select. dans le cadre à droite.
			document.getElementById("stationAdress").innerHTML = station.address; 
			document.getElementById("avlBikes").innerHTML = station.available_bikes;
			document.getElementById("anchors").innerHTML = station.bike_stands;

			// On insère le nom de la station dans le timer en footer en bas
			document.getElementById("stationName").innerHTML = station.name;
		})
    } else if (station.available_bikes > 0) {
		var marker = L.marker([station.position.lat, station.position.lng], {icon: yellowIcon}).bindPopup(station.address).openPopup().addTo(map);
		marker.on("click", function(e) {
			document.getElementById("stationInfo").style.display = "block";
			document.getElementById("canvasBlock").style.display = "none";
			document.getElementById("btnResa").disabled = false;
			document.getElementById("btnSign").disabled = true;

			// Affiche les différentes infos de la station select. dans le cadre à droite.
			document.getElementById("stationAdress").innerHTML = station.address; // Affiche le nom de la station select. dans le cadre à droite.
			document.getElementById("avlBikes").innerHTML = station.available_bikes;
			document.getElementById("anchors").innerHTML = station.bike_stands;

			// On insère le nom de la station dans le timer en footer en bas
			document.getElementById("stationName").innerHTML = station.name;
		})
    } else {
		var marker = L.marker([station.position.lat, station.position.lng], {icon: redIcon}).bindPopup(station.address).openPopup().addTo(map)
		marker.on("click", function(e) {
			document.getElementById("stationInfo").style.display = "block";
			document.getElementById("canvasBlock").style.display = "none";
			document.getElementById("btnResa").disabled = true; // impossible de réserver une station lorsqu'aucun vélo n'est dispo.
			document.getElementById("btnSign").disabled = true;
			
			// Affiche les différentes infos de la station select. dans le cadre à droite.
			document.getElementById("stationAdress").innerHTML = station.address; // Affiche le nom de la station select. dans le cadre à droite.
			document.getElementById("avlBikes").innerHTML = station.available_bikes;
			document.getElementById("anchors").innerHTML = station.bike_stands;

			// On insère le nom de la station dans le timer en footer en bas
			document.getElementById("stationName").innerHTML = station.name;
		})
    }
  });
  console.log(stations)
  });


