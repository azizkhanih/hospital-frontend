import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentHttpService } from '../../http-services/department-http.service';
import { Department } from '../../models';

@Injectable({ providedIn: 'root' })
export class DepartmentsService
{
  constructor(private departmentHttpService: DepartmentHttpService) { }

  getDepartments(): Observable<Department[]>
  {
    return this.departmentHttpService.getDepartments();
  }

  deleteDepartment(id: string): Observable<boolean>
  {
    return this.departmentHttpService.deleteDepartment(id);
  }
}
