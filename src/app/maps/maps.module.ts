import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [ 
    MapsComponent
  ],
  imports: [
    CommonModule,
    LeafletModule
  ],
  exports:
  [
    MapsComponent
  ]
})
export class MapsModule { }
