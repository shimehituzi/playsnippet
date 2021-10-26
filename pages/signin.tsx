import { NextPage } from 'next'
import Head from 'next/head'
import { useAuth } from '../src/utils/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthState } from '@aws-amplify/ui-components'
import { Authenticator } from '../src/components/Autenticator'

const SignIn: NextPage = () => {
  const { authenticated } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.replace('/')
    }
  }, [authenticated])

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Authenticator authState={AuthState.SignIn} />
    </>
  )
}

export default SignIn
