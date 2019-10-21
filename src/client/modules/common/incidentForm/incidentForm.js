import { LightningElement, api, track } from 'lwc';
import { incidentTypes } from 'common/dataService';

export default class IncidentForm extends LightningElement {
    @api incident = {};
    @track changedValues = {};
    @api positionLeft = '50%';
    @api positionTop = '50%';

    get incidentTypes() {
        return incidentTypes;
    }

    getSizeType(value) {
        return ('' + value).indexOf('%') !== -1 ? '%' : 'px';

    }

    get computedStyles() {
        const { 
            getSizeType,
            positionTop,
            positionLeft
        } = this;
        return `
            top:${positionTop}${getSizeType(positionTop)};
            left:${positionLeft}${getSizeType(positionLeft)}
        `;
    }

    handleChange(e) {
        e.stopPropagation();
        const key = e.currentTarget.getAttribute('name');
        this.changedValues[key] = e.currentTarget.value;
    }

    handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        const cancelEvent = new CustomEvent('cancel', {
            detail: {
                ...this.incident
            },
            bubbles: true
        });
        this.dispatchEvent(cancelEvent);
    }

    handleSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const saveEvent = new CustomEvent('save', {
            detail: {
                ...this.incident,
                ...this.changedValues
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(saveEvent);
    }
    
}
