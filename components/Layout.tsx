import Head from 'next/head';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => (
	<>
		<Head>
			<title>Menus</title>
			<meta name='description' content='Organize Small Sales' />
		</Head>

		<main className='w-screen h-screen'>{children}</main>
	</>
);

export default Layout;
