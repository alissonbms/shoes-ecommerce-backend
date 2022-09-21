import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos'
import Category from '../entities/category.entity'
import MongooseHelper from '../helpers/mongoose.helper'
import CategoryModel from '../models/category.model'

export interface CategoryRepositoryAbstract {
  create: (createCategoryDto: CreateCategoryDto) => Promise<Category>
  getOne: (id: string) => Promise<Category | null>
  getAll: () => Promise<Category[] | unknown>
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<Category | null>
  delete: (id: string) => Promise<Category>
}

export class MongoCategoryRepository implements CategoryRepositoryAbstract {
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await CategoryModel.create(createCategoryDto)

    return MongooseHelper.map<Category>(category.toJSON())
  }

  async getOne(id: string): Promise<Category | null> {
    const category = await CategoryModel.findById(id)

    return MongooseHelper.map<Category>(category?.toJSON())
  }

  async getAll(): Promise<Category | unknown> {
    const categories = await CategoryModel.find({})

    return categories.map((category) =>
      MongooseHelper.map<Category>(category.toJSON())
    )
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category | null> {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true }
    )

    return MongooseHelper.map<Category>(category?.toJSON())
  }

  async delete(id: string): Promise<Category> {
    const category = await CategoryModel.findByIdAndDelete(id)

    return MongooseHelper.map<Category>(category?.toJSON())
  }
}
