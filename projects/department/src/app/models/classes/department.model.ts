export class Department
{
    departmentId: string;
    departmentInfo: DepartmentInfo;
    departmentContactPerson: DepartmentContactPerson;

    constructor(
        departmentId: string = '',
        departmentInfo = new DepartmentInfo('', ''),
        departmentContactPerson = new DepartmentContactPerson('', '', '')
    )
    {
        this.departmentId = departmentId;
        this.departmentInfo = departmentInfo;
        this.departmentContactPerson = departmentContactPerson;
    }
}

export class DepartmentInfo
{
    name: string;
    apiKey: string;

    constructor(name: string, apiKey: string)
    {
        this.name = name;
        this.apiKey = apiKey;
    }
}

export class DepartmentContactPerson
{
    name: string;
    email: string;
    telephone: string;

    constructor(name: string, email: string, telephone: string)
    {
        this.name = name;
        this.email = email;
        this.telephone = telephone;
    }
}