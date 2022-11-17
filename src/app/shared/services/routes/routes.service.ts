import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  routeId!: number

  constructor(private http: HttpClient) { }

  getAllRoutes():Observable<any>{
    return this.http.get<any>(environment.apiUrl + 'route/api/v1')
    .pipe(map(res => res.data));;
  }

  getRouteById(id: number){
    return this.http.get(environment.apiUrl + `route/api/v1/${id}`);
  }

  addRoute(payload:any){
    return this.http.post(environment.apiUrl + `route/api/v1`, payload);
  }

  updateRoute(payload:any){
    return this.http.put(environment.apiUrl + `route/api/v1/${this.routeId}`, payload);
  }

  activateRoute(id: number){
    return this.http.put(environment.apiUrl + `route/api/v1/${id}/activate`, {});
  }

  deactivateRoute(id: number){
    return this.http.put(environment.apiUrl + `route/api/v1/${id}/deactivate`, {});
  }

  returnRouteId(){
    return this.routeId;
  }

}
