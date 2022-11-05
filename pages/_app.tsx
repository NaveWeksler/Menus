import Layout from 'components/Layout';
import { ThemeProvider } from 'next-themes';
import 'styles/globals.css';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider attribute='class'>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
);

export default App;
