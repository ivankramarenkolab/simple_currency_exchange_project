import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyFormComponent } from './currency-form.component';

@NgModule({
  declarations: [CurrencyFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [CurrencyFormComponent]
})
export class CurrencyConverterModule {}
