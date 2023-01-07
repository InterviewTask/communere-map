import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { MapService } from './services/map.service';
import { ShareLocationComponent } from './components';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    MapComponent,
    ShareLocationComponent
  ],
  imports: [
    MapRoutingModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [MapService]
})
export class MapModule { }
