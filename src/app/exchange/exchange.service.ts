import { Injectable } from '@angular/core';
import { Exchange } from './exchange.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private exchange: Exchange[] = [];
  private exchangeUpdated = new Subject<{rates: Exchange[]}>();
  private uri = 'http://localhost:8080/get-historical-data';
  
  constructor(private http: HttpClient, private router: Router) { }

  getRates() {
    return this.http.get<{exchange: Exchange[]}>(this.uri);
  }

  getExchangeUpdatedListner() {
    return this.exchangeUpdated.asObservable();
  }
}
