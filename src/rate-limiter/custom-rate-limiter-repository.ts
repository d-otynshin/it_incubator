import { LimiterModel } from './limiter.enitiry';

export const customRateLimiterRepository = {
  set: async (ip: string, url: string, date: Date) => {
    return LimiterModel.insertMany([{ ip, url, date }]);
  },
  get: async (ip: string, url: string) => {
    return LimiterModel.find({ ip, url });
  }
}
