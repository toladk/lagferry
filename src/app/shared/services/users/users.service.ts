import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Users[]>(environment.apiUrl + 'user/api/v1/all');
  }

  createUser(user: Users) {
    return this.http.post(environment.apiUrl + 'user/api/v1/', user);
  }

  activateUser(userId: string) {
    return this.http.put(environment.apiUrl + `user/api/v1/${userId}/activate`, {});
  }

  deactivateUser(userId: string) {
    return this.http.put(environment.apiUrl + `user/api/v1/${userId}/deactivate`, {});
  }

  getProfileInfo() {
    return this.http.get(environment.apiUrl + 'user/api/v1/profile');
  }

  updateUser(user: Users) {
    return this.http.put(environment.apiUrl + `user/api/v1/edit`, user);
  }

  updateImage(id: string, payload: any){
    return this.http.put(environment.apiUrl + `user/api/v1/${id}/image`, payload);
  }

  getCrewMembers() {
    return this.http.get<Users[]>(environment.apiUrl + 'crew-member/api/v1');
  }

  createCrewMember(user:any){
    return this.http.post(environment.apiUrl + 'crew-member/api/v1', user);
  }

  activateCrewMember(userId: number) {
    return this.http.put(environment.apiUrl + `crew-member/api/v1/${userId}/activate`, {});
  }

  deactivateCrewMember(userId: number) {
    return this.http.put(environment.apiUrl + `crew-member/api/v1/${userId}/deactivate`, {});
  }
}
