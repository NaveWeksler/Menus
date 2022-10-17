import Head from 'next/head';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Menus</title>
            <meta name='description' content='Organize Small Sales' />
        </Head>
        <div className='h-screen'>
            <main className='w-full h-full'>{children}</main>
        </div>
    </>
);

export default Layout;
