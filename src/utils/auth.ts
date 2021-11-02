import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import {
  AuthState as AuthUIState,
  CognitoUserInterface,
} from '@aws-amplify/ui-components'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'

type AuthMode = keyof typeof GRAPHQL_AUTH_MODE

export type AuthState = {
  user: CognitoUserInterface | null
  authenticated: boolean
  authMode: AuthMode
  isInit: boolean
}

export const useAuth = (): AuthState => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    authenticated: false,
    authMode: 'AWS_IAM',
    isInit: false,
  })
  const [authUIState, setAuthUIState] = useState<AuthUIState | null>(null)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setAuth({
          user: user,
          authenticated: true,
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          isInit: true,
        })
      })
      .catch(() => {
        setAuth({
          user: null,
          authenticated: false,
          authMode: 'AWS_IAM',
          isInit: true,
        })
      })
  }, [authUIState])

  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((nextAuthUIState) => {
      setAuthUIState(nextAuthUIState)
    })
    return unsubscribe
  }, [])

  return auth
}
