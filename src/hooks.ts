import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import {
  AuthState,
  CognitoUserInterface,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components'

type AmplifyAuth = {
  user: CognitoUserInterface | undefined
  authenticated: boolean
  authUIState: AuthState | undefined
}

export const useAuth = (): AmplifyAuth => {
  const [user, setUser] = useState<CognitoUserInterface>()
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [authUIState, setAuthUIState] = useState<AuthState>()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user as CognitoUserInterface)
        setAuthenticated(true)
      })
      .catch(() => {
        setUser(null)
        setAuthenticated(false)
      })
  }, [authUIState])

  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((nextAuthUIState) => {
      setAuthUIState(nextAuthUIState)
    })
    return unsubscribe
  }, [])

  return { user, authenticated, authUIState }
}
