import { LatLng } from "leaflet";

export type locationType = 'Home' | 'Public' | 'Business';

export interface ILocation {
  name:string ;
  position: LatLng,
  type: locationType,
  logo?: string ;
}
