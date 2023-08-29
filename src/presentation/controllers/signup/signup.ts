import { InvalidParamError } from '../../errors/invalid-param-error'
import { HttpRequest, HttpResponse, badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`Missing param: ${field}`))
      }
    }

    const { password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }
  }
}
