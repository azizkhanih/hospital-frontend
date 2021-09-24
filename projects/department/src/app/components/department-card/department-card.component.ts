import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { Department } from './../../models/classes/department.model';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentCardComponent implements OnInit
{
  @Input() department: Department = new Department();

  constructor(
    private modalService: NgbModal,
    private translateService: TranslateService,) { }

  ngOnInit(): void
  {
  }

  editDepartment(departmentId: string): void
  {
  }

  deleteDepartment(departmentId: string): void
  {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      keyboard: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.title = this.translateService.instant('COMMON.DELETE');
    modalRef.componentInstance.notificationText = this.translateService.instant('COMMON.ARE_YOU_SURE');
    modalRef.componentInstance.yesButtonText = this.translateService.instant('COMMON.YES');
    modalRef.componentInstance.NoButtonText = this.translateService.instant('COMMON.NO');
    modalRef.result.then((confirmed) =>
    {
      if (confirmed)
      {
        //call remove function
        modalRef.close(true);
      }
    });
  }

}
