import LRUCache from 'lru-cache';
import TimeConverter, { Format } from '../utils/time-convert';

// TODO: cache option configurable from next-core.config.js
const cache = new LRUCache({
  length: (n, key) => n.toString().length + key.toString().length,
  max: 100 * 1000 * 1000,
  // Cache For 1 Day
  maxAge: TimeConverter.target(Format.MILISECONDS).from(Format.DAYS, 1)
});

export default cache;
