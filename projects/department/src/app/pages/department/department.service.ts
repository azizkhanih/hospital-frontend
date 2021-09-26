import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, ResponseBaseModel } from '../../models';
import { DepartmentHttpService } from '../../services/department-http.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService
{
  constructor(private departmentHttpService: DepartmentHttpService) { }

  getDepartment(id: string): Observable<ResponseBaseModel<Department>>
  {
    return this.departmentHttpService.getDepartment(id);
  }

  postDepartment(department: Department): Observable<ResponseBaseModel<boolean>>
  {
    return this.departmentHttpService.postDepartment(department);
  }

  patchDepartment(id: string, department: Department): Observable<ResponseBaseModel<boolean>>
  {
    return this.departmentHttpService.patchDepartment(id, department);
  }
}
