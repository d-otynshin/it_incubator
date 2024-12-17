export type TSessionDb = {
  _id: string;
  userId: string;
  deviceId: number;
  ip: string;
  name: string;
  exp: number;
  iat: number;
};

export const mapSession = (sessionDB: TSessionDb) => {
  return ({
    deviceId: String(sessionDB.deviceId),
    ip: sessionDB.ip,
    lastActiveDate: new Date(sessionDB.iat * 1000).toISOString(),
    title: sessionDB.name,
  })
}

