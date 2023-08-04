import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyFormComponent } from './currency-form.component';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [CurrencyFormComponent],
  imports: [CommonModule, FormsModule, NgSelectModule,],
  exports: [CurrencyFormComponent]
})
export class CurrencyConverterModule {}
