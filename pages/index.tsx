import type { InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'src/styles/Home.module.css'
import axios from 'axios'
import CompanyTable from 'components/companyinfoTable/CompanyTable.client'
import { useState } from 'react'

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const [data, setData] = useState<any>([])
  const onFetch = async () => {
    axios.get('http://localhost:3000/api/getScripts').then(res => {
      console.log(res.data)
      setData(res.data.result)
    })
  }

  console.log('scripts: ', props.data)

  return (
    <div className={styles.container}>
      {props.data && <CompanyTable scripts={props.data} />}
      <button onClick={onFetch}>fetch data</button>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/api/getScripts')
  const data = res.data.result
  return {
    props: {
      data,
    },
  }
}

export default Home
