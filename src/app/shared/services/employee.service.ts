import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  employeesData$: BehaviorSubject<any[]>;
  public empData = [];

  constructor() {
    this.employeesData$ = new BehaviorSubject([]);
  }

  getAll() {
    this.empData=[];
    for (let i = 0; i < 10000; i++) {
        let empdata=this.oneHost();
        empdata.totlasalary = empdata.salaryq1+empdata.salaryq2+empdata.salaryq3+empdata.salaryq4;
        empdata.totalhours = empdata.workinghoursq1+empdata.workinghoursq2+empdata.workinghoursq3+empdata.workinghoursq4;

        this.empData.push(empdata);
    } 
    this.employeesData$.next(this.empData);
    console.log("faker data",faker.name.findName());
  }

  edit(employee: any) {
    let findElem = this.empData.find(emp => emp.id == employee.id);

    findElem.name = employee.name;
    findElem.jobtitle = employee.jobtitle;
    findElem.email = employee.email;
    findElem.country = employee.country;
    findElem.salaryq1 = employee.salaryq1;
    findElem.salaryq2 = employee.salaryq2;
    findElem.salaryq3 = employee.salaryq3;
    findElem.salaryq4 = employee.salaryq4;
    findElem.workinghoursq1 = employee.workinghoursq1;
    findElem.workinghoursq2 = employee.workinghoursq2;
    findElem.workinghoursq3 = employee.workinghoursq3;
    findElem.workinghoursq4 = employee.workinghoursq4;
    findElem.totlasalary = employee.salaryq1+employee.salaryq2+employee.salaryq3+employee.salaryq4;
    findElem.totalhours = employee.workinghoursq1+employee.workinghoursq2+employee.workinghoursq3+employee.workinghoursq4;
    this.employeesData$.next(this.empData);
  }

  view(id: number) {

    this.empData = this.empData.filter(p => {
      return p.id != id
    });

    this.employeesData$.next(this.empData);
  }

  remove(id: number) {

    this.empData = this.empData.filter(p => {
      return p.id != id
    });

    this.employeesData$.next(this.empData);
  }

  oneHost(){
    return {
        id: faker.random.uuid(),
        jobtitle: faker.name.jobTitle(),
        email: faker.internet.email(),
        name:faker.name.firstName() + ' '+faker.name.lastName(),
        country:faker.address.country(),
        salaryq1:faker.random.number(),
        salaryq2:faker.random.number(),
        salaryq3:faker.random.number(),
        salaryq4:faker.random.number(),
        workinghoursq1:faker.random.number(),
        workinghoursq2:faker.random.number(),
        workinghoursq3:faker.random.number(),
        workinghoursq4:faker.random.number(),
        totlasalary:0,
        totalhours:0

    };
  }

}
