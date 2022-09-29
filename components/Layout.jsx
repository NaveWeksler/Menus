import Head from 'next/head';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Menus</title>
        </Head>
        <div className='h-screen'>
            <main>{children}</main>
        </div>
    </>
);

export default Layout;
