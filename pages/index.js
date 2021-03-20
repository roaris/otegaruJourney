import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Map from '../components/Map'
import Intro from '../components/Intro'

export default function Home() {
  return (
    <Layout>
      <Intro/>
      <Map/>
    </Layout>
  )
}
