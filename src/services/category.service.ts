import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos'
import Category from '../entities/category.entity'
import { CategoryRepositoryAbstract } from '../repositories/category.repository'

export interface CategoryServiceAbstract {
  create: (createCategoryDto: CreateCategoryDto) => Promise<Category>
  getOne: (id: string) => Promise<Category | null>
  getAll: () => Promise<Category[] | unknown>
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<Category | null>
  delete: (id: string) => Promise<Category>
}

export class CategoryService implements CategoryServiceAbstract {
  private readonly categoryRepository: CategoryRepositoryAbstract

  constructor(categoryRepository: CategoryRepositoryAbstract) {
    this.categoryRepository = categoryRepository
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create(createCategoryDto)
  }

  async getOne(id: string): Promise<Category | null> {
    return await this.categoryRepository.getOne(id)
  }

  async getAll(): Promise<Category[] | unknown> {
    return await this.categoryRepository.getAll()
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category | null> {
    return await this.categoryRepository.update(id, updateCategoryDto)
  }

  async delete(id: string): Promise<Category> {
    return await this.categoryRepository.delete(id)
  }
}
