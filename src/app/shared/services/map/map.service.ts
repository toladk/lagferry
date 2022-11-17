import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boats } from '../../models/interfaces/boats.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor( private http: HttpClient) { }

  fetchMapLayers(layer: string){
      let url: any;
      if (layer == 'terminal') {
        url = `${environment.apiUrl}terminal/api/v1/map`
      }
      return this.http.get<any>(url).pipe(map(res => res.data));
  }
}
