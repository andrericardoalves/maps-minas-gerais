import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsComponent } from './maps.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapsService } from './maps.service';
import { HttpClientModule } from '@angular/common/http';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;
  let de: DebugElement

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ LeafletModule, HttpClientModule ], 
      declarations: [ MapsComponent ],
      providers: [ MapsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
