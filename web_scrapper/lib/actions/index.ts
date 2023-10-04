
"use server"

import { scrapeAmazonProduct } from "../scrapper"

export const scrapeAndStoreProduct = async (productUrl:string) => {
  if(!productUrl) return

  try {
    const scrappedProduct = await scrapeAmazonProduct(productUrl)
  } catch (error:any) {
    // console.log(error)
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}