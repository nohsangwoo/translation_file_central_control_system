import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import CompanyTable from 'components/companyinfoTable/CompanyTable.client'
import { useState } from 'react'

const Home: NextPage = () => {
  const [data, setData] = useState<any>([])
  const onFetch = async () => {
    axios.get('http://localhost:3000/api/getScripts').then(res => {
      console.log(res.data)
      setData(res.data.result)
    })
  }

  return (
    <div className={styles.container}>
      <CompanyTable databases={data} />
      <button onClick={onFetch}>fetch data</button>
    </div>
  )
}

export default Home
