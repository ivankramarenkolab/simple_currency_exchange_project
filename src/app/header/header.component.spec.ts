import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CurrencyApiService } from '../currency-api.service';
import { of } from 'rxjs';
import { CurrencyConversionResult } from '../currency-conversion-result';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let currencyApiServiceSpy: jasmine.SpyObj<CurrencyApiService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CurrencyApiService', ['convertCurrency']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: CurrencyApiService, useValue: spy }],
    }).compileComponents();

    currencyApiServiceSpy = TestBed.inject(CurrencyApiService) as jasmine.SpyObj<CurrencyApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch currency rates', () => {
    const usdResult: CurrencyConversionResult = {
      success: true,
      query: { from: 'UAH', to: 'USD', amount: 1 },
      info: { timestamp: 1234567890, quote: 0.03 },
      result: 1.5
    };
    const eurResult: CurrencyConversionResult = {
      success: true,
      query: { from: 'UAH', to: 'EUR', amount: 1 },
      info: { timestamp: 1234567890, quote: 0.02 },
      result: 1.2
    };

    currencyApiServiceSpy.convertCurrency.and.returnValues(of(usdResult), of(eurResult));

    component.ngOnInit();

    expect(component.uahToUsd).toEqual(usdResult.result);
    expect(component.uahToEur).toEqual(eurResult.result);
  });
});
