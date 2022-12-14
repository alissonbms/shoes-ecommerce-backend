/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos'
import Product from '../entities/product.entity'
import MongooseHelper from '../helpers/mongoose.helper'
import ProductModel from '../models/product.model'

export interface ProductRepositoryAbstract {
  create: (createProductDto: CreateProductDto) => Promise<Product>
  getOne: (id: string) => Promise<Product | null>
  getAll: (category?: string) => Promise<Product[]>
  update: (
    id: string,
    updateProductDto: UpdateProductDto
  ) => Promise<Product | null>
  delete: (id: string) => Promise<Product | null>
}

export class MongoProductRepository implements ProductRepositoryAbstract {
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await ProductModel.create(createProductDto)

    return MongooseHelper.map<Product>(product.toJSON())
  }

  async getOne(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id)

    return MongooseHelper.map<Product>(product?.toJSON())
    // "product?" pois o objeto product pode ser posivelmente "null"
  }

  async getAll(category?: string): Promise<Product[]> {
    let products: Product[] = []

    if (category) {
      products = await ProductModel.find({ category })
    } else {
      products = await ProductModel.find({})
    }

    return products?.map((product: any) =>
      MongooseHelper.map<Product>(product.toJSON())
    )
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(id, updateProductDto, {
      new: true
    })

    return MongooseHelper.map<Product>(product?.toJSON())
  }

  async delete(id: string): Promise<Product | null> {
    const product = await ProductModel.findByIdAndDelete(id)

    return MongooseHelper.map<Product>(product?.toJSON())
  }
}
