import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeolocationService } from '@communere/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { PopupComponent } from './components/popup/popup.component';
import { ShareLocationComponent } from './components/share-location/share-location.component';
import { ILocation } from './models';
import { MapService } from './services';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  inputValue = '';
  defaultPosition: any = [35.7219, 51.3347]; // Tehran
  constructor(
    private geolocationService: GeolocationService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
  }
  public ngAfterViewInit(): void {
    this.initMap();
    this.getSavedMarkers();

  }

  getSavedMarkers() {
    this.mapService.getSavedMarkers().forEach(markerData => {
      this.bindMarker(markerData);
    })
  }


  private initMap(): void {
    this.map = this.mapService.createMap('map', this.defaultPosition);
  }

  goToCurrentLocation() {
    this.geolocationService.getCurrentPosition()
      .subscribe((position: any) => {
        this.defaultPosition = [position.lat, position.lng];
        this.map.flyTo(this.defaultPosition, 13);
      });
  }

  openShareLocation() {
    const config: MatDialogConfig = {
      width: '30%',
      maxHeight: '90vh',
      data: {
        defaultPosition: this.defaultPosition,
        feed: null
      }

    }
    const dialogRef = this.dialog.open(ShareLocationComponent, config)

    dialogRef.afterClosed().subscribe(
      (data: ILocation) => {
        if (data) {
          this.mapService.saveMarker(data);
          this.bindMarker(data);
        }
      }
    )
  }

  bindMarker(data: ILocation) {
    let component = this.viewContainerRef.createComponent(PopupComponent)
    let marker = this.bindPopup(component, 'data', data);
    this.popupObserveChanges(component, marker);
  }

  bindPopup(component: ComponentRef<any>, componentInput: string, data: ILocation): any {
    component.setInput(componentInput, data)
    component.changeDetectorRef.detectChanges();
    let marker = L.marker([data.position.lat, data.position.lng])
      .bindPopup(component.location.nativeElement);
    marker.addTo(this.map);
    return marker;
  }

  popupObserveChanges(component: ComponentRef<any>, marker?: any) {

    component.instance.dataChange.subscribe((data: ILocation) => {
      if (data) {
        this.map.removeLayer(marker);
        marker = this.bindPopup(component, 'data', data);
      }
    });

    component.instance.onClose.subscribe((data: boolean) => {
      if (data) {
        marker.closePopup();
      }
    });

    component.instance.onRemove.subscribe((data: boolean) => {
      if (data) {
        this.map.removeLayer(marker);
      }
    });
  }

  goToAddress(){
    this.mapService.search(this.inputValue).subscribe(res=>{
      this.defaultPosition= [res[0].lat,res[0].lon];
      this.map.flyTo(this.defaultPosition, 13);
    })
  }

}
