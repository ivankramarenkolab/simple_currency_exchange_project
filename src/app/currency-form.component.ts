import { Component, OnDestroy } from '@angular/core';
import { CurrencyApiService } from './currency-api.service';
import { Subscription, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnDestroy {
  currency1: string = "USD";
  currency2: string = "EUR";
  input1: number = 1;
  input2: number = 0;
  output: number = 0;
  input1Check: boolean = true;
  input2Check: boolean = false;
  private timerRef1: Subscription | null = null;
  private timerRef2: Subscription | null = null;

  constructor(private currencyApiService: CurrencyApiService) {
  }

  ngOnInit() {
    this.sendRequestToServer();
  }

  sendRequestToServer() {
    this.currencyApiService.sendCurrencyConversionRequest(this.currency1, this.currency2, this.input1)
      .subscribe(
        (result: any) => {
          this.output = result.result;
          this.input2 = this.output;
          console.log(this.input2);
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  isInput1Changed() {
    if (!(this.output === this.input1)) {
      if (this.timerRef1) {
        this.timerRef1.unsubscribe();
      }
      this.timerRef1 = timer(2000).pipe(
        switchMap(() => {
          this.sendRequestToServer();
          this.input1Check = true;
          this.input2Check = false;
          return of(null);
        })
      ).subscribe(() => {
        this.timerRef1 = null;
      });
    }
  }

  IsCurrency1Change() {
    if (this.input1Check) {
      this.sendRequestToServer()
    }
  }

  isInput2Changed() {
    if (!(this.output === this.input2)) {
      if (this.timerRef2) {
        this.timerRef2.unsubscribe();
      }
      this.timerRef2 = timer(2000).pipe(
        switchMap(() => {
          this.sendRequestToServer2();
          this.input1Check = false;
          this.input2Check = true;
          return of(null);
        })
      ).subscribe(() => {
        this.timerRef2 = null;
      });
    }
  }

  sendRequestToServer2() {
    this.currencyApiService.sendCurrencyConversionRequest(this.currency2, this.currency1, this.input2)
      .subscribe(
        (result: any) => {
          this.output = result.result;
          this.input1 = this.output;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  IsCurrency2Change() {
    if (this.input2Check) {
      this.sendRequestToServer2()
    }
  }

  ngOnDestroy() {
    if (this.timerRef1) {
      this.timerRef1.unsubscribe();
    }
    if (this.timerRef2) {
      this.timerRef2.unsubscribe();
    }
  }

}
