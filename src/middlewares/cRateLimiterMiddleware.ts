import { NextFunction, Request, Response } from 'express';
import { isAfter, subSeconds } from 'date-fns';
import { customRateLimiterRepository } from '../rate-limiter/custom-rate-limiter-repository';

export const cRateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ip, url } = request;

    const logs = await customRateLimiterRepository.get(ip as string, url);
    const filteredLogs = logs.filter(
      log => isAfter(log.date, subSeconds(new Date(), 10))
    );

    await customRateLimiterRepository.set(ip as string, url, new Date(), logs.length, filteredLogs.length);

    if (filteredLogs.length >= 5) {
      return response.status(429).json({ message: 'Rate limit' })
    }


    return next()
  } catch (error) {
    return response.status(401).json({ message: 'cRateLimiterMiddleware' });
  }
}
