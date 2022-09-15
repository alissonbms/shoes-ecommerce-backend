import Product from './product.entity'

interface Category {
  id: string
  name: string
  imageUrl: string
  products: Product[] // no banco de dados será uma lista de id's
}

export default Category
