import { LightningElement, api, track } from 'lwc';
import {
    addInfoWindow,
    addTrafficLayer,
    addTransitLayer,
    addMarker,
    calcRoute,
    getMarkerIcon,
    initMap,
    showCurrentLocation,
} from 'common/utils';

let mapClickTrottle;

export default class Map extends LightningElement {
    map;
    @track _incidents = [];
    @api isMapLoaded = false;
    @api 
    get incidents() {
        return this._incidents;
    }
    set incidents(value) {
        this._incidents = Array.isArray(value) ? value.slice() : [];
    }

    @track showIncidentForm = false;
    @track incidentFormPositionLeft = 0;
    @track incidentFormPositionTop = 0;
    @track currentIncident = {};

    renderedCallback() {
        if(this.isMapLoaded) {
            this.loadMap();
            this.incidents.forEach(incident => {
                addMarker(
                    {
                        lat: incident.lat,
                        lng: incident.lng
                    },
                    this.map,
                    getMarkerIcon(incident.type)
                );
            })
        }
    }

    get computerClassNames() {
        return `map ${this.isMapLoaded ? 'map-loaded' : ''}`;
    }

    @api
    loadMap() {
        if(!this.map) {
            const mapElem = this.template.querySelector('div[map]');
            this.map = initMap(mapElem, 12);
        }
        showCurrentLocation(this.map);

        this.map.addListener('click', this.handleClick.bind(this));
    }

    @api
    addRoute(request, callback) {
        calcRoute(this.map, request, callback);
    }

    @api
    addTraficLayer() {
        addTrafficLayer(this.map);
    }

    @api
    addTransitLayer() {
        addTransitLayer(this.map);
    }

    handleClick(e) {
        if(mapClickTrottle) {
            clearTimeout(mapClickTrottle);
        }
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        mapClickTrottle = setTimeout(() => {
            const { latLng, pixel } = e;
            console.log(e);
            const pos = {
                id: Date.now(),
                lat: latLng.lat(),
                lng: latLng.lng()
            }
            this._incidents.push(pos);
            this.currentIncident = { ...pos };
            this.showIncidentForm = true;
            this.incidentFormPositionLeft = pixel.x - 142;
            this.incidentFormPositionTop = pixel.y + 8;

            const customEvent = new CustomEvent('mapclick', {
                detail: {
                    lat: latLng.lat(),
                    lng: latLng.lng()
                }
            });

            this.dispatchEvent(customEvent);
            clearTimeout(mapClickTrottle);
        }, 100);
    }

    handleSave() {
        this.showIncidentForm = false;
    }

    handleCancel(e) {
        const { id } = e.detail;
        this.showIncidentForm = false;
        this.removeIncident(id);
    }

    removeIncident(id) {
        const filteredIncidents = this.incidents.filter(incident => incident.id !== id);
        this.incidents = filteredIncidents.slice(0);
    }

    disconnectedCallback() {
        if(this.map) {
            this.map.removeListener('click', this.handleClick);
        }
    }
}

// const infoWindow = addInfoWindow(
//     {
//         lat: latLng.lat(),
//         lng: latLng.lng()
//     },
//     this.map,
//     IncidentHtml,
//     function() {
//         alert("close");
//     }
// );