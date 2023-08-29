import { InvalidParamError } from '../../errors/invalid-param-error'
import { HttpRequest, HttpResponse, badRequest, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'

export interface EmailValidator {
  isValid (email: string): boolean
}

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidatorAdapter: EmailValidator) {
    this.emailValidator = emailValidatorAdapter
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new Error(`Missing param: ${field}`))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: serverError()
      }
    }
  }
}
