import { LightningElement, api, track } from 'lwc';
import {
    getIncidents,
    updateIncident
} from 'common/utils';

export default class Home extends LightningElement {
    @track incidents = [];
    @track groupedData = {};

    @api isMapLoaded = false;
    @api
    loadMap() {
        const mapElem = this.template.querySelector('common-map');
        mapElem.loadMap();
        mapElem.isMapLoaded = true;
        mapElem.addTraficLayer();
    }

    get incidentsLabel() {
        const len = this.incidents.length;
        if(len) {
            return `Total Incidents (${len})`;
        }
        return `No Incidents Reported`;
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

    categorizeData() {
        this.incidents.forEach(incident => {
            const count = this.groupedData[incident.type];
            this.groupedData[incident.type] = count ? count + 1 : 1
        });
        console.log(this.groupedData.potholes);
    }

    reloadIncidents() {
        this.incidents = getIncidents();
        this.categorizeData();
    }
}