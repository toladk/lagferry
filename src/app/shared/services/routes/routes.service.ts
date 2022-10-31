import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient) { }

  getAllRoutes():Observable<any>{
    return this.http.get<any>(environment.apiUrl + 'route/api/v1')
    .pipe(map(res => res.data));;
  }
}
