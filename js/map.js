/** Map */
// Map Globals
(function() {
    $('#location_map').css('height', $(window).height());
})();
var map, places, bounds, mainCircle;
var markers = [];
var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green.png';
var circleRadius = ($(window).width() > 500 ? 1800 : 2400);
var infowindow = new google.maps.InfoWindow({});
var lat = 19.097733;
var lng = 72.919710;
var latLng = new google.maps.LatLng(lat, lng);
var locationPath = "img/locationmarkers/";
var mapStyle = [{
    "stylers": [{
        "saturation": -100
    }]
}];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var polylineOptionsActual = new google.maps.Polyline({
    strokeColor: '#191919',
    strokeOpacity: 1.0,
    strokeWeight: 2
});


function init_map() {    
    directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual});
    var myOptions = {
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,        
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_TOP
        },
        zoom: ($(window).width() > 500 ? 14 : 13),
        scrollwheel: false,
        center: latLng,
        styles: mapStyle,
        draggable: ($(window).width() > 500 ? true : false),
        disableDoubleClickZoom: ($(window).width() > 500 ? false : true)
    };
    map = new google.maps.Map(document.getElementById("location_map"), myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: latLng,
        icon: 'img/marker.png'
    });

    drawCircle();
    directionsDisplay.setMap(map);
    setPlaces();
}
google.maps.event.addDomListener(window, 'load', init_map);


function drawCircle() {
    var populationOptions = {
        strokeColor: '#FF7800',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF7800',
        fillOpacity: 0.1,
        map: map,
        center: latLng,
        radius: circleRadius
    };
    // Add the circle for this city to the map.
    mainCircle = new google.maps.Circle(populationOptions);
}

function setPlaces() {
    places = new google.maps.places.PlacesService(map);
    getNearbyPlaces('bus');
}

function getNearbyPlaces(types) {
    var searchTypes = [];
    if (types != '' && types != null && types != 'undefined') {
        if (types == 'bus') {
            searchTypes = ['bus_station'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "bus.png" : locationPath + "small/bus.png");
        } else if (types == 'train') {
            searchTypes = ['train_station'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "train.png" : locationPath + "small/train.png");
        } else if (types == 'airport') {
            searchTypes = ['airport'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "airport.png" : locationPath + "small/airport.png");
        } else if (types == 'atm') {
            searchTypes = ['atm'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "bank.png" : locationPath + "small/bank.png");
        } else if (types == 'hospital') {
            searchTypes = ['hospital'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "hospital.png" : locationPath + "small/hospital.png");
        } else if (types == 'school') {
            searchTypes = ['school'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "school.png" : locationPath + "small/school.png");
        } else if (types == 'park') {
            searchTypes = ['park'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "park.png" : locationPath + "small/park.png");
        } else if (types == 'restaurant') {
            searchTypes = [
                'bar',
                'meal_delivery',
                'meal_takeaway',
                'cafe',
                'restaurant',
                'food'
            ];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "restaurants.png" : locationPath + "small/restaurants.png");
        } else if (types == 'theater') {
            searchTypes = ['movie_theater'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "theatre.png" : locationPath + "small/theatre.png");
        } else if (types == 'night_club') {
            searchTypes = ['night_club'];
            MARKER_PATH = ($(window).width() > 500 ? locationPath + "night-club.png" : locationPath + "small/night-club.png");
        } else {
            alert('Error!!');
            return;
        }

        var search = {
            location: latLng,
            radius: circleRadius - 500,
            types: searchTypes
        };

        places.nearbySearch(search, function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                mapLength = results.length;
                for (var i = 0; i < results.length; i++) {
                    var markerIcon = MARKER_PATH;

                    markers[i] = new google.maps.Marker({
                        position: results[i].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: markerIcon
                    });

                    markers[i].placeResult = results[i];
                    setTimeout(dropMarker(i), i * 100);
                    generateInfoMarkers(results[i], i);
                }
            } else {
                clearMarkers();
            }
        });
    }
}

function generateInfoMarkers(result, i) {
    var endLatLng = result.geometry.location;
    var service = new google.maps.DistanceMatrixService();
    var distance = '';
    var duration = '';
    var startLatLng = new google.maps.LatLng(lat, lng);
    service.getDistanceMatrix({
        origins: [startLatLng],
        destinations: [endLatLng],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            distance = response.rows[0].elements[0].distance.text;
            duration = response.rows[0].elements[0].duration.text;
            var name = '<div class="infoWindowContent"><h2 class="mapTitle">' + result.name + '</h2><p>Distance : ' + distance + '</p><p>Timing : ' + duration + '</p></div>';
            var infowindow = new google.maps.InfoWindow({});

            google.maps.event.addListener(markers[i], 'mouseover', function() {
                //open the infowindow when it's not open yet
                if (name != infowindow.getContent()) {
                    infowindow.setContent(name);
                    infowindow.open(map, markers[i]);
                    calcRoute(startLatLng, endLatLng);                    
                }
            });

            google.maps.event.addListener(markers[i], 'mouseout', function() {
                //when the infowindow is open, close it an clear the contents
                if(name==infowindow.getContent())
                {
                    infowindow.close(map,markers[i]);
                    if(directionsDisplay != null)
                    {
                        directionsDisplay.setMap(null);
                        directionsDisplay = null;
                        directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual});
                        directionsDisplay.setMap(map);
                    }
                    infowindow.setContent('');

                }
                //otherwise trigger mouseover to open the infowindow
                else
                {
                    google.maps.event.trigger(markers[i], 'mouseover');
                }
            });

            //clear the contents of the infwindow on closeclick
            google.maps.event.addListener(infowindow, 'closeclick', function() {
                infowindow.setContent('');
            });

        } else {
            alert("Unable to find the distance via road.");
        }
    });
}

function calcRoute(startLatLng, endLatLng) {
    if (startLatLng == "" && endLatLng == "") {
        alert('Error');
        return;
    }

    var request = {
        origin: startLatLng,        
        destination: endLatLng,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setOptions({ preserveViewport: true, suppressMarkers: true });
            directionsDisplay.setDirections(response);
        }
    });    

}

function isInfoWindowOpen(infoWindow) {
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}



function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}
$('.neighbourhood').on('click', 'li', function() {
    getNearbyPlaces($(this).data('target'));
    $('.neighbourhood li').removeClass('selected');
    $(this).addClass('selected');
});
