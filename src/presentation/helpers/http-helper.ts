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
