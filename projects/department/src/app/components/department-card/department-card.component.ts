import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void
  {
  }

}
