/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Types } from 'mongoose'
import {
  InvalidIdError,
  MissingFieldError,
  MissingParamError,
  SomethingWrong,
  UpdateNotAllowedError
} from '../errors/controllers.errors'
import ControllerHelper from '../helpers/controller.helper'
import CategoryModel from '../models/category.model'
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

      const requiredFields = ['name', 'price', 'imageUrl', 'category']

      for (const field of requiredFields) {
        if (!body[field]) {
          return ControllerHelper.badRequest(new MissingFieldError(field))
        }
      }

      const isCategoryValid = await CategoryModel.findById(body.category)

      if (!Types.ObjectId.isValid(body.category) || !isCategoryValid) {
        return ControllerHelper.badRequest(new InvalidIdError('category'))
      }

      const product = await this.productService.create(body)
      // const productController = new ProductController(new ProductService())
      // productController.create()

      return ControllerHelper.created(product)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Invalid product create data')
      )
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido no params
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      if (!Types.ObjectId.isValid(params.id)) {
        return ControllerHelper.badRequest(new InvalidIdError('product'))
      }

      const product = await this.productService.getOne(params.id)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Incorrect id param')
      )
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.query.category) {
        const isCategoryValid = await CategoryModel.findById(
          httpRequest.query.category
        )
        if (!isCategoryValid) {
          return ControllerHelper.badRequest(new InvalidIdError('category'))
        }
      }

      const products = await this.productService.getAll(
        httpRequest.query.category
      )

      return ControllerHelper.ok(products)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('No products data')
      )
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido no params
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      if (!Types.ObjectId.isValid(params.id)) {
        return ControllerHelper.badRequest(new InvalidIdError('product'))
      }

      // verficar se os campos fornecidos para atualização são permitidos
      const body = httpRequest.body
      // body = {id: '12', name: 'black shoe'}
      // id / name = keys
      // Object.keys(body) = id, name

      const allowedUpdates = ['name', 'price', 'imageUrl']

      const receiveUpdateNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (receiveUpdateNotAllowed) {
        return ControllerHelper.badRequest(new UpdateNotAllowedError())
      }

      const product = await this.productService.update(params.id, body)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Incorrect id param, invalid product update data')
      )
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido no params
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      if (!Types.ObjectId.isValid(params.id)) {
        return ControllerHelper.badRequest(new InvalidIdError('product'))
      }

      const product = await this.productService.delete(params.id)

      return ControllerHelper.ok(product)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Incorrect id param')
      )
    }
  }
}
