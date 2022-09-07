import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const onFetch = async () => {
    const res = await fetch("http://localhost:3000/api/getScripts");
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <button onClick={onFetch}>fetch data</button>
    </div>
  );
};

export default Home;
