import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../currency-api.service';
import { CurrencyConversionResult } from "../currency-conversion-result";
import { throwError} from "rxjs";
import { catchError, combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  uahToUsd: number = 0;
  uahToEur: number = 0;

  constructor(private currencyApiService: CurrencyApiService) { }

  ngOnInit() {
    this.getCurrencyRates();
  }

  getCurrencyRates() {
    const usdCurrency$ = this.currencyApiService.convertCurrency('UAH', 'USD', 1);
    const eurCurrency$ = this.currencyApiService.convertCurrency('UAH', 'EUR', 1);

    usdCurrency$.pipe(
      combineLatestWith(eurCurrency$),
      catchError(error => {
        alert('Error fetching currency rates');
        return throwError(error);
      })
    ).subscribe(
      ([usdResult, eurResult]: [CurrencyConversionResult, CurrencyConversionResult]) => {
        this.uahToUsd = this.currencyApiService.formatNumber(usdResult.result);
        this.uahToEur = this.currencyApiService.formatNumber(eurResult.result);
      }
    );
  }
}
