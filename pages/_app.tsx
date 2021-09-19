import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../src/theme'

import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
Amplify.configure(awsconfig)

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  })

  return (
    <React.Fragment>
      <Head>
        <title>Play Snippet</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container>
          <Paper elevation={10} square>
            <Component {...pageProps} />
          </Paper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
