import React from 'react'
import { NextPage } from 'next'
import { Container } from '@mui/material'
import { PostList } from '../src/components/PostList'
import { Appbar } from '../src/components/Appbar'

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
