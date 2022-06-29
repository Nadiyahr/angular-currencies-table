import { Rates } from './../../types';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Rates>;
  dataSource: TableDataSource;
  displayedColumns = ['code', 'currency', 'mid'];
  date: string | null = null;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    ) {
    this.dataSource = new TableDataSource();
  }

  ngOnInit(): void {
    console.log(Boolean(this.date));
    this.loadCurrencies();
  }

  updateDoB(dateObject: any){
    this.date = this.datePipe.transform(dateObject.value, 'yyyy-MM-dd')
    this.apiService.getCurrenciesByDate(this.date!).subscribe(data => {
      this.dataSource.data = data[0].rates
    })

    this.table.renderRows();
  }

  loadCurrencies() {
    this.apiService.getCurrencies().subscribe((curr) => {
      console.log('simple');
      
      this.dataSource.data = curr[0].rates;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource.data;
  }
}
