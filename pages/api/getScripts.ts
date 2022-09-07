// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')
import data from './../../public/lang/gotalk/en.json'

type Data = {
  result: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log('data: ')
  res.status(200).json({ result: data })
}
