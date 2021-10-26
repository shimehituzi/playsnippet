import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 540,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  mt: {
    marginTop: '3%',
  },
})

const Custom404: NextPage = () => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Box className={classes.root}>
        <Typography className={classes.mt} variant="h3">
          This page does not exist
        </Typography>
        <Link href="/">
          <a className={classes.mt}>
            <Typography variant="h5">Go Back to Top</Typography>
          </a>
        </Link>
      </Box>
    </>
  )
}

export default Custom404
