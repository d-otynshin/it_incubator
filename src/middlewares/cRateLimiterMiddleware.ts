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
    await crateLimiterRepository.set(ip as string, url, new Date());

    const logs = await crateLimiterRepository.get(ip as string, url);

    const tenSecondsAgo = subSeconds(new Date(), 10);
    const lastLogs = logs.filter(log => isAfter(log.date, tenSecondsAgo));

    if (lastLogs.length > 5) {
      return response.status(429).json({ message: 'Rate limit' })
    }

    return next()
  } catch (error) {
    return response.status(401).json({ error: '' });
  }
}
