import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../models';
import { DepartmentHttpService } from '../../services/department-http.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService
{
  constructor(private departmentHttpService: DepartmentHttpService) { }

  getDepartment(id: string): Observable<Department>
  {
    return this.departmentHttpService.getDepartment(id);
  }

  postDepartment(department: Department): Observable<boolean>
  {
    return this.departmentHttpService.postDepartment(department);
  }

  putDepartment(id: string, department: Department): Observable<boolean>
  {
    return this.departmentHttpService.putDepartment(id, department);
  }
}
