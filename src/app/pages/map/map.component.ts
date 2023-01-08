import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeolocationService } from '@communere/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { PopupComponent } from './components/popup/popup.component';
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
    private dialog: MatDialog,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
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
      width: '30%',
      maxHeight: '90vh',
    }
    const dialogRef = this.dialog.open(ShareLocationComponent, config)

    dialogRef.afterClosed().subscribe(
      (data: ILocation) => {

        let component = this.resolver.resolveComponentFactory(PopupComponent)
          .create(this.injector);
        component.setInput('data', data)
        component.changeDetectorRef.detectChanges();

        let marker = L.marker([data.position.lat, data.position.lng]).bindPopup(component.location.nativeElement);
        marker.addTo(this.map);

        component.instance.dataChange.subscribe((data: ILocation) => {
          this.map.removeLayer(marker);
          component.setInput('data', data)
          component.changeDetectorRef.detectChanges();
          marker = L.marker([data.position.lat, data.position.lng]).bindPopup(component.location.nativeElement);
          marker.addTo(this.map);
        })

      }
    )
  }




}
