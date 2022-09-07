import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'src/theme'
import { CacheProvider } from '@emotion/react'
import Head from 'next/head'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from 'src/api'
import createEmotionCache from 'src/utils/createEmotionCache'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const clientSideEmotionCache = createEmotionCache()

interface Props {
  emotionCache?: any
}
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & Props) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
