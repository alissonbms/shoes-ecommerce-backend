export interface HttpRequest {
  body?: any
  params?: any // localhost:8080/12 = params = 12
  query?: any // localhost:8080?id="12" = query = 12
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface BaseControllerAbstract {
  create: (httpRequest: HttpRequest) => Promise<HttpResponse>
  getOne: (httpRequest: HttpRequest) => Promise<HttpResponse>
  getAll: () => Promise<HttpResponse>
  update: (httpRequest: HttpRequest) => Promise<HttpResponse>
  delete: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

export type ControllerMethods =
  | 'create'
  | 'getOne'
  | 'getAll'
  | 'getAll'
  | 'delete'
