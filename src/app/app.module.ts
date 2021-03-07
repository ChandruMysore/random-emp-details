import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { DataTableComponent } from './components/data-table/data-table.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { EmployeeFormDialogComponent } from './components/employee-form-dialog/employee-form-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ViewEmployeeDetailsComponent } from './components/view-employee-details/view-employee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    ConfirmationDialogComponent,
    EmployeeFormDialogComponent,
    ViewEmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    HttpClientModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  entryComponents: [ConfirmationDialogComponent, EmployeeFormDialogComponent,ViewEmployeeDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
