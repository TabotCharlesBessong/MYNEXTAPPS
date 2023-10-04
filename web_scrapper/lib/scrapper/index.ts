"use server"

import axios from "axios";
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export const scrapeAmazonProduct = async (url:string) => {
  if(!url) return

  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const host = String(process.env.BRIGHT_DATA_HOST);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225
  const session_id = (1000000 * Math.random()) | 0
  const options = {
    auth:{
      username:`${username}-session-${session_id}`,
      password
    },
    host:'brd.superproxy.io',
    port,
    rejectUnauthorized:false
  }

  try {
    // fetch the product page 
    const response = await axios.post(url,options)
    const $ = cheerio.load(response.data)
    
    // extract the product title
    // getElement by Id
    // query selector
    const title = $('#productTitle').text().trim()
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    const description = extractDescription($);

    // console.log({currentPrice,originalPrice,title})

    // construct data object with scrapped information
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    console.log(data)

    return data;
    // console.log(title)
  } catch (error:any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
} 