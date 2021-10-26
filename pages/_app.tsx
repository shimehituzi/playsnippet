import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { Layout } from '../src/components/Layout'
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
