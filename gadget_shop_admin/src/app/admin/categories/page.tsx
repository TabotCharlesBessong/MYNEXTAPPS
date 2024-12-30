"use client"

import { getCategoriesWithProducts } from '@/actions/categories'
import React from 'react'

const page = async () => {
  // fetch categories
  const categories = await getCategoriesWithProducts()
  return (
    <div>Category</div>
  )
}

export default page