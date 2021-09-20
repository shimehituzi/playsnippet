import React from 'react'
import { NextPage } from 'next'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'

const Posts: NextPage = () => {
  const { authenticated } = useAuth()

  return (
    <React.Fragment>
      { authenticated && <AmplifySignOut/> }
      <p>post page</p>
    </React.Fragment>
  )
}

export default Posts
