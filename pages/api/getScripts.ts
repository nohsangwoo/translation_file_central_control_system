// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')
import data from './../../public/lang/gotalk/ko.json'

export type getScriptResult = {
  // result: {
  //   key: string
  //   value: string
  // }[]
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<getScriptResult>,
) {
  const objectEntries = Object.entries(data)

  console.log('objectEntries: ', objectEntries)

  const result = objectEntries.map(data => {
    const [key, value] = data
    return {
      key,
      value,
    }
  })

  res.status(200).json({ result: JSON.stringify(result) })
}
