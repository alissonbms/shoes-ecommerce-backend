/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  MissingFieldError,
  MissingParamError,
  UpdateNotAllowedError
} from '../errors/controllers.errors'
import ControllerHelper from '../helpers/controller.helper'
import { CategoryServiceAbstract } from '../services/category.service'
import {
  BaseControllerAbstract,
  HttpRequest,
  HttpResponse
} from './base.controller'

export class CategoryController implements BaseControllerAbstract {
  private readonly categoryService: CategoryServiceAbstract

  constructor(categoryService: CategoryServiceAbstract) {
    this.categoryService = categoryService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest.body
      const requiredFields = ['name', 'imageUrl', 'products']

      for (const field of requiredFields) {
        if (!body[field]) {
          return ControllerHelper.badRequest(new MissingFieldError(field))
        }
      }
      const category = await this.categoryService.create(body)

      return ControllerHelper.created(category)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      const category = await this.categoryService.getOne(params.id)

      return ControllerHelper.ok(category)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async getAll(): Promise<HttpResponse> {
    try {
      const categories = await this.categoryService.getAll()

      return ControllerHelper.ok(categories)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      const body = httpRequest.body

      const allowedUpdates = ['name', 'imageUrl', 'products']

      const receiveUpdateNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (receiveUpdateNotAllowed) {
        return ControllerHelper.badRequest(new UpdateNotAllowedError())
      }

      const category = await this.categoryService.update(params.id, body)

      return ControllerHelper.ok(category)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      const category = await this.categoryService.delete(params.id)

      return ControllerHelper.ok(category)
    } catch (error) {
      return ControllerHelper.serverError()
    }
  }
}
