
"use server"

import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scrapper"

export const scrapeAndStoreProduct = async (productUrl:string) => {
  if(!productUrl) return

  try {
    connectToDB()
    const scrappedProduct = await scrapeAmazonProduct(productUrl)

    if(!scrappedProduct) return


  } catch (error:any) {
    // console.log(error)
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}