import { useEffect, useState } from 'react'
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components'

type AmplifyAuth = {
  user: CognitoUserInterface | undefined
  authenticated: boolean
  authState: AuthState
}

export const useAuth = (): AmplifyAuth => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<CognitoUserInterface | undefined>()
  const [authenticated, setAuthenticated] = useState<boolean>()
  const unsubscribe = onAuthUIStateChange((nextAuthState, authData) => {
    setAuthState(nextAuthState)
    setUser(authData as CognitoUserInterface)
  })

  useEffect(() => {
    setAuthenticated(authState == AuthState.SignedIn && user !== undefined)
  }, [user, authState])

  useEffect(() => {
    return unsubscribe
  }, [])

  return { user, authenticated, authState }
}
