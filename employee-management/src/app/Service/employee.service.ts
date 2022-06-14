import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  token!: boolean;
  deleted!: boolean;

  constructor(private http: HttpClient) { }

  delete(id: string) {
      return this.http.delete(`${environment.baseUrl}delete/${id}`);
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}getAllUsers`);
  }

  login(object: Object) {
    return this.http.post(`${environment.baseUrl}login`, object);
  }

  signUp(object: Object) {
    return this.http.post(`${environment.baseUrl}addUser`, object);
  }

  update(id: string, object: Object) {
    return this.http.put(`${environment.baseUrl}update/${id}`, object);
  }

  getWithId(id: string) {
    return this.http.get(`${environment.baseUrl}getWithId/${id}`);
  }

  create(object: Object) {
    return this.http.post(`${environment.baseUrl}signUp`, object);
  }
}
