import { HttpRequest, HttpResponse, badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`Missing param: ${field}`))
      }
    }
  }
}
