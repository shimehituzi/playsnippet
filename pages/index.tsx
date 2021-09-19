import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'

const Home: NextPage = () => {
  const { authenticated } = useAuth()

  return authenticated ? (
    <React.Fragment>
      <AmplifySignOut />
      <h1>Next.js with Amplify</h1>
      <Link href={'/isr'}>
        <a>ISR ページ</a>
      </Link>
    </React.Fragment>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: 'username' },
          { type: 'password' },
          { type: 'email' },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default Home
