import type { InferGetServerSidePropsType, NextPage } from 'next'
import styles from 'src/styles/Home.module.css'
import axios from 'axios'
import CompanyTable from 'components/companyinfoTable/CompanyTable.client'
import { dehydrate, useQuery } from '@tanstack/react-query'
import { queryClient } from 'src/api'

export const onFetch = async () => {
  const result = await axios.get(
    `http://localhost:3000/api/getScripts?platform=${'gotalk'}&country=${'zh'}`,
  )
  return JSON.parse(result.data.result)
}
const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { data, refetch, isLoading } = useQuery(['getScript'], onFetch)

  console.log('fetching scriptsdata : ', data)

  return (
    <div className={styles.container}>
      {data && <CompanyTable scripts={data} />}
      <button onClick={onFetch}>fetch data</button>
    </div>
  )
}

export async function getServerSideProps() {
  await queryClient.prefetchQuery(['getScript'], () => onFetch())
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
