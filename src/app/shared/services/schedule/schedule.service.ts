import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  // GET
  getAllSchedules(){
    return this.http.get<any[]>(environment.apiUrl + 'schedule/api/v1');
  }

  getScheduleById(id:any){
    return this.http.get<any[]>(environment.apiUrl + 'schedule/api/v1/'+`${id}`);
  }

  // POST
  addSchedule(body:any){
    return this.http.post<any[]>(environment.apiUrl + 'schedule/api/v1/', body);
  }

  // PUT
  updateSchedule(id:any, body:any){
    return this.http.put<any[]>(environment.apiUrl + 'schedule/api/v1/'+`${id}`, body);
  }

  // DELETE
  deleteSchedule(id:any){
    return this.http.delete<any[]>(environment.apiUrl + 'schedule/api/v1/'+`${id}`);
  }
}
