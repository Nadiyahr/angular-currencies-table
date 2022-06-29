import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Output()
  darkMode = new EventEmitter<boolean>()
  date: string | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe,
    private breakpointObserver: BreakpointObserver
    ) {}

    

  updateDoB(dateObject: any){
    this.apiService.getCurrencies().subscribe( data => console.log(data));
    this.date = this.datePipe.transform(dateObject.value, 'yyyy-MM-dd')
    // console.log(this.date)
    let d;
    this.apiService.getCurrenciesByDate(this.date!).subscribe(data => {
      d = data;
      console.log(data);
    })
  }

  changeTheme(val: MatButtonToggleChange) { 
    this.darkMode.emit(val.value)
  }
}
