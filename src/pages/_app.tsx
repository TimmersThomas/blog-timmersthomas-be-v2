import { AppProps } from 'next/app'
import '@/styles/index.css'

// eslint-disable-next-line react/jsx-props-no-spreading
const app = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default app
