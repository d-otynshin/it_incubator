import { Request, Response, NextFunction } from 'express';
export const ADMIN_AUTH = 'admin:qwerty'

export const fromUTF8ToBase64 = (code: string) => {
  const buff2 = Buffer.from(code, 'utf8')
  return buff2.toString('base64')
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization']

  if (!auth) {
    return res.status(401).json({ message: 'not authorized' })
  }

  if (auth.slice(0, 6) !== 'Basic ') {
    res
      .status(401)
      .json({ message: 'not basic type, not authorized' })

    return
  }

  const codedAuth = fromUTF8ToBase64(ADMIN_AUTH)

  if (auth.slice(6) !== codedAuth) {
    res
      .status(401)
      .json({})

    return
  }

  next()

  return
}
