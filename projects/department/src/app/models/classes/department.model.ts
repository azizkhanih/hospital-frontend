import { DepartmentContactPerson } from "./department-contact-person.model";
import { DepartmentInfo } from "./department-info.model";

export class Department
{
    Id: string;
    DepartmentInfo: DepartmentInfo;
    DepartmentContactPerson: DepartmentContactPerson;

    constructor(
        id: string = '',
        departmentInfo = new DepartmentInfo('', ''),
        departmentContactPerson = new DepartmentContactPerson('', '', '')
    )
    {
        this.Id = id;
        this.DepartmentInfo = departmentInfo;
        this.DepartmentContactPerson = departmentContactPerson;
    }
}