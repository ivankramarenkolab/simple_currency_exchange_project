import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private readonly apiUrl = "https://api.apilayer.com/currency_data/convert";
  private readonly apiKey = "ILkLGGAJAUSSBv8BIyhgAQn4csteUCIu";

  constructor(private http: HttpClient) {}

  createRequestUrl(currencyTo: string, currencyFrom: string, amount: number): string {
    return `${this.apiUrl}?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`;
    // Використовуємо шаблонні рядки для складання URL
  }

  getRequestOptions(): any {
    const apiKey = new HttpHeaders().set("apikey", this.apiKey);
    return {
      headers: apiKey
    };
  }

  convertCurrency(currencyTo: string, currencyFrom: string, amount: number): Observable<any> {
    const url = this.createRequestUrl(currencyTo, currencyFrom, amount);
    const requestOptions = this.getRequestOptions();
    return this.http.get(url, requestOptions);
  }
}
