import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private httpCliente: HttpClient) { }

   findAllCitys(){
    const result = this.httpCliente.get('assets/geoData/geojs-31-mun.json');
    return result;
  }
}
