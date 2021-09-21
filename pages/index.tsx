import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Container,
  Paper,
} from '@material-ui/core'
import PostList from '../src/container/postList'

const useStyle = makeStyles({
  padding: {
    padding: '3%',
    margin: '1%',
  },
})

const Home: NextPage = () => {
  const { authenticated } = useAuth()

  const classes = useStyle()

  return (
    <React.Fragment>
      <Container>
        <Paper elevation={10} square>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={4}
            className={classes.padding}
          >
            <Grid item md={6}>
              <Typography variant="h3" color="primary">
                Play Snippet
              </Typography>
            </Grid>
            <Grid item md={6}>
              {authenticated ? (
                <Button>
                  <AmplifySignOut />
                </Button>
              ) : (
                <Link href={'/signin'}>
                  <Button
                    component="a"
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    <Typography variant="h6">SingIn</Typography>
                  </Button>
                </Link>
              )}
            </Grid>
            <Grid item md={12}>
              <PostList />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default Home
