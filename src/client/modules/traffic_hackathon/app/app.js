import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track isMapLoaded = false;
    connectedCallback() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        const mapLoadedInternval = window.setInterval(() => {
            if(window.isMapLoaded) {
                clearInterval(mapLoadedInternval);
                this.isMapLoaded = true;
                let childName = '';
                if(this.isAdmin) {
                    childName = 'admin-home';
                }

                if(this.isUser) {
                    childName = 'user-home';
                }
                if(childName) {
                    const userHomeElem = this.template.querySelector(childName);
                    userHomeElem.isMapLoaded = true;
                    userHomeElem.loadMap();
                }
            }
        }, 1000);
    }

    get isAdmin() {
        return window.location.hash.indexOf('admin') !== -1;
    }

    get isUser() {
        return window.location.hash.indexOf('user') !== -1;
    }
}
