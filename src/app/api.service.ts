import { Rates } from './../types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currencies } from '../types'

const base_url = 'https://api.nbp.pl/api/exchangerates/tables/A';
const type = '/?format=json'

// https://api.nbp.pl/api/exchangerates/tables/A/2022-05-05?format=json

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getCurrencies(): Observable<Currencies[]> {
    return this._http.get<Currencies[]>(`${base_url}${type}`)
  }

  getCurrenciesByDate(date: string): Observable<Currencies[]> {
    return this._http.get<Currencies[]>(`${base_url}/${date}${type}`)
  }
}
