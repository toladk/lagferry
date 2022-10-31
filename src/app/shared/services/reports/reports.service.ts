import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor( private http: HttpClient) { }

  getReports():Observable<any>{
    return this.http.get<any>(environment.apiUrl + 'report/api/v1')
    .pipe(map(res => res.data));
  }
}
