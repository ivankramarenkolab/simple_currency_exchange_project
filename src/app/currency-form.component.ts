import {Component, OnDestroy} from '@angular/core';
import {CurrencyApiService} from './currency-api.service';
import {of, Subscription, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnDestroy {
  selectedCurrency1: string = "USD";
  selectedCurrency2: string = "EUR";
  amountCurrency1: number = 1;
  amountCurrency2: number = 0;
  activeCurrencyInput: number = 1;
  private timerSubscription: Subscription | null = null;

  constructor(private currencyApiService: CurrencyApiService) {
  }

  ngOnInit() {
    this.sendCurrencyConversionRequest(1);
  }

  onCurrencyChanged() {
    const activeInput = this.activeCurrencyInput === 1 ? 1 : 2;
    this.sendCurrencyConversionRequest(activeInput);
  }

  onAmountCurrencyChanged(inputChange: number) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(2000).pipe(
      switchMap(() => {
        this.activeCurrencyInput = inputChange;
        this.sendCurrencyConversionRequest(inputChange);
        return of(null);
      })
    ).subscribe(() => {
      this.timerSubscription = null;
    });
  }

  sendCurrencyConversionRequest(resultExchange: number) {
    const currencyTo = resultExchange === 1 ? this.selectedCurrency2 : this.selectedCurrency1;
    const currencyFrom = resultExchange === 1 ? this.selectedCurrency1 : this.selectedCurrency2;
    const amount = resultExchange === 1 ? this.amountCurrency1 : this.amountCurrency2;
    this.currencyApiService.convertCurrency(currencyTo, currencyFrom, amount)
      .subscribe(
        (result: any) => {
          if (resultExchange === 1) {
            this.amountCurrency2 = result.result;
          } else {
            this.amountCurrency1 = result.result;
          }
        },
        (error: any) => {
          alert(error);
        }
      );
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
