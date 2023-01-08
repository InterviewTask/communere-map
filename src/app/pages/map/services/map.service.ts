import { Injectable } from '@angular/core';
import * as L from 'leaflet';
@Injectable()
export class MapService {

  constructor() { }

  createMap(element:string,defaultPosition:any) {
    let map = L.map(element, {
      center: defaultPosition,
      zoom: 15
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(map);
    return map;
  }
}
