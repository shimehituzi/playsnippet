import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'
import { Button, Grid, Typography } from '@material-ui/core'
import Posts from '../src/container/posts'

const Home: NextPage = () => {
  const { authenticated } = useAuth()

  return (
    <React.Fragment>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item md={12}>
          <Typography variant="h3" color="primary">
            Play Snippet
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Posts />
        </Grid>
        <Grid item md={3}>
          {authenticated ? (
            <Button>
              <AmplifySignOut />
            </Button>
          ) : (
            <Link href={'/signin'}>
              <Button
                component="a"
                variant="contained"
                color="secondary"
                size="large"
              >
                <Typography variant="h6">SingIn</Typography>
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Home
