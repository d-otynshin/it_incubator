import { NextFunction, Request, Response } from 'express';
import { crateLimiterRepository } from '../cRateLimiter/crateLimiter-repository';

export const cRateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { ip, baseUrl } = request;

    await crateLimiterRepository.set(ip as string, baseUrl, new Date());

    const requests = await crateLimiterRepository.get(ip as string, baseUrl);

    if (requests.length > 5) {
      return response.status(429).json({ message: 'Rate limit' })
    }

    return next()
  } catch (error) {
    return response.status(401).json({ error: '' });
  }
}
