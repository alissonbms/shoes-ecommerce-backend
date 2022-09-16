import ControllerHelper from '../helpers/controller.helper'
import { ProductServiceAbstract } from '../services/product.service'

export interface HttpRequest {
  body?: any
  params?: any // localhost:8080/12 = params = 12
  query?: any // localhost:8080?id="12" = query = 12
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface ProductControllerAbstract {
  create: (httpRequest: HttpRequest) => Promise<HttpResponse>
  getOne: (httpRequest: HttpRequest) => Promise<HttpResponse>
  getAll: () => Promise<HttpResponse>
  update: (httpRequest: HttpRequest) => Promise<HttpResponse>
  delete: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

export class ProductController implements ProductControllerAbstract {
  private readonly productService: ProductServiceAbstract

  constructor(productService: ProductServiceAbstract) {
    this.productService = productService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar os campos obrigatórios
      const body = httpRequest.body

      const requiredFields = ['name', 'imageUrl', 'collection']

      for (const field of requiredFields) {
        if (body[field] === false) {
          return {
            statusCode: 400,
            body: `Missing ${field}.`
          }
        }
      }

      const product = await this.productService.create(body)
      // const productController = new ProductController(new ProductService())
      // productController.create()

      return ControllerHelper.created(product)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido no params
      const params = httpRequest.params

      if (params.id === false) {
        return {
          statusCode: 400,
          body: 'Missing id param'
        }
      }

      const product = await this.productService.getOne(params.id)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async getAll(): Promise<HttpResponse> {
    try {
      const products = await this.productService.getAll()

      return ControllerHelper.ok(products)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido no params
      const params = httpRequest.params

      if (params.id === false) {
        return {
          statusCode: 400,
          body: 'Missing id param'
        }
      }

      // verficar se os campos fornecidos para atualização são permitidos
      const body = httpRequest.body
      // body = {id: '12', name: 'black shoe'}
      // id / name = keys
      // Object.keys(body) = id, name

      const allowedUpdates = ['name', 'imageUrl', 'collection']

      const receiveUpdateNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (receiveUpdateNotAllowed) {
        return {
          statusCode: 400,
          body: 'Some received field is not allowed to update.'
        }
      }

      const product = await this.productService.update(params.id, body)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido no params
      const params = httpRequest.params

      if (params.id === false) {
        return {
          statusCode: 400,
          body: 'Missing id param'
        }
      }

      const product = await this.productService.delete(params.id)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }
}
