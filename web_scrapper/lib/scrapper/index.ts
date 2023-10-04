"use server"

import axios from "axios";
import * as cheerio from "cheerio"

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
    console.log(response.data)
  } catch (error:any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
} 