import { useEffect, useState } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components'

type AmplifyAuth = {
  user: CognitoUserInterface | undefined
  authenticated: boolean
  isInit: boolean
}

export const useAuth = (): AmplifyAuth => {
  const [user, setUser] = useState<CognitoUserInterface>()
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [authUIState, setAuthUIState] = useState<AuthState>()
  const [isInit, setIsInit] = useState<boolean>(false)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        Amplify.configure({
          aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
        })
        setUser(user as CognitoUserInterface)
        setAuthenticated(true)
        setIsInit(true)
      })
      .catch(() => {
        Amplify.configure({
          aws_appsync_authenticationType: 'API_KEY',
        })
        setUser(undefined)
        setAuthenticated(false)
        setIsInit(true)
      })
  }, [authUIState])

  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((nextAuthUIState) => {
      setAuthUIState(nextAuthUIState)
    })
    return unsubscribe
  }, [])

  return { user, authenticated, isInit }
}
