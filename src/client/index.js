import '@lwc/synthetic-shadow';
import { buildCustomElementConstructor } from 'lwc';
import MyApp from 'traffic_hackathon/app';

customElements.define('traffic-hackthon', buildCustomElementConstructor(MyApp));
