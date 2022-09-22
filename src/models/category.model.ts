import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category'
})

const CategoryModel = model('Category', categorySchema)

export default CategoryModel
