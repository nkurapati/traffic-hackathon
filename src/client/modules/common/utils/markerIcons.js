export function getMarkerIcon(type) {
    switch(type) {
        case 'rb': 
            return 'http://maps.google.com/mapfiles/kml/pal3/icon39.png';
        case 'vb': 
            return 'http://maps.google.com/mapfiles/kml/pal3/icon34.png';
        case 'pothole': 
            return 'http://maps.google.com/mapfiles/kml/pal2/icon4.png';
        case 'wl': 
            return 'http://maps.google.com/mapfiles/kml/pal4/icon32.png';
        case 'acc': 
            return 'http://maps.google.com/mapfiles/kml/pal4/icon7.png';
        default: 
            return 'http://maps.google.com/mapfiles/kml/pal5/icon23.png';
    }

}