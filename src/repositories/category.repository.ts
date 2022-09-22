import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos'
import Category from '../entities/category.entity'
import Product from '../entities/product.entity'
import MongooseHelper from '../helpers/mongoose.helper'
import CategoryModel from '../models/category.model'

export interface CategoryRepositoryAbstract {
  create: (createCategoryDto: CreateCategoryDto) => Promise<Category>
  getOne: (id: string) => Promise<Category | null>
  getAll: () => Promise<Category[]>
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<Category | null>
  delete: (id: string) => Promise<Category | null>
}

export class MongoCategoryRepository implements CategoryRepositoryAbstract {
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await CategoryModel.create(createCategoryDto)

    return MongooseHelper.map<Category>(category.toJSON())
  }

  async getOne(id: string): Promise<Category | null> {
    const categoryById = await CategoryModel.findById(id).populate({
      path: 'products',
      perDocumentLimit: 4
    })
    const category = MongooseHelper.map<Category>(categoryById?.toJSON())

    return {
      ...category,
      products: category.products.map((product: any) =>
        MongooseHelper.map<Product>(product)
      )
    }
  }

  async getAll(): Promise<Category[]> {
    const categories: Category[] = await CategoryModel.find({}).populate({
      path: 'products',
      perDocumentLimit: 4
    })

    return categories.map((category: any) => {
      return {
        ...MongooseHelper.map<Category>(category.toJSON()),
        products: category.products.map((product: any) =>
          MongooseHelper.map<Product>(product.toJSON())
        )
      }
    })
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

  async delete(id: string): Promise<Category | null> {
    const category = await CategoryModel.findByIdAndDelete(id)

    return MongooseHelper.map<Category>(category?.toJSON())
  }
}
