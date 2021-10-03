import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Department } from '../models';

@Injectable({ providedIn: 'root' })
export class DepartmentHttpService
{
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]>
  {
    return this.http.get<Department[]>(`${ this.apiUrl }/departments`);
  }

  getDepartment(id: string): Observable<Department>
  {
    return this.http.get<Department>(`${ this.apiUrl }/departments/${ id }`);
  }

  postDepartment(department: Department): Observable<boolean>
  {
    return this.http.post<boolean>(`${ this.apiUrl }/departments`, department);
  }

  patchDepartment(id: string, department: Department): Observable<boolean>
  {
    return this.http.patch<boolean>(`${ this.apiUrl }/departments/${ id }`, department);
  }

  deleteDepartment(id: string): Observable<boolean>
  {
    return this.http.delete<boolean>(`${ this.apiUrl }/departments/${ id }`);
  }
}
