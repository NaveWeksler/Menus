import Link from 'next/link';

const PageNotFound = () => (
    <div className='h-screen p-2 pb-[30%] flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium'>
            <strong>404</strong> Not Found
        </h2>

        <div className='max-w-[min(90%,50rem)] mt-4 pt-4 border-t border-gray-400'>
            <span className='text-xl font-light'>
                Sorry, This Page Does Not Exsist.{' '}
                <Link href='/'>
                    <a className='text-blue-500'>Go To Main Menu</a>
                </Link>
            </span>
        </div>
    </div>
);

export default PageNotFound;
