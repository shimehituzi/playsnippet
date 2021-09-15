import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <h1>Next.js with Amplify</h1>
      <Link href={'/isr'}>
        <a>ISR ページ</a>
      </Link>
    </React.Fragment>
  )
}

export default Home
