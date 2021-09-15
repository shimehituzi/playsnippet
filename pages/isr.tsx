import React from 'react'
import { NextPage, GetStaticProps } from 'next'

type Props = {
  timestamp: string
}

const ISR: NextPage<Props> = (props) => {
  const csrTime = new Date().toLocaleString()

  return (
    <React.Fragment>
      <h1>ISR ページ</h1>
      <p>CSR time: {csrTime}</p>
      <p>ISR time: {props.timestamp}</p>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      timestamp: new Date().toLocaleString(),
    },
    revalidate: 5,
  }
}

export default ISR
