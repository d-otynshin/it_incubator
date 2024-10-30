import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { FieldNamesType, OutputErrorsType } from '../input-output-types/output-errors-type'

export const errorsHandlerMiddleware = async (
  request: Request,
  response: Response<OutputErrorsType>,
  next: NextFunction
) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    const errorsArray = error.array({ onlyFirstError: true }) as { path: FieldNamesType, msg: string }[]

    response
      .status(400)
      .json({
        errorsMessages: errorsArray.map(error => ({ field: error.path, message: error.msg }))
      })

    return
  }

  next()
}
