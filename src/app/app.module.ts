import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CurrencyConverterModule } from './currency-form/currency-converter.module';
import { HeaderComponentModule } from "./header/header.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CurrencyConverterModule,
    HeaderComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
