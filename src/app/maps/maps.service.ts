import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private httpCliente: HttpClient) { }

   async findAllCitys(){
    const result = await this.httpCliente.get<any>('assets/geoData/geojs-31-mun.json').toPromise();
    return result;
  }
}
