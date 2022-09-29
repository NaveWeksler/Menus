import Link from 'next/link';

const ServerError = () => (
    <div className='h-screen p-2 pb-[30%] flex flex-col justify-center items-center overflow-x-hidden'>
        <h2 className='text-3xl font-medium'>
            <strong>500</strong> Internal Server Error
        </h2>

        <hr className='border-r border-gray-400 w-80 mt-6 mb-4' />
        <span className='text-xl font-light'>
            Sorry, There is an Error in The Server. Please Try Again Later.{' '}
            <Link href='/'>
                <a className='text-blue-500'>Go To Main Menu</a>
            </Link>
        </span>
    </div>
);

export default ServerError;
