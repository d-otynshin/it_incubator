import { NextFunction, Request, Response } from 'express';
import { crateLimiterRepository } from '../cRateLimiter/crateLimiter-repository';
import { isAfter, subSeconds } from 'date-fns';

export const cRateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ip, url } = request;

    const logs = await crateLimiterRepository.get(ip as string, url);
    const filteredLogs = logs.filter(
      log => isAfter(log.date, subSeconds(new Date(), 100))
    );

    if (filteredLogs.length >= 5) {
      return response.status(429).json({ message: 'Rate limit' })
    }

    await crateLimiterRepository.set(ip as string, url, new Date());

    return next()
  } catch (error) {
    return response.status(401).json({ error: '' });
  }
}
