import { NextPage } from 'next'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { useAuth } from '../src/utils/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SignIn: NextPage = () => {
  const { authenticated } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.replace('/')
    }
  }, [authenticated])

  return (
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

export default SignIn
