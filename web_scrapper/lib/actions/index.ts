
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

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}
