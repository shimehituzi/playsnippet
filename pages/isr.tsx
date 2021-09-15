import React from 'react'
import { NextPage, GetStaticProps } from 'next'

type Props = {
  date: string
  timestamp: number
}

const ISR: NextPage<Props> = (props) => {
  const csrDate = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
  const csrTime = new Date().getTime()
  const diff = csrTime - props.timestamp

  return (
    <React.Fragment>
      <h1>ISR ページ</h1>
      <p>CSR date: {csrDate}</p>
      <p>ISR date: {props.date}</p>
      <p>diff: {diff}</p>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      timestamp: new Date().getTime(),
      date: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    },
    revalidate: 5,
  }
}

export default ISR
