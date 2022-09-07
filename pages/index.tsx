import type { InferGetServerSidePropsType, NextPage } from 'next'
import styles from 'src/styles/Home.module.css'
import axios from 'axios'
import CompanyTable from 'components/companyinfoTable/CompanyTable.client'
import { dehydrate, useQuery } from '@tanstack/react-query'
import { queryClient } from 'src/api'
import { useState } from 'react'

export const onFetch = async (platform: string) => {
  const result = await axios.get(
    `http://localhost:3000/api/getScripts?platform=${platform}&country=${'ko'}`,
  )
  return JSON.parse(result.data.result)
}
const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const [platform, setPlatform] = useState('videohelpme')
  const platforms = ['videohelpme', 'gotalk']

  const { data, refetch, isLoading } = useQuery(['script', platform], () =>
    onFetch(platform),
  )

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

  return (
    <div className={styles.container}>
      <select
        onChange={e => {
          console.log(e.target.value)
          setPlatform(e.target.value)
        }}
      >
        {platforms.map((data, index) => {
          return (
            <option key={index} value={data} selected={index === 0}>
              {data}
            </option>
          )
        })}
      </select>
      {data && <CompanyTable scripts={data} />}
    </div>
  )
}

export async function getServerSideProps() {
  await queryClient.prefetchQuery(['getScript'], () => onFetch('videohelpme'))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
