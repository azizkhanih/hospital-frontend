import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, ResponseBaseModel } from '../../models';
import { DepartmentHttpService } from './../../services/department-http.service';

@Injectable({ providedIn: 'root' })
export class DepartmentsService
{
  constructor(private departmentHttpService: DepartmentHttpService) { }

  getDepartments(): Observable<ResponseBaseModel<Department[]>>
  {
    return this.departmentHttpService.getDepartments();
  }

  deleteDepartment(id: string): Observable<ResponseBaseModel<boolean>>
  {
    return this.departmentHttpService.deleteDepartment(id);
  }
}
