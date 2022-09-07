// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')

export type getScriptResult = {
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<getScriptResult>,
) {
  type query = string | string[] | undefined
  const getScript = (platform: query, country: query) => {
    const importScript = (p: query, c: query) => {
      return JSON.parse(
        fs.readFileSync(`public/lang/${p}/` + `${c}.json`).toString(),
      )
    }
    return Object.entries(importScript(platform, country))
  }

  const objectEntries = getScript(req.query.platform, req.query.country)

  const result = objectEntries.map(data => {
    const [key, value] = data
    return {
      key,
      value,
    }
  })

  res.status(200).json({ result: JSON.stringify(result) })
}
