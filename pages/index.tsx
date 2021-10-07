import React from 'react'
import { NextPage } from 'next'
import { Container } from '@mui/material'
import { PostList } from '../src/view/container/PostList'
import { Appbar } from '../src/view/container/Appbar'

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
