import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent {
  currency1: string = "USD";
  currency2: string = "EUR";
  input1: number = 1;
  input2: number = 0;
  output: number = 0;
  input1Check: boolean = true;
  input2Check: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.sendRequestToServer();
  }

  sendRequestToServer() {
    const apiKey = "ILkLGGAJAUSSBv8BIyhgAQn4csteUCIu";
    let url, requestOptions;

    url = `https://api.apilayer.com/currency_data/convert?to=${this.currency2}&from=${this.currency1}&amount=${this.input1}`;

    const myHeaders = new HttpHeaders().set("apikey", apiKey);

    requestOptions = {
      headers: myHeaders
    };

    this.http.get(url, requestOptions)
      .subscribe(
        (result: any) => {
          this.output = result.result;
          this.input2 = this.output;
          console.log(this.input2)
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  private timerRef1: Subscription | null = null;
  private timerRef2: Subscription | null = null;

  isInput1Changed() {
    if (!(this.output === this.input1)) {
      if (this.timerRef1) {
        this.timerRef1.unsubscribe();
      }
      this.timerRef1 = timer(2000).subscribe(() => {
        this.sendRequestToServer();
        this.input1Check = true;
        this.input2Check = false;
        this.timerRef1 = null;
      });
    }
  }

  IsCurrency1Change() {
    if (this.input1Check) {
      this.sendRequestToServer()
    }
  }

  sendRequestToServer2() {
    const apiKey = "ILkLGGAJAUSSBv8BIyhgAQn4csteUCIu";
    let url, requestOptions;

    url = `https://api.apilayer.com/currency_data/convert?to=${this.currency1}&from=${this.currency2}&amount=${this.input2}`;

    const myHeaders = new HttpHeaders().set("apikey", apiKey);

    requestOptions = {
      headers: myHeaders
    };

    this.http.get(url, requestOptions)
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

  isInput2Changed() {
    if (!(this.output === this.input2)) {
      if (this.timerRef2) {
        this.timerRef2.unsubscribe();
      }
      this.timerRef2 = timer(2000).subscribe(() => {
        this.sendRequestToServer2();
        this.input1Check = false;
        this.input2Check = true;
        this.timerRef2 = null;
      });
    }
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
