export interface CreateProductDto {
  name: string
  imageUrl: string
  collection: string
} // contém todos os campos que devem ser necessariamente enviados para criar um produto

export interface UpdateProductDto {
  name?: string
  imageUrl?: string
  collection?: string
} // contém todos os campos que devem ser necessariamente enviados para atualizar um produto
