import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentComponent implements OnInit, OnDestroy
{
  routeSubscription!: Subscription;
  departmentId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    this.routeSubscription = this.activatedRoute.params.subscribe(params =>
    {
      this.departmentId = params['departmentId'];
    });
  }

  ngOnDestroy(): void
  {
    this.routeSubscription?.unsubscribe();
  }

}
