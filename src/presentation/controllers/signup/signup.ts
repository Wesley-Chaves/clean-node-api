export interface HttpRequest {
  body?: any
}

export interface httpResponse {
  statusCode: number
  body: any
}

export interface Controller {
  handle (httpRequest: HttpRequest): httpResponse
}

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): httpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
