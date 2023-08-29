import { HttpRequest, httpResponse } from '../helpers/http-helper'

export interface Controller {
  handle (httpRequest: HttpRequest): httpResponse
}
