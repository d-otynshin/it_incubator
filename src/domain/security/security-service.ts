import { jwtService } from '../../adapters/jwt-service';
import { securityRepository } from './security-repository';

export const securityService = {
  getById: async (id: string) => {
    return securityRepository.getSession(id);
  },
  getByUserId: async (token: string) => {
    const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
    if (!decodedToken) return null;

    const { userId } = decodedToken;

    return securityRepository.getSessions(userId);
  },
  terminateSessions: async (token: string) => {
    const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
    if (!decodedToken) return null;

    const { deviceId } = decodedToken;

    return securityRepository.terminateSessions(deviceId);
  },
  terminateSession: async (id: string) => {
    return securityRepository.terminateSessionById(id);
  },
  isValid: async (token: string): Promise<boolean | null> => {
    const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
    if (!decodedToken) return null;

    const { deviceId, iat } = decodedToken;

    const session = await securityRepository.getSession(deviceId);
    if (!session) return null;

    const { deviceId: sDeviceId, iat: siat } = session;
    if (sDeviceId === deviceId && iat === siat) return true;

    return null;
  },
  updateSession: async (deviceId: string, iat: number) => {
    return securityRepository.updateSession(deviceId, iat)
  },
  createSession: async (session: any) => {
    return securityRepository.createSession(session);
  }
}
