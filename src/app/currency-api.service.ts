import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private readonly apiUrl = "https://api.apilayer.com/currency_data/convert";
  private readonly apiKey = "ILkLGGAJAUSSBv8BIyhgAQn4csteUCIu";

  constructor(private http: HttpClient) {}

  createRequestUrl(currencyFrom: string, currencyTo: string, amount: number): string {
    return `${this.apiUrl}?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`;
  }

  getRequestOptions(): any {
    const myHeaders = new HttpHeaders().set("apikey", this.apiKey);
    return {
      headers: myHeaders
    };
  }
}
