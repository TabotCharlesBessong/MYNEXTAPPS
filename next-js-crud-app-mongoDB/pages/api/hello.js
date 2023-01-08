// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../database/connection'

export default function handler(req, res) {
  connectDB()
  res.status(200).json({ name: 'John Doe' })
}
