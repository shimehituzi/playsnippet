import { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { AuthState, authState, authUIState } from '../state/authState'

export const useAuthInit = (): void => {
  const setAuth = useSetRecoilState(authState)
  const [authUI, setAuthUI] = useRecoilState(authUIState)

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
  }, [authUI])

  useEffect(() => {
    const unsubscribe = onAuthUIStateChange((nextAuthUIState) => {
      setAuthUI(nextAuthUIState)
    })
    return unsubscribe
  }, [])
}

export const useAuth = (): AuthState => {
  const auth = useRecoilValue(authState)
  return auth
}
