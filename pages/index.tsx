import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import LotteryCard from '../components/LotteryCard'
import LotteryHistory from '../components/LotteryHistory'
import { LotteryProvider } from '../context/context'

export default function Home() {
  return (
    <LotteryProvider>
      <div className={styles.container}>
        <Head>
          <title>Lottery App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        
        <main className={styles.main}>
          <LotteryCard />
          
          <div className={styles.historySection}>
            <LotteryHistory />
          </div>
        </main>
      </div>
    </LotteryProvider>
  )
}