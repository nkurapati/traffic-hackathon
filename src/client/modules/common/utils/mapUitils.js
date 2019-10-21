import { type } from "os";

function mapAvailable() {
    return google && google.maps;
}
export function initMap(element, zoom) {
    return new google.maps.Map(element, {
        zoom: zoom,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
    });
}

export function getInfoWindow() {
    return  mapAvailable && new google.maps.InfoWindow;
}

export function showCurrentLocation(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            setMapCenter(map, pos);
            addMarker(pos, map, icon);
        }, function() {
            handleLocationError(true, map, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map, map.getCenter());
    }
}

export function setMapCenter(map, pos) {
    map.setCenter(pos);
}

export function addMarker(pos, map, icon) {
    new google.maps.Marker({icon: icon, position: pos, map: map});
    map.panTo(pos);
}

export function addInfoWindow(pos, map, content) {
    const infoWindow = getInfoWindow();
    if(infoWindow) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(content);
        infoWindow.open(map);
    }

    return infoWindow;

}

function handleLocationError(browserHasGeolocation, map, pos) {
    const content = browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.';
    addInfoWindow(pos, map, content)
}

export function addTrafficLayer(map) {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}
export function addTransitLayer(map) {
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
}

export function calcRoute(map, request, callback ) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        }
        else {
            if(typeof callback === "function") {
                callback('error');
            }
        }
    });
}