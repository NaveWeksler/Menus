import Link from 'next/link';

const ServerError = () => (
	<div className='h-screen p-2 pb-[30%] flex flex-col justify-center items-center'>
		<h2 className='text-3xl font-medium'>
			<strong>500</strong> Internal Server Error
		</h2>

		<div className='max-w-[min(90%,50rem)] mt-4 pt-4 border-t border-gray-400'>
			<span className='text-xl font-light'>
				Sorry, There is an Error in The Server. Please Try Again Later.{' '}
				<Link href='/'>
					<a className='text-blue-500'>Go To Main Menu</a>
				</Link>
			</span>
		</div>
	</div>
);

export default ServerError;
