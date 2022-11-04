import Link from 'next/link';

const PageNotFound = () => (
    <div className='h-screen p-2 pb-[30%] flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium'>
            <strong>404</strong> Not Found
        </h2>

        <hr className='border-r border-gray-400 w-80 max-w-[90%] mt-6 mb-4' />
        <span className='text-xl font-light'>
            Sorry, This Page Does Not Exsist.{' '}
            <Link href='/'>
                <a className='text-blue-500'>Go To Main Menu</a>
            </Link>
        </span>
    </div>
);

export default PageNotFound;
