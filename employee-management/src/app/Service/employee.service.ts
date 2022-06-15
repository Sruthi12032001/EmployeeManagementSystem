import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  token!: boolean;
  deleted!: boolean;

  constructor(private http: HttpClient) { }
  private getToken(): HttpHeaders {
    const token = new HttpHeaders({
      Authorization: localStorage.getItem('token') + '',
    });
    return token;
  }

  delete(id: string) {
    console.log(this.getToken());
      return this.http.delete(`${environment.baseUrl}delete/${id}`, {"headers" : this.getToken()});
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}getAllUsers`, {"headers" : this.getToken()});
  }

  login(object: Object) {
    return this.http.post(`${environment.baseUrl}login`, object);
  }

  addUser(object: Object) {
    return this.http.post(`${environment.baseUrl}addUser`, object, {"headers" : this.getToken()});
  }

  update(id: string, object: Object) {
    return this.http.put(`${environment.baseUrl}update/${id}`, object, {"headers" : this.getToken()});
  }

  getWithId(id: string) {
    return this.http.get(`${environment.baseUrl}getWithId/${id}`, {"headers" : this.getToken()});
  }

  create(object: Object) {
    return this.http.post(`${environment.baseUrl}signUp`, object);
  }
}
