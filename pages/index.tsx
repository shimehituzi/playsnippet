import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'
import { Button, Grid, Typography } from '@material-ui/core'

const Home: NextPage = () => {
  const { authenticated } = useAuth()

  return authenticated ? (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={6}>
          <Typography variant="h3" color="primary">
            Play Snippet
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Link href={'/posts'}>
            <Button
              component="a"
              variant="outlined"
              color="secondary"
              size="large"
            >
              <Typography variant="h6">Posts</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item md={3}>
          <Button>
            <AmplifySignOut />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : (
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

export default Home
