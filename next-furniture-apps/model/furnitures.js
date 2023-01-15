
import {Schema,models,model} from 'mongoose'

const furnitureSchema = new Schema({
  name:String,
  price:Number,
  description:String,
  image:String,
  category:String,
})

const Furniture = models.Furniture || model('Furniture',furnitureSchema)

export default Furniture