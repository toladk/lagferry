import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http: HttpClient) {}

  // GET
  getAllTerminal() {
    return this.http.get<any[]>(environment.apiUrl + 'terminal/api/v1');
  }

  getTerminalById(id:any){
    return this.http.get<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${id}`);
  }

  // POST
  addTerminal(body:any){
    return this.http.post<any[]>(environment.apiUrl + 'terminal/api/v1/upload', body);
  }

  // PUT
  updateTerminal(id:any, body:any){
    return this.http.put<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${id}`, body);
  }

  updateTerminalVessel(vesselId:any, terminalId:any, body:any){
    return this.http.put<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${terminalId}`+'/vessel/'+`${vesselId}`, body);
  }

  updateTerminalImage(id:any, body:any){
    return this.http.put<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${id}`+'/image', body);
  }

  activateTerminal(id:any, body:any){
    return this.http.put<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${id}`+'/activate', body);
  }

  deactivateTerminal(id:any, body:any){
    return this.http.put<any[]>(environment.apiUrl + 'terminal/api/v1/'+`${id}`+'/deactivate', body);
  }

}
