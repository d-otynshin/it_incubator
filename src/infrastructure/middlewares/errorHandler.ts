import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export type Error = {
  message: string;
  field: string;
}

export type OutputErrorsType = {
  errorsMessages: Error[]
}

export const errorsHandlerMiddleware = (status = 400) => async (
  request: Request,
  response: Response<OutputErrorsType>,
  next: NextFunction
) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    const errorsArray = error.array({ onlyFirstError: true }) as { path: string, msg: string }[]

    response
      .status(status)
      .json({
        errorsMessages: errorsArray.map(error => ({ field: error.path, message: error.msg }))
      })

    return
  }

  next()
}
