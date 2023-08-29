import { HttpRequest, httpResponse } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): httpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
