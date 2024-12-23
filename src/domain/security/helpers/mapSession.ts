import { TSessionDb } from '../sessions.entity';

export const mapSession = (sessionDB: TSessionDb) => {
  return ({
    deviceId: sessionDB.deviceId,
    ip: sessionDB.ip,
    lastActiveDate: new Date(sessionDB.iat * 1000).toISOString(),
    title: sessionDB.name,
  })
}

