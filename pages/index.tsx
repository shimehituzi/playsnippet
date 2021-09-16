import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Amplify from 'aws-amplify'
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components'
import awsconfig from '../src/aws-exports'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'

Amplify.configure(awsconfig)

const Home: NextPage = () => {
  const [authState, setAuthState] = React.useState<AuthState>()
  const [user, setUser] = React.useState<CognitoUserInterface | undefined>()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData as CognitoUserInterface)
    })
  })

  return authState == AuthState.SignedIn && user ? (
    <React.Fragment>
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
