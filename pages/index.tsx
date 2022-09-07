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

  return (
    <div className={styles.container}>
      <select
        defaultValue={platform}
        onChange={e => {
          setPlatform(e.target.value)
        }}
      >
        {platforms.map((data, index) => {
          return (
            <option key={index} value={data}>
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
