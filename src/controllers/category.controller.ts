/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Types } from 'mongoose'
import {
  InvalidIdError,
  MissingFieldError,
  MissingParamError,
  SomethingWrong,
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
      const requiredFields = ['name', 'imageUrl']

      for (const field of requiredFields) {
        if (!body[field]) {
          return ControllerHelper.badRequest(new MissingFieldError(field))
        }
      }
      const category = await this.categoryService.create(body)

      return ControllerHelper.created(category)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Invalid category create data')
      )
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      if (!Types.ObjectId.isValid(params.id)) {
        return ControllerHelper.badRequest(new InvalidIdError('category'))
      }

      const category = await this.categoryService.getOne(params.id)

      return ControllerHelper.ok(category)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Incorrect id param')
      )
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categories = await this.categoryService.getAll()

      return ControllerHelper.ok(categories)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('No categories data')
      )
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      if (!Types.ObjectId.isValid(params.id)) {
        return ControllerHelper.badRequest(new InvalidIdError('category'))
      }

      const body = httpRequest.body

      const allowedUpdates = ['name', 'imageUrl']

      const receiveUpdateNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (receiveUpdateNotAllowed) {
        return ControllerHelper.badRequest(new UpdateNotAllowedError())
      }

      const category = await this.categoryService.update(params.id, body)

      return ControllerHelper.ok(category)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Incorrect id param, invalid category update data')
      )
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllerHelper.badRequest(new MissingParamError('id'))
      }

      if (!Types.ObjectId.isValid(params.id)) {
        return ControllerHelper.badRequest(new InvalidIdError('category'))
      }

      const category = await this.categoryService.delete(params.id)

      return ControllerHelper.ok(category)
    } catch (error) {
      return ControllerHelper.serverError(
        new SomethingWrong('Incorrect id param')
      )
    }
  }
}
