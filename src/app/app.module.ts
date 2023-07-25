import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component'; // Переконайтеся, що ви імпортуєте компонент AppComponent
import { CurrencyConverterModule } from './currency-converter.module'; // Імпортуйте модуль

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CurrencyConverterModule, // Додайте CurrencyConverterComponent до масиву 'declarations'
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
