
class Map {
    lat = 47.2186371;
    long = -1.5541362;
    zoom = 15;
    mapView = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    constructor() {
        this.initMap();
        this.initIcon();
    }

    // Méthode d'init de la map
    initMap() {
        this.map = L.map('mapid').setView([this.lat, this.long], this.zoom);
        L.tileLayer(this.mapView, {
            maxZoom : 20
        }).addTo(this.map);
    }

    initIcon() {
        var LeafIcon = L.Icon.extend({ 
            options: {
              shadowUrl: '../images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            }
          });
          
        var redIcon = new LeafIcon ({ iconUrl: '../images/marker-icon-2x-red.png' });
        var greenIcon = new LeafIcon ({ iconUrl: '../images/marker-icon-2x-green.png' });
        var yellowIcon = new LeafIcon ({ iconUrl: '../images/marker-icon-2x-yellow.png' })

        //todo get station
        $.getJSON( "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=fd14c3039a14217b91a0cde0113b12bb97825129", function( data ) {
	        var stations = [];
            var canvas = document.getElementById("canvas");

            $.each( data, function (key, station) {
            stations.push( station ); 

                // insère les icons sur la map
                if (station.available_bikes > 3) {
                    var icon = greenIcon;
                } else if (station.available_bikes > 0) {
                    var icon = yellowIcon;
                } else {
                    var icon = redIcon;
                }
                var marker = L.marker([station.position.lat, station.position.lng], {icon: icon})
                    .bindPopup(station.address)
                    .openPopup()
                    .addTo(this.map) 

                    marker.on("click", function(e) {
                        document.getElementById("stationInfo").style.display = "block"; 
                        document.getElementById("canvasBlock").style.display = "none";
                        document.getElementById("btnResa").disabled = !(station.available_bikes > 0) // si des vélo sont dispo
                        document.getElementById("btnSign").disabled = true;
                   
                        // Affiche les différentes infos de la station select. dans le cadre à droite.
                        document.getElementById("stationAdress").innerHTML = station.address; 
                        document.getElementById("avlBikes").innerHTML = station.available_bikes;
                        document.getElementById("anchors").innerHTML = station.bike_stands;
                   
                        // On insère le nom de la station dans le timer en footer en bas
                        document.getElementById("stationName").innerHTML = station.name;
                    })
            }.bind(this))
        console.log(stations);
            
        }.bind(this)); // fin de getJSON
        
    } // fin de function initIcon


} // fin de class Map

map = new Map()