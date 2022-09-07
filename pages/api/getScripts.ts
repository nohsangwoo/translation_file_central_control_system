// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')
import gotalk_ko from './../../public/lang/gotalk/ko.json'
import gotalk_en from './../../public/lang/gotalk/en.json'

export type getScriptResult = {
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<getScriptResult>,
) {
  // const objectEntries = Object.entries(gotalk_ko)

  const countrys = [
    'ar',
    'de',
    'en',
    'es',
    'fr',
    'ja',
    'ko',
    'pt-BR',
    'ru',
    'tr',
    'vi',
    'zh_TW',
    'zh',
  ]

  console.log('req query: ', req.query)

  type query = string | string[] | undefined
  const getScript = (platform: query, country: query) => {
    const importScript = (p: query, c: query) => {
      return JSON.parse(
        fs.readFileSync(`public/lang/${p}/` + `${c}.json`).toString(),
      )
    }
    return Object.entries(importScript(req.query.platform, req.query.country))
  }

  const objectEntries = getScript('gotalk', 'zh')
  // console.log('objectEntries: ', objectEntries)

  const result = objectEntries.map(data => {
    const [key, value] = data
    return {
      key,
      value,
    }
  })

  res.status(200).json({ result: JSON.stringify(result) })
}
