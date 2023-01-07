import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeolocationService } from '@communere/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { ShareLocationComponent } from './components/share-location/share-location.component';
import { ILocation } from './models';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  constructor(
    private geolocationService: GeolocationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  public ngAfterViewInit(): void {
    this.initMap();
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [35.7219, 51.3347],
      zoom: 15
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    this.geolocationService.getCurrentPosition()
    .subscribe((position: any) => {
      this.map.flyTo([position.latitude, position.longitude], 13);
      const marker = L.marker([position.latitude, position.longitude]);
      marker.addTo(this.map);
    });

    tiles.addTo(this.map);

  }

  openShareLocation() {
    const config: MatDialogConfig = {
      width : '30%',
      maxHeight: '90vh',
    }
    const dialogRef = this.dialog.open(ShareLocationComponent,config)

    dialogRef.afterClosed().subscribe(
      (data:ILocation)=>{
        const marker = L.marker([data.position.lat, data.position.lng]).bindPopup('ddd');
        marker.addTo(this.map);
      }
    )
  }




}
