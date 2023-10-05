
"use server"

import Product from "../model/product.model"
import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scrapper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils"
import { revalidatePath } from "next/cache"

export const scrapeAndStoreProduct = async (productUrl:string) => {
  if(!productUrl) return

  try {
    connectToDB()
    const scrappedProduct = await scrapeAmazonProduct(productUrl)

    if(!scrappedProduct) return

    let product = scrappedProduct

    const existingProduct = await Product.findOne({url:scrappedProduct.url})

    if(existingProduct){
      const updatedPriceHistory : any = [
        ...existingProduct.priceHistory,
        {price:scrappedProduct.currentPrice}
      ]

      product = {
        ...scrappedProduct,
        priceHistory:updatedPriceHistory,
        lowestPrice:getLowestPrice(updatedPriceHistory),
        highestPrice:getHighestPrice(updatedPriceHistory),
        averagePrice:getAveragePrice(updatedPriceHistory)
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      {url:scrappedProduct.url},
      product,
      {
        upsert:true,new:true
      }
    )

    revalidatePath(`/products/${newProduct._id}`)

  } catch (error:any) {
    // console.log(error)
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}