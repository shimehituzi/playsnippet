import { NextPage } from 'next'
import Head from 'next/head'
import { useAuth } from '../src/utils/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthState } from '@aws-amplify/ui-components'
import { Authenticator } from '../src/components/Autenticator'

const SignUp: NextPage = () => {
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
        <title>Sign Up</title>
      </Head>
      <Authenticator authState={AuthState.SignUp} />
    </>
  )
}

export default SignUp
