import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exchange } from '../exchange.model';
import { Subscription } from 'rxjs';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {
  

  rates: Exchange[] = [];
  isLoding = false;
  totalPost = 0;
  ratePerPage = 1;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private exchangeSub: Subscription;
  
  constructor(private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.isLoding  = true;
    this.exchangeService.getRates()
    //this.exchangeSub = this.exchangeService.getExchangeUpdatedListner()
    .subscribe((exchangeData: any) => {
      this.rates = exchangeData;
      this.isLoding  = false;
      });
  }

  ngOnDestroy(): void {
    //this.exchangeSub.unsubscribe();
  }

}
