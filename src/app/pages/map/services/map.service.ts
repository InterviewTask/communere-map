import { Injectable } from '@angular/core';
import { StorageService } from '@communere/core';
import * as L from 'leaflet';
import { ILocation } from '../models';
@Injectable()
export class MapService {

  constructor(
    private storageService:StorageService
  ) { }

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

  getSavedMarkers(){
    return  this.storageService.getItem() as ILocation[];
  }

  saveMarker(markerData:ILocation){
    this.storageService.setItem(markerData);
  }

  removeMarker(markerData?:ILocation){
    if(markerData){
      this.storageService.removeItem(markerData);
    }
  }


}
