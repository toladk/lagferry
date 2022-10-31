import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Boats } from '../../models/interfaces/boats.interface';

@Injectable({
  providedIn: 'root'
})
export class BoatsService {

  constructor(private http: HttpClient) {}

  getBoats(){
    return this.http.get<Boats[]>(environment.apiUrl + 'vessel/api/v1');
  }

  getSingleBoat(vesselId: number){
    return this.http.get(environment.apiUrl + `vessel/api/v1/${vesselId}`);
  }

  createBoat(payload: Boats) {
    return this.http.post(environment.apiUrl + 'vessel/api/v1', payload);
  }

  activateBoat(boatId: number) {
    return this.http.put(environment.apiUrl + `user/api/v1/${boatId}/activate`, {});
  }

  deactivateBoat(boatId: number) {
    return this.http.put(environment.apiUrl + `user/api/v1/${boatId}/deactivate`, {});
  }


}
