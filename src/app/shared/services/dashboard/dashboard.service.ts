import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  titleManagement!: string;

  constructor(private http: HttpClient) {}

  getTitle() {
    return this.titleManagement;
  }

  // GET
  getAllTerminal() {
    return this.http.get<any[]>(environment.apiUrl + 'terminal/api/v1');
  }

  getTerminalById(id: any){
    return this.http.get<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${id}`);
  }

  getPieChatInfo(value: string){
    return this.http.get<any[]>(environment.apiUrl + `dashboard/api/v1/report-summary?duration=${value}`);
  }

  getBarChatInfo(month: number){
    return this.http.get<any[]>(environment.apiUrl + `dashboard/api/v1/incident-summary?month=${month}`);
  }

  getSummary(value: string){
    return this.http.get<any[]>(environment.apiUrl + `dashboard/api/v1/summary?duration=${value}`);
  }

}

