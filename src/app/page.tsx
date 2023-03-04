import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Post from '@/components/Post'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Hello world!</p>
        <Post />
        <Post />
      </div>
    </main>
  )
}
