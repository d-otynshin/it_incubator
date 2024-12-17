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
    deviceId: sessionDB.deviceId,
    ip: sessionDB.ip,
    lastActiveDate: new Date(sessionDB.iat).toString(),
    title: sessionDB.name,
  })
}

