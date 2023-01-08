import { AfterViewInit, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILocation } from '../../models';
import * as L from 'leaflet';
import { GeolocationService } from '@communere/core';
import { MapService } from '../../services';
@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.css']
})
export class ShareLocationComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  private map!: L.Map;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      defaultPosition: any,
      feed: ILocation
    },
    private dialogRef: MatDialogRef<ShareLocationComponent>,
    private fb: FormBuilder,
    private mapService: MapService,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    if (this.data.feed) {
      this.createForm(this.data.feed);
    } else {
      this.createForm();
    }
  }

  createForm(item?: ILocation) {
    this.form = this.fb.group({
      name: [item ? item.name : null, []],
      position: [item ? item.position : this.data.defaultPosition, []],
      type: [item ? item.type : 'Busines', []],
      logo: [item ? item.logo : null, []],
    });
  }

  private initMap(): void {
    const { position } = this.form.value;
    this.map = this.mapService.createMap('map2',this.data.defaultPosition);

    const marker = L.marker(position, {
      draggable: true,
    });
    marker.on('dragend', (e) => {
      this.form.get('position')?.setValue(e.target._latlng)
    })
    marker.addTo(this.map);

  }

  get logo () {
    return this.form.get('logo')?.value
  }

  deleteLogo() {
    this.form.get('logo')?.setValue(null);
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.form.get('logo')?.setValue(reader.result);
    });

    reader.readAsDataURL(file);
  }

  save(){
    this.dialogRef.close(this.form.value);
  }


}
