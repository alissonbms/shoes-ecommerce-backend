import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos'
import Product from '../entities/product.entity'
import MongooseHelper from '../helpers/mongoose.helper'
import ProductModel from '../models/product.model'

export interface ProductRepositoryAbstract {
  create: (createProductDto: CreateProductDto) => Promise<Product>
  getOne: (id: string) => Promise<Product | null>
  getAll: () => Promise<Product[] | unknown>
  update: (
    id: string,
    updateProductDto: UpdateProductDto
  ) => Promise<Product | null>
}

export class MongoProductRepository implements ProductRepositoryAbstract {
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await ProductModel.create(createProductDto)

    return MongooseHelper.map(product.toJSON())
  }

  async getOne(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id)

    return MongooseHelper.map(product?.toJSON())
    // "product?" pois o objeto product pode ser posivelmente "null"
  }

  async getAll(): Promise<Product[] | unknown> {
    const products: Product[] | null = await ProductModel.findById({})

    return products?.map((product: any) => MongooseHelper.map(product.toJSON()))
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(id, updateProductDto, {
      new: true
    })

    return MongooseHelper.map(product?.toJSON())
  }
}
