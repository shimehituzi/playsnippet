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
} from '@material-ui/core'
import { PostList } from '../src/container/PostList'

const useStyle = makeStyles({
  header: {
    margin: '2%',
  },
  postList: {
    marginBottom: '3%',
  },
  button: {
    textTransform: 'none',
  },
})

const Home: NextPage = () => {
  const { authenticated } = useAuth()

  const classes = useStyle()

  return (
    <React.Fragment>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.header}
        >
          <Grid item md={6}>
            <Typography variant="h3" color="primary">
              Play Snippet
            </Typography>
          </Grid>
          <Grid item md={2}>
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
                  className={classes.button}
                >
                  <Typography variant="h5">Sign in</Typography>
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.postList}
        >
          <Grid item md={8}>
            <PostList />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Home
