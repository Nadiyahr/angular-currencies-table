import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Rates } from 'src/types';

export class TableDataSource extends DataSource<Rates> {
  data: Rates[] = [];
  paginator!: MatPaginator;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  disconnect(): void {}

  private getPagedData(data: Rates[]): Rates[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Rates[]): Rates[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'currency': return compare(a.currency, b.currency, isAsc);
        case 'code': return compare(a.code, b.code, isAsc);
        case 'mid': return compare(+a.mid, +b.mid, isAsc);
        default: return 0;
      }
    });
  }

  connect(): Observable<Rates[]> {
    if (this.data.length && this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
