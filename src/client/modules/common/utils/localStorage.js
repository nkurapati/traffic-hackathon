export function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
}

export function getIncidents() {
    const { incidents } = getData('incidents');
    return  incidents || [];
}

export function updateIncidents(values) {
    const incidents = Array.isArray(values)?values:[]
    setData('incidents', {incidents});
}

export function updateIncident(incident) {
    let incidents = getIncidents();
    let itemFound = false;
    incidents = incidents.map(item => {
        if(incident.id === item.id) {
            itemFound = true;
            return {
                ...item,
                ...incident
            };
        }
        return item;
    })
    if(!itemFound) {
        incidents.push(incident);
    }
    updateIncidents(incidents);
}