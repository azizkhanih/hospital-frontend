import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Department } from '../../models';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentsComponent implements OnInit
{
  departmentList: Department[] = [];
  filteredDepartmentList: Department[] = [];

  searchTerm: string = '';
  searchTermChanged: Subject<string> = new Subject<string>();

  constructor(protected changeDetectorRef: ChangeDetectorRef)
  {
    this.searchTermChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((term: string) =>
      {
        this.search(term);
      });
  }

  ngOnInit(): void
  {
    this.getDepartments();
  }

  getDepartments(): void
  {
    this.departmentList = this.getMockData();
    this.filteredDepartmentList = this.departmentList;
  }

  searchChanged(term: string): void
  {
    this.searchTermChanged.next(term);
  }

  search(term: string): void
  {
    const keyword = term.toLowerCase();
    this.filteredDepartmentList = this.departmentList.filter(
      x => x.DepartmentInfo.Name.toLowerCase().indexOf(keyword) > -1 ||
        x.DepartmentInfo.APIKey.toLowerCase().indexOf(keyword) > -1 ||
        x.DepartmentContactPerson.Name.toLowerCase().indexOf(keyword) > -1 ||
        x.DepartmentContactPerson.Email.toLowerCase().indexOf(keyword) > -1 ||
        x.DepartmentContactPerson.Telephone.toLowerCase().indexOf(keyword) > -1
    );

    this.changeDetectorRef.detectChanges();
  }

  getMockData(): Department[]
  {
    return [
      {
        Id: '1',
        DepartmentInfo: {
          Name: 'Cordiology',
          APIKey: 'dssdg-dasf-erte'
        },
        DepartmentContactPerson: {

          Name: 'Steve',
          Email: 'steve@gmail.com',
          Telephone: '4546764566'
        }
      },
      {
        Id: '2',
        DepartmentInfo: {
          Name: 'Oncology',
          APIKey: 'dssdg-e5r6-sdfde'
        },
        DepartmentContactPerson: {

          Name: 'Json',
          Email: 'json@gmail.com',
          Telephone: '456212123'
        }
      }
    ];
  }

}
