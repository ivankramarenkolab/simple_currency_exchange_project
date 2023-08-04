import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyConversionResult } from './currency-conversion-result';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private readonly apiUrl = "https://api.apilayer.com/currency_data/convert";
  private readonly apiKey = "ILkLGGAJAUSSBv8BIyhgAQn4csteUCIu";

  constructor(private http: HttpClient) {}

  createRequestUrl(currencyTo: string, currencyFrom: string, amount: number): string {
    return `${this.apiUrl}?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`;
  }

  convertCurrency(currencyTo: string, currencyFrom: string, amount: number): Observable<CurrencyConversionResult> {
    const url = this.createRequestUrl(currencyTo, currencyFrom, amount);
    const headers = new HttpHeaders().set("apikey", this.apiKey);
    return this.http.get<CurrencyConversionResult>(url, { headers });
  }

  formatNumber(number: number): number {
    return +number.toFixed(2);
  }
}
