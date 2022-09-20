import {
  MissingFieldError,
  MissingParamError,
  UpdateNotAllowedError
} from '../errors/controllers.errors'
import ControllerHelper from '../helpers/controller.helper'
import { ProductServiceAbstract } from '../services/product.service'
import {
  BaseControllerAbstract,
  HttpRequest,
  HttpResponse
} from './base.controller'

export class ProductController implements BaseControllerAbstract {
  private readonly productService: ProductServiceAbstract

  constructor(productService: ProductServiceAbstract) {
    this.productService = productService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar os campos obrigatórios
      const body = httpRequest.body

      const requiredFields = ['name', 'imageUrl', 'category']

      for (const field of requiredFields) {
        if (body[field] === false) {
          return ControllerHelper.badRequest(new MissingFieldError(field))
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
        return ControllerHelper.badRequest(new MissingParamError('id'))
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
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      // verficar se os campos fornecidos para atualização são permitidos
      const body = httpRequest.body
      // body = {id: '12', name: 'black shoe'}
      // id / name = keys
      // Object.keys(body) = id, name

      const allowedUpdates = ['name', 'imageUrl', 'category']

      const receiveUpdateNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (receiveUpdateNotAllowed) {
        return ControllerHelper.badRequest(new UpdateNotAllowedError())
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
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      const product = await this.productService.delete(params.id)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }
}
