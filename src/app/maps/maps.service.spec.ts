import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MapsModule } from './maps.module';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
     imports: [ HttpClientModule , MapsModule ]
  }));

  it('should be created', () => {
    const service: MapsService = TestBed.get(MapsService);
    expect(service).toBeTruthy();
  });

});
