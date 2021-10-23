import React from 'react'
import { NextPage } from 'next'
import { PostList } from '../src/components/PostList'
import { Appbar } from '../src/components/Appbar'
import { Container } from '@mui/material'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>
        <PostList />
      </Container>
    </React.Fragment>
  )
}

export default Home
