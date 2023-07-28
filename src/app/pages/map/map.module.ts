import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { MapService } from './services/map.service';
import { ShareLocationComponent } from './components';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MapComponent,
    ShareLocationComponent,
    PopupComponent
  ],
  imports: [
    MapRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [MapService]
})
export class MapModule { }
