export interface CurrencyConversionResult {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: number;
    quote: number;
  };
  result: number;
}
