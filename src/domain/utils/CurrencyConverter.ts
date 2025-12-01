import type { Currency } from '../entities/Asset';

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
const CACHE_KEY = 'currency_rate_cache';

interface CacheData {
  rate: number;
  timestamp: number;
}

let currentRate = 16000; // Default fallback

export const fetchExchangeRate = async (): Promise<void> => {
  try {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { rate, timestamp }: CacheData = JSON.parse(cached);
      const cachedDate = new Date(timestamp).toDateString();
      const today = new Date().toDateString();

      if (cachedDate === today) {
        console.log('Using cached exchange rate:', rate);
        currentRate = rate;
        return;
      }
    }

    // Fetch from API
    console.log('Fetching fresh exchange rate...');
    const response = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=IDR&base=USD`);
    const data = await response.json();

    if (data && data.rates && data.rates.IDR) {
      const rate = parseFloat(data.rates.IDR);
      currentRate = rate;

      // Update cache
      const cacheData: CacheData = {
        rate,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      console.log('Updated exchange rate:', rate);
    }
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    // Keep using default or cached value on error
  }
};

export const convertToIDR = (value: number, currency: Currency): number => {
  if (currency === 'IDR') return value;
  if (currency === 'USD') return value * currentRate;
  return value;
};
