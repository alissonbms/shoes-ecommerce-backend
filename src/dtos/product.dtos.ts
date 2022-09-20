export interface CreateProductDto {
  name: string
  price: number
  imageUrl: string
  category: string
} // contém todos os campos que devem ser necessariamente enviados para criar um produto

export interface UpdateProductDto {
  name?: string
  price?: number
  imageUrl?: string
  category?: string
} // contém todos os campos que devem ser necessariamente enviados para atualizar um produto
