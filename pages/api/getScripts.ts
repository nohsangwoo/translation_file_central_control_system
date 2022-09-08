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
  const vh_countrys = ['ko', 'en']
  const gotalk_countrys = [
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

  const getObjectEntries = (platform: query) => {
    // #1.
    // [
    //   [
    //    [key,value],
    //    [key,value],
    //    [key,value],
    //    ...
    //   ],
    //   [
    //    [key,value],
    //    [key,value],
    //    [key,value],
    //    ...
    //   ]
    // ] 형식으로 변환...
    const objEntries = vh_countrys.map(lang => {
      return getScript(platform, lang)
    })

    // #2.
    // [
    //  [
    //    {key:key, value:{ko:"script"},
    //    {key:key, value:{ko:"script"},
    //    {key:key, value:{ko:"script"},
    //    ....
    //   ],
    //  [
    //    {key:key, value:{en:"script"},
    //    {key:key, value:{en:"script"},
    //    {key:key, value:{en:"script"},
    //    ....
    //   ]
    // ]
    // 형식으로 변환
    const makeEntriesInArray = objEntries.map((obj, index) => {
      const makeHashTable = obj.map(eachRow => {
        const [key, value] = eachRow
        return {
          key,
          value: { [vh_countrys[index]]: value },
        }
      })
      return makeHashTable
    })

    return makeEntriesInArray
  }

  const hashTableInArray = getObjectEntries(req.query.platform)

  // console.log('hashTableInArray: ', hashTableInArray[0][0].key)

  let mergedData: any[] = []

  vh_countrys.forEach((country, index) => {
    let result = hashTableInArray[index].map((eachRow, index) => {
      if (eachRow?.key === mergedData?.[index]?.key) {
        return {
          key: eachRow?.key + 'in',
          // ...mergedData?.[index]?.value,
          // ...eachRow?.value,
        }
      }
      return {
        key: eachRow.key + 'out',
        // ...mergedData?.[index]?.value,
        ...eachRow?.value,
      }
    })
    mergedData = [...result]
  })

  console.log('mergedData: ', mergedData)

  res.status(200).json({ result: JSON.stringify(mergedData) })
}
