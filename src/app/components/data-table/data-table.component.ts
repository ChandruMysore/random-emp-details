import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ViewEmployeeDetailsComponent } from '../view-employee-details/view-employee-details.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public tableHeaders = [];
  public columnsToDisplay =[];
  public disableBtn:boolean=false;
  public loader: boolean=true;
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  private serviceSubscribe: Subscription;
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
      this.tableHeaders = [
        { type : 'text', keyword : 'jobtitle', showcheckbox : false, headername : 'Job Title' },
        { type : 'text', keyword : 'email', showcheckbox : false, headername : 'Email Address' },
        { type : 'text', keyword : 'name', showcheckbox : false, headername : 'First Name & Last Name' },
        { type : 'text', keyword : 'country', showcheckbox : false, headername : 'Country' },
        { type : 'text', keyword : 'salaryq1', showcheckbox : true, headername : 'Salary in Q1' },
        { type : 'text', keyword : 'salaryq2', showcheckbox : true, headername : 'Salary in Q2' },
        { type : 'text', keyword : 'salaryq3', showcheckbox : true, headername : 'Salary in Q3' },
        { type : 'text', keyword : 'salaryq4', showcheckbox : true, headername : 'Salary in Q4' },
        { type : 'text', keyword : 'totlasalary', showcheckbox : false, headername : 'Total Salary' },
        { type : 'text', keyword : 'totalhours', showcheckbox : false, headername : 'Total hours' }
      ];
      let displayedColNames = this.tableHeaders.map(x => x.headername)
      this.columnsToDisplay = [...displayedColNames, 'actions'];
  }

  private filter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let find = true;

      for (var columnName in this.columnsFilters) {
        let currentData = "" + data[columnName];
        //if there is no filter, jump to next loop, otherwise do the filter.
        if (!this.columnsFilters[columnName]) {
          return;
        }
        let searchValue = this.columnsFilters[columnName]["contains"];
        if (!!searchValue && currentData.indexOf("" + searchValue) < 0) {
          find = false;
          //exit loop
          return;
        }
        searchValue = this.columnsFilters[columnName]["equals"];
        if (!!searchValue && currentData != searchValue) {
          find = false;
          //exit loop
          return;
        }
        searchValue = this.columnsFilters[columnName]["greaterThan"];
        if (!!searchValue && currentData <= searchValue) {
          find = false;
          //exit loop
          return;
        }
        searchValue = this.columnsFilters[columnName]["lessThan"];
        if (!!searchValue && currentData >= searchValue) {
          find = false;
          //exit loop
          return;
        }
        searchValue = this.columnsFilters[columnName]["startWith"];

        if (!!searchValue && !currentData.startsWith("" + searchValue)) {
          find = false;
          //exit loop
          return;
        }

        searchValue = this.columnsFilters[columnName]["endWith"];
        if (!!searchValue && !currentData.endsWith("" + searchValue)) {
          find = false;
          //exit loop
          return;
        }
      }
      return find;
    };
    this.dataSource.filter = null;
    this.dataSource.filter = 'activate';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
    /**
     * Create a filter for the column name and operate the filter action.
     */
    applyFilter(columnName: string, operationType: string, searchValue: string) {
      console.log("columnName",columnName,"operationType",operationType,"searchValue",searchValue);
      this.columnsFilters[columnName] = {};
      this.columnsFilters[columnName][operationType] = searchValue;
      this.filter();
    }
  
    /**
     * clear all associated filters for column name.
     */
    clearFilter(columnName: string) {
      console.log("columnName",columnName);
      if (this.columnsFilters[columnName]) {
        delete this.columnsFilters[columnName];
        this.filter();
      }
    }
  
  
    edit(data: any) {
      console.log("data edit",data);
      const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
        width: '50%',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employeeService.edit(result);
        }
      });
    }
  
    view(data: any) {
      console.log("data edit",data);
      const dialogRef = this.dialog.open(ViewEmployeeDetailsComponent, {
        width: '50%',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employeeService.edit(result);
        }
      });
    }
    delete(id: any) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employeeService.remove(id);
        }
      });
    }
  
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    /**
     * initialize data-table by providing persons list to the dataSource.
     */
    ngOnInit(): void {
      this.getEmployeeData();
      
    }
    getEmployeeData(){
      this.loader = true;
      this.disableBtn=true;
      this.employeeService.getAll();
      this.serviceSubscribe = this.employeeService.employeesData$.subscribe(res => {
        this.dataSource.data = res;
      });
      this.disableBtn=false;
      this.loader = false;
    }
  
    ngOnDestroy(): void {
      this.serviceSubscribe.unsubscribe();
    }
  
  }
