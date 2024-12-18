import { NextFunction, Request, Response } from 'express';
import { crateLimiterRepository } from '../cRateLimiter/crateLimiter-repository';

export const cRateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ip, url } = request;

    await crateLimiterRepository.set(ip as string, url, new Date());

    const requests = await crateLimiterRepository.get(ip as string, url);

    if (requests.length > 5) {
      return response.status(429).json({ message: 'Rate limit' })
    }

    return next()
  } catch (error) {
    return response.status(401).json({ error: '' });
  }
}