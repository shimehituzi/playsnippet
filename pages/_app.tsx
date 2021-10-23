import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { Appbar } from '../src/components/Appbar'
import { theme } from '../src/utils/theme'

import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
Amplify.configure({ ...awsconfig, ssr: true })

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

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
        <CssBaseline />
        <RecoilRoot>
          <Appbar />
          <Container>
            <Component {...pageProps} />
          </Container>
        </RecoilRoot>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
