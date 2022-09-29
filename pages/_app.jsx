import Layout from 'components/Layout';
import { ThemeProvider } from 'next-themes';
import 'styles/globals.css';

const App = ({ Component, pageProps }) => (
    <ThemeProvider attribute='class'>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
);

export default App;
