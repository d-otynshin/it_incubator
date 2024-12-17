import { jwtService } from '../adapters/jwt-service';
import { securityRepository } from './security-repository';

export const securityService = {
  getById: async (token: string) => {
    const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
    if (!decodedToken) return null;

    const { userId } = decodedToken;

    return securityRepository.getById(userId);
  },
  terminateSessions: async (token: string) => {
    const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
    if (!decodedToken) return null;

    const { deviceId } = decodedToken;

    return securityRepository.terminateSessions(deviceId);
  },
  terminateSession: async (id: string) => {
    return securityRepository.terminateSessionById(id);
  }
}
