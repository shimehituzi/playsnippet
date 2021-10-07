import React from 'react'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { AuthState } from '@aws-amplify/ui-components'

type Props = {
  authState: AuthState.SignIn | AuthState.SignUp
}

export const Authenticator: React.FC<Props> = ({ authState }) => {
  return (
    <AmplifyAuthenticator initialAuthState={authState}>
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
