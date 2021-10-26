import { atom } from 'recoil'
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

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    authenticated: false,
    authMode: 'AWS_IAM',
    isInit: false,
  },
})

export const authUIState = atom<AuthUIState | null>({
  key: 'authUIState',
  default: null,
})
