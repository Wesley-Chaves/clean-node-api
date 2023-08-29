import { HttpRequest, HttpResponse } from '../helpers/http-helper'

export interface Controller {
  handle (httpRequest: HttpRequest): HttpResponse
}
