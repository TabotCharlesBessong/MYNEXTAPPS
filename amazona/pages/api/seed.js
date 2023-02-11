
import db from '../../utils/db'
import User from "../../models/User";
import Product from '../../models/Product'
import data from "../../utils/data";

const handler = async (req,res) => {
  db.connect()
  await User.deleteMany()
  await User.insertMany(data.users);
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({message:'seeded successfully'})
}

export default handler