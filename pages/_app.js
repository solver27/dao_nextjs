import '../styles/globals.css'
import { Web3Modal } from '../src/contexts/Web3Modal'
import Head from 'next/head'
import Header from '../src/components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto">
      <Web3Modal>
        <Head>
          <title>DAO</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <main>
          <Component {...pageProps} />
        </main>
      </Web3Modal>
    </div>
  ) 
}

export default MyApp
