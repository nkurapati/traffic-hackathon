import { LightningElement, api, track } from 'lwc';
import {
    getIncidents,
    updateIncident
} from 'common/utils';

export default class Home extends LightningElement {
    @track incidents = [];

    @api isMapLoaded = false;
    @api
    loadMap() {
        const mapElem = this.template.querySelector('common-map');
        mapElem.loadMap();
        mapElem.isMapLoaded = true;
        const start = new google.maps.LatLng(17.424777, 78.378683);
        const end = new google.maps.LatLng(17.498784, 78.417122);
        const request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        mapElem.addRoute(request);
    }

    connectedCallback() {
        this.reloadIncidents();
    }

    renderedCallback() {
        if(this.isMapLoaded) {
            this.loadMap();
        }
    }

    handleSave(e) {
        const { detail:incident } = e;
        updateIncident(incident);
        this.reloadIncidents();
    }

    reloadIncidents() {
        this.incidents = getIncidents();
    }
}