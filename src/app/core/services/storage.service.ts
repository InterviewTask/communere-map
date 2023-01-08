import { Injectable } from '@angular/core';

import { ILocation } from 'src/app/pages/map/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key = 'points';
  constructor() { }

  getItem() {
    const points = localStorage.getItem(this.key) || '[]';
    return JSON.parse(points);
  }

  setItem(item: ILocation) {
    const points = this.getItem() as any[];
    points.push(item);
    localStorage.setItem(this.key, JSON.stringify(points));
  }

  removeItem(item: ILocation) {
    let points = this.getItem() as any[];
    localStorage.removeItem(this.key);
    points = points.filter(marker =>
      marker.position.lat !== item.position.lat &&
      marker.position.lng !== item.position.lng);
    localStorage.setItem(this.key, JSON.stringify(points));
  }
}
