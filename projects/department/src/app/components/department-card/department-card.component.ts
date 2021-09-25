import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() onEditEvent = new EventEmitter<string>();
  @Output() onDeleteEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  editDepartment(departmentId: string): void
  {
    this.onEditEvent.next(departmentId);
  }

  deleteDepartment(departmentId: string): void
  {
    this.onDeleteEvent.next(departmentId);
  }
}
