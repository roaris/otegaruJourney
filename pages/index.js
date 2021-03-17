import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'

export default function Home() {
  return (
    <Layout>
      <h1>TopPage</h1>
      <PostCard/>
    </Layout>
  )
}
