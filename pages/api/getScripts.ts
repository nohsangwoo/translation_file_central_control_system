// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')

export type getScriptResult = {
  result: string
}
type query = string | string[] | undefined

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<getScriptResult>,
) {
  const countrys = [
    'ko',
    'en',
    'ar',
    'de',
    'es',
    'fr',
    'ja',
    'pt-BR',
    'ru',
    'tr',
    'vi',
    'zh_TW',
    'zh',
  ]
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
