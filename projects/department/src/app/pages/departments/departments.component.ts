import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Department } from '../../models';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

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

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef)
  {
    this.searchTermChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((term: string) =>
      {
        this.searchInDepartments(term);
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

  createDepartment(): void
  {
    this.navigateToDepartment('');
  }

  editDepartment(departmentId: string): void
  {
    this.navigateToDepartment(departmentId);
  }

  deleteDepartment(departmentId: string): void
  {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      keyboard: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.title = 'COMMON.DELETE';
    modalRef.componentInstance.notificationText = 'COMMON.ARE_YOU_SURE';
    modalRef.componentInstance.yesButtonText = 'COMMON.YES';
    modalRef.componentInstance.NoButtonText = 'COMMON.NO';
    modalRef.result.then((confirmed) =>
    {
      if (confirmed)
      {
        //call remove function 
        modalRef.close(true);
      }
    });
  }

  navigateToDepartment(departmentId?: string): void
  {
    this.router.navigate(['./department', departmentId || '']);
  }

  searchChanged(term: string): void
  {
    this.searchTermChanged.next(term);
  }

  searchInDepartments(term: string): void
  {
    const keyword = term.toLowerCase();
    //implement filter to search for dynamic props
    this.filteredDepartmentList = this.departmentList.filter(
      x =>
      {
        return this.filterObject(x.DepartmentInfo, keyword) || this.filterObject(x.DepartmentContactPerson, keyword);
      }
    );

    this.changeDetectorRef.detectChanges();
  }

  //search into objects
  filterObject(obj: Object, term: string): boolean
  {
    const objAsArray = Object.entries(obj);
    const filteredItems = objAsArray.filter(([key, value]) => String(value).toLowerCase().indexOf(term) > -1);
    return filteredItems?.length > 0;
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
