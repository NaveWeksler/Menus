import { Html } from 'next/document';
import Head from 'next/head';

const Layout = ({ children }) => (
    <Html lang='en'>
        <Head>
            <title>Menus</title>
            <meta name='description' content='Organize Small Sales' />
        </Head>
        <div className='h-screen'>
            <main className='w-full h-full'>{children}</main>
        </div>
    </Html>
);

export default Layout;
