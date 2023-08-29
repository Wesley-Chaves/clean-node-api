import { HttpRequest, HttpResponse, badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    return badRequest(new Error('Missing param: name'))
  }
}
