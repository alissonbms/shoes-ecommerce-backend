import { HttpResponse } from '../controllers/base.controller'

const ControllerHelper = {
  serverError(error: Error): HttpResponse {
    return { statusCode: 500, body: error }
  },

  ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body
    }
  },

  created(body: any): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  },

  badRequest(error: Error): HttpResponse {
    return { statusCode: 400, body: error }
  }
}

export default ControllerHelper
