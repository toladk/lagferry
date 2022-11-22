import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Boats } from '../../models/interfaces/boats.interface';

@Injectable({
  providedIn: 'root'
})
export class BoatsService {

  vesselIdSend!: number;
  cameraIdSend!: number;

  constructor(
    private http: HttpClient
    ) {}

  getBoats(){
    return this.http.get<Boats[]>(environment.apiUrl + 'vessel/api/v1');
  }

  getSingleBoat(vesselId: number){
    this.vesselIdSend = vesselId;
    return this.http.get(environment.apiUrl + `vessel/api/v1/${vesselId}`);
  }

  getBoatIdSend(){
    return this.vesselIdSend;
  }

  createBoat(payload: Boats) {
    return this.http.post(environment.apiUrl + 'vessel/api/v1', payload);
  }

  updateBoat(payload: Boats, vesselId: number){
    return this.http.put(environment.apiUrl + `vessel/api/v1/${vesselId}`, payload);
  }

  uploadBoatPicture(payload: any, vesselId: number){
    return this.http.put(environment.apiUrl + `vessel/api/v1/${vesselId}/image`, payload);
  }

  activateBoat(boatId: number) {
    return this.http.put(environment.apiUrl + `user/api/v1/${boatId}/activate`, {});
  }

  deactivateBoat(boatId: number) {
    return this.http.put(environment.apiUrl + `user/api/v1/${boatId}/deactivate`, {});
  }

  getAllCrewMember(){
    return this.http.get(environment.apiUrl + 'crew-member/api/v1');
  }

  addCrewMemberToVessel(payload: any, crewMemberId: number, vesselId: number){
    return this.http.put(environment.apiUrl + `crew-member/api/v1/${crewMemberId}/vessel/${vesselId}`, payload);
  }

  addTracker(payload: any) {
    return this.http.post(environment.apiUrl + 'tracker/api/v1', payload);
  }

  deleteTracker(trackerId: number){
    return this.http.delete(environment.apiUrl + `tracker/api/v1/${trackerId}`);
  }

  getAllCamera(){
    return this.http.get(environment.apiUrl + 'camera/api/v1');
  }

  addCameraToBoat(payload: any){
    return this.http.post(environment.apiUrl + 'camera/api/v1', payload);
  }

  getCameraById(id: number){
    this.cameraIdSend = id;
  }

  getCameraIdSend(){
    return this.cameraIdSend;
  }

  assignCameraToAnotherVessel(cameraId: number, vesselId: number){
    return this.http.put(environment.apiUrl + `camera/api/v1/${cameraId}/vessel/${vesselId}`, {});
  }


}
