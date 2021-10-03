import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Department } from '../../models';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentsComponent implements OnInit, OnDestroy
{
  departmentList: Department[] = [];
  filteredDepartmentList: Department[] = [];
  searchTermSubscription: Subscription;
  isLoading = false;

  searchTerm: string = '';
  searchTermChanged: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private departmentsService: DepartmentsService,
    private changeDetectorRef: ChangeDetectorRef)
  {
    this.searchTermSubscription = this.searchTermChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe((term: string) =>
      {
        debugger;
        this.searchInDepartments(term);
      });
  }

  ngOnInit(): void
  {
    this.getDepartments();
  }

  ngOnDestroy(): void
  {
    this.searchTermSubscription.unsubscribe();
  }

  getDepartments(): void
  {
    this.departmentsService.getDepartments().subscribe({
      next: (response) =>
      {
        this.departmentList = response;
        this.filteredDepartmentList = response;
        this.hideLoading();
      },
      error: () =>
      {
        this.hideLoading();
      }
    });
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
        this.departmentsService.deleteDepartment(departmentId).subscribe({
          next: () =>
          {
            modalRef.close(true);
            this.hideLoading();
            this.getDepartments();

            this.searchTerm = '';
            this.changeDetectorRef.detectChanges();
          },
          error: () =>
          {
            this.hideLoading();
          }
        });
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
        return this.filterObject(x.departmentInfo, keyword) || this.filterObject(x.departmentContactPerson, keyword);
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

  showLoading(): void
  {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
  }

  hideLoading(): void
  {
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }
}
