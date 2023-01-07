import { AfterViewInit, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILocation } from '../../models';
import * as L from 'leaflet';
import { GeolocationService } from '@communere/core';
@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.css']
})
export class ShareLocationComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  private map!: L.Map;
  curentLoc = { lat: 35.7219, lng: 51.3347 };// Tehran
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ILocation,
    private dialogRef: MatDialogRef<ShareLocationComponent>,
    private fb: FormBuilder,
    private geolocationService: GeolocationService,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    if (this.data) {
      this.createForm(this.data);
    } else {
      this.createForm();
    }
  }

  createForm(item?: ILocation) {
    this.form = this.fb.group({
      name: [item ? item.name : null, []],
      position: [item ? item.position : this.curentLoc, []],
      type: [item ? item.type : 'Busines', []],
      logo: [item ? item.logo : null, []],
    });
    this.logForm();
  }

  logForm() {
    this.form.valueChanges.subscribe(data => {
      console.log('form: ', this.form.value);

    })
  }

  private initMap(): void {
    const { position } = this.form.value;
    this.map = L.map('map2', {
      center: [35.7219, 51.3347],
      zoom: 15
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const marker = L.marker([position.lat, position.lng], {
      draggable: true,
    });
    marker.on('dragend', (e) => {
      this.form.get('position')?.setValue(e.target._latlng)
    })
    marker.addTo(this.map);


    tiles.addTo(this.map);


    this.geolocationService.getCurrentPosition()
      .subscribe((position: any) => {
        this.curentLoc = position;
      });
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
