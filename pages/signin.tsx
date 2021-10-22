import { NextPage } from 'next'
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

  return <Authenticator authState={AuthState.SignIn} />
}

export default SignIn
