import * as L from 'leaflet';
import { Injectable } from '@angular/core';
import { StorageService } from '@communere/core';
import { ILocation } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class MapService {
  findUrl='https://nominatim.openstreetmap.org/';
  constructor(
    private storageService:StorageService,
    private http: HttpClient
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

  search(address:string):Observable<any>{
    return this.http.get(`${this.findUrl}/search/${address}?format=json`)
  }

  reverce(lat:number|undefined,lng:number|undefined):Observable<any>{
    return this.http.get(`${this.findUrl}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
  }


}
