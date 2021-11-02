import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { CognitoUserInterface } from '@aws-amplify/ui-components'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'

type AuthMode = keyof typeof GRAPHQL_AUTH_MODE

export type AuthState = {
  user: CognitoUserInterface | null
  authenticated: boolean
  authMode: AuthMode
  isInit: boolean
}

const getSignOutState = (): AuthState => ({
  user: null,
  authenticated: false,
  authMode: 'AWS_IAM',
  isInit: false,
})

const getSignInState = (user: CognitoUserInterface): AuthState => ({
  user: user,
  authenticated: true,
  authMode: 'AMAZON_COGNITO_USER_POOLS',
  isInit: true,
})

export const useAuth = (): AuthState => {
  const [auth, setAuth] = useState<AuthState>(getSignOutState())

  const signIn = (user: CognitoUserInterface) => setAuth(getSignInState(user))
  const signOut = () => setAuth(getSignOutState())

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => signIn(user))
      .catch(() => signOut())
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((_, user) => {
      if (user !== undefined) {
        signIn(user as CognitoUserInterface)
      } else {
        signOut()
      }
    })
    return unsubscribe
  }, [])

  return auth
}
