import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos'
import Product from '../entities/product.entity'
import { ProductRepositoryAbstract } from '../repositories/product.repository'

export interface ProductServiceAbstract {
  create: (createProductDto: CreateProductDto) => Promise<Product>
  getOne: (id: string) => Promise<Product | null>
  getAll: (category?: string) => Promise<Product[]>
  update: (
    id: string,
    updateProductDto: UpdateProductDto
  ) => Promise<Product | null>
  delete: (id: string) => Promise<Product | null>
}

export class ProductService implements ProductServiceAbstract {
  private readonly productRepository: ProductRepositoryAbstract
  // private = só pode ser acessado dentro da classe Product Service
  // readonly = valor setado não pode ser alterado

  constructor(productRepository: ProductRepositoryAbstract) {
    this.productRepository = productRepository
    /* definindo propriedade da classe ".productRepository"
    const productService new ProductService(new MongoProductRepository() | new PostgresProductRepository())
    productService.productRepository = MongoProductRepository | PostresProductRepository
    productService.delete(id: '2') or productService.update(id: '3', name: 'black shoe') */
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(createProductDto)
  }

  async getOne(id: string): Promise<Product | null> {
    return await this.productRepository.getOne(id)
  }

  async getAll(category?: string): Promise<Product[]> {
    return await this.productRepository.getAll(category)
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    return await this.productRepository.update(id, updateProductDto)
  }

  async delete(id: string): Promise<Product | null> {
    return await this.productRepository.delete(id)
  }
}
