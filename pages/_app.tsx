import Layout from 'components/Layout';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider attribute='class'>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
);

export default App;
