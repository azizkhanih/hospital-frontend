import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentHttpService } from '../../http-services/department-http.service';
import { Department } from '../../models';

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
