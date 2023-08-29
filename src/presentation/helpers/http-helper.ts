import { ServerError } from '../errors/server-error'

export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 400,
    body: new ServerError()
  }
}
