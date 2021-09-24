import { DepartmentContactPerson } from "./department-contact-person.model";
import { DepartmentInfo } from "./department-info.model";

export class Department
{
    DepartmentInfo: DepartmentInfo = new DepartmentInfo('', '');
    DepartmentContactPerson: DepartmentContactPerson = new DepartmentContactPerson('', '', '');
}