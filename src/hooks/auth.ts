import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components'

type AuthMode = 'API_KEY' | 'AMAZON_COGNITO_USER_POOLS'

type AmplifyAuth = {
  user: CognitoUserInterface | undefined
  authenticated: boolean
  authMode: AuthMode
  authUIState: AuthState | undefined
  isInit: boolean
}

export const useAuth = (): AmplifyAuth => {
  const [user, setUser] = useState<CognitoUserInterface>()
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [authMode, setAuthMode] = useState<AuthMode>('API_KEY')
  const [authUIState, setAuthUIState] = useState<AuthState>()
  const [isInit, setIsInit] = useState<boolean>(false)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user as CognitoUserInterface)
        setAuthenticated(true)
        setAuthMode('AMAZON_COGNITO_USER_POOLS')
        setIsInit(true)
      })
      .catch(() => {
        setUser(undefined)
        setAuthenticated(false)
        setAuthMode('API_KEY')
        setIsInit(true)
      })
  }, [authUIState])

  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((nextAuthUIState) => {
      setAuthUIState(nextAuthUIState)
    })
    return unsubscribe
  }, [])

  return { user, authenticated, authMode, authUIState, isInit }
}
