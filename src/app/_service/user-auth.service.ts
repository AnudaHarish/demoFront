import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }


  public setusername(username: any) {
    localStorage.setItem('username', username);
  }

  public getusername() {
    return localStorage.getItem('username');
  }



  public setId(id: any) {
    localStorage.setItem('id', id)
  }

  public getId(): any {
    return localStorage.getItem('id');
  }

  public getRoles(): [] {
    const rolesJson = localStorage.getItem('roles');

    if (rolesJson) {
      return JSON.parse(rolesJson);
    }

    return [];
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {

    const token = localStorage.getItem('jwtToken');
    if (token) {
      return token;
    }
    return '';
  }


  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }


  public clear() {
    this.setRoles([]);
    this.setToken('');
    localStorage.clear();
  }



}
