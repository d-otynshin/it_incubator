import { LimiterModel } from './limiter.enitiry';

export const customRateLimiterRepository = {
  set: async (ip: string, url: string, date: Date, logs: number) => {
    return LimiterModel.insertMany([{ ip, url, date, logs }]);
  },
  get: async (ip: string, url: string) => {
    return LimiterModel.find({ ip, url });
  }
}
