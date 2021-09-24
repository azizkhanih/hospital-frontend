import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Department } from '../../models';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit
{
  departmentList: Department[] = [];
  departmentListFiltered: Department[] = [];

  searchTerm: string = '';
  searchTermChanged: Subject<string> = new Subject<string>();

  constructor()
  {
    this.searchTermChanged.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe((term: string) =>
      {
        this.search(term);
      });
  }

  ngOnInit(): void
  {
  }

  searchChanged(term: string): void
  {
    this.searchTermChanged.next(term);
  }

  search(term: string): void
  {
    const keyword = term.toLowerCase();
    this.departmentListFiltered = this.departmentList.filter(
      x => x.DepartmentInfo.Name.toLowerCase().includes(keyword) ||
        x.DepartmentInfo.APIKey.toLowerCase().includes(keyword) ||
        x.DepartmentContactPerson.Name.toLowerCase().includes(keyword) ||
        x.DepartmentContactPerson.Email.toLowerCase().includes(keyword) ||
        x.DepartmentContactPerson.Telephone.toLowerCase().includes(keyword)
    );
  }

}
