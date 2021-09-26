import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Department, ResponseBaseModel } from '../models';

@Injectable({ providedIn: 'root' })
export class DepartmentHttpService implements OnDestroy
{
  private apiUrl = environment.apiUrl;

  private departmentListSubject!: BehaviorSubject<Department[]>;
  public departmentList!: Observable<Department[]>;

  constructor(private http: HttpClient)
  {
    this.departmentListSubject = new BehaviorSubject<Department[]>([]);
    this.departmentList = this.departmentListSubject.asObservable();

    this.departmentListSubject.next(this.getMockData());
  }

  ngOnDestroy(): void
  {
    this.departmentListSubject.unsubscribe();
  }

  getDepartments(): Observable<ResponseBaseModel<Department[]>>
  {
    // return this.http.get<ResponseBaseModel<Department[]>>(`${ this.apiUrl }/departments/getDepartments`);
    return of({ data: this.departmentListSubject.value } as ResponseBaseModel<Department[]>);
  }

  getDepartment(id: string): Observable<ResponseBaseModel<Department>>
  {
    // return this.http.get<ResponseBaseModel<Department>>(`${ this.apiUrl }/departments/${ id }`);

    const department = this.departmentListSubject.value.find(item => item.Id === id);

    return of({ data: department } as ResponseBaseModel<Department>);
  }

  postDepartment(department: Department): Observable<ResponseBaseModel<boolean>>
  {
    // return this.http.post<ResponseBaseModel<boolean>>(`${ this.apiUrl }/departments`, department);

    let departments = this.departmentListSubject.value;
    department.Id = (Math.random() + 1).toString(36).substring(3);
    departments.push(department);

    this.departmentListSubject.next(departments);

    return of({ data: true } as ResponseBaseModel<boolean>);
  }

  patchDepartment(id: string, department: Department): Observable<ResponseBaseModel<boolean>>
  {
    // return this.http.patch<ResponseBaseModel<boolean>>(`${ this.apiUrl }/departments/${ id }`, department);

    let departments = this.departmentListSubject.value;
    const departmentIndex = departments.findIndex(item => item.Id === id);

    if (departmentIndex !== -1)
    {
      departments[departmentIndex] = department;
    }

    this.departmentListSubject.next(departments);

    return of({ data: true } as ResponseBaseModel<boolean>);
  }

  deleteDepartment(id: string): Observable<ResponseBaseModel<boolean>>
  {
    // return this.http.delete<null>(`${ this.apiUrl }/departments/${ id }`);

    let departments = this.departmentListSubject.value;
    const departmentIndex = departments.findIndex(item => item.Id === id);

    if (departmentIndex !== -1)
    {
      departments.splice(departmentIndex, 1);
    }

    this.departmentListSubject.next(departments);

    return of({ data: true } as ResponseBaseModel<boolean>);
  }

  getMockData(): Department[]
  {
    return [
      {
        Id: '1',
        DepartmentInfo: {
          Name: 'Cordiology',
          APIKey: '10f453e9-b50e-4f88-83f2-85785ca44c87'
        },
        DepartmentContactPerson: {
          Name: 'Hossein',
          Email: 'hsn.azizkhani@gmail.com',
          Telephone: '88442200'
        }
      },
      {
        Id: '2',
        DepartmentInfo: {
          Name: 'Oncology',
          APIKey: '00847ae4-8bf9-4f6f-bf59-bc0051445173'
        },
        DepartmentContactPerson: {
          Name: 'Jack',
          Email: 'Jack@gmail.com',
          Telephone: '77335599'
        }
      }
    ];
  }
}
