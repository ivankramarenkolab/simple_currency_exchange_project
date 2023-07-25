import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  lastcurrency1: string = this.currency1;
  lastcurrency2: string = this.currency2;
  const1: number = this.input1;
  const2: number = this.input2;
  const1IsDefault: boolean = true;
  const2IsDefault: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.sendRequestToServer();
  }

  isInput1Changed() {
    return this.input1 !== this.const1;
  }

  isInput2Changed() {
    return this.input2 !== this.const2;
  }

  onInput1Change() {
    if (this.isInput1Changed()) {
      this.const1IsDefault = true;
      this.const2IsDefault = false;
      this.sendRequestToServer();
      this.input2 = this.output;
    }
  }

  onInput2Change() {
    if (this.isInput2Changed()) {
      this.const1IsDefault = false;
      this.const2IsDefault = true;
      this.sendRequestToServer();
      this.input1 = this.output;
    }
  }

  sendRequestToServer() {
    const apiKey = "fPxgwzq32YgPjElNj6GZ1YVG4YbgNT0i";
    let url, requestOptions;

    if (this.isInput1Changed()) {
      url = `https://api.apilayer.com/currency_data/convert?to=${this.currency2}&from=${this.currency1}&amount=${this.input1}`;
    } else if (this.isInput2Changed()) {
      url = `https://api.apilayer.com/currency_data/convert?to=${this.currency1}&from=${this.currency2}&amount=${this.input2}`;
    } else {
      return; // No need to send a request if no changes.
    }

    const myHeaders = new HttpHeaders().set("apikey", apiKey);

    requestOptions = {
      headers: myHeaders
    };

    this.http.get(url, requestOptions)
      .subscribe(
        (result: any) => {
          this.output = result.result;
          console.log(this.output)
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  // onCurrency1Change() {
  //   if (this.const1IsDefault && this.isInput1Changed()) {
  //     this.const1IsDefault = false;
  //     this.const2IsDefault = true;
  //     this.sendRequestToServer();
  //   }
  // }
  //
  // onCurrency2Change() {
  //   if (!this.const1IsDefault && this.isInput2Changed()) {
  //     this.const2IsDefault = false;
  //     this.sendRequestToServer();
  //   }
  // }
}

<div>
  <label for="currency1">Currency 1:</label>
<select id="currency1" [(ngModel)]="currency1">
<option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="UAH">UAH</option>
  </select>
  <input type="text" [(ngModel)]="input1" (ngModelChange)="onInput2Change()" />
  </div>

  <div>
  <label for="currency2">Currency 2:</label>
<select id="currency2" [(ngModel)]="currency2">
<option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="UAH">UAH</option>
  </select>
  <input type="text" [(ngModel)]="input2" (ngModelChange)="onInput1Change()" />
  </div>


import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent {
  currency1: string = "USD";
  currency2: string = "EUR";
  input1: string = "1";
  input2: string = "";
  output: number = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.sendRequestToServer();
  }

  sendRequestToServer() {
    const apiKey = "fPxgwzq32YgPjElNj6GZ1YVG4YbgNT0i";
    let url, requestOptions;

    if (this.isInput1Changed()) {
      url = `https://api.apilayer.com/currency_data/convert?to=${this.currency2}&from=${this.currency1}&amount=${this.input1}`;
    } else {
      url = `https://api.apilayer.com/currency_data/convert?to=${this.currency1}&from=${this.currency2}&amount=${this.input2}`;
    }

    const myHeaders = new HttpHeaders().set("apikey", apiKey);

    requestOptions = {
      headers: myHeaders
    };

    this.http.get(url, requestOptions)
      .subscribe(
        (result: any) => {
          this.output = result.result;
          if (this.isInput1Changed()) {
            this.input2 = this.output.toString();
          } else {
            this.input1 = this.output.toString();
          }
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  isInput1Changed() {
    return this.input1 !== this.output.toString();
  }

  updateInput2() {
    this.sendRequestToServer();
  }
}

<div>
  <label for="currency1">Currency 1:</label>
<select id="currency1" [(ngModel)]="currency1" (ngModelChange)="sendRequestToServer()">
<option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="UAH">UAH</option>
  </select>
  <input type="text" [(ngModel)]="input1" (ngModelChange)="sendRequestToServer()" />
  </div>

  <div>
  <label for="currency2">Currency 2:</label>
<select id="currency2" [(ngModel)]="currency2" (ngModelChange)="sendRequestToServer()">
<option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="UAH">UAH</option>
  </select>
  <input type="text" [(ngModel)]="input2" (ngModelChange)="updateInput2()" />
  </div>
