export interface Chat {
  title: string;
  options: Option[];
  isAnswer: boolean;
}

export interface Option {
  code: string;
  label: string;
}

export interface Exchange {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
}

export interface Stock {
  code: string;
  stockName: string;
  price: number;
}

export enum Messages {
  WELCOME = "Hello! Welcome to LSEG. I'm here to help you.",
  EXCHANGE_SELECT = "Please select a Stock Exchange.",
  STOCK_SELECT = "Please select a stock",
  STOCK_PRICE = "Stock price of {{stock}} is {{price}}. Please select an option.",
  ERROR = "No option found. Please start over.",
}

export enum NavigationCodes {
  MENU = "menu",
  BACK = "back",
}
