import Link from 'next/link';

const noOrders = () => (
    <div className='w-full h-full mx-4 my-2'>
        <h1 className='font-medium text-xl w-full text-center'>
            Orders Not Showing
        </h1>
        <span className='font-light text-xl'>This Might Happen When:</span>
        <ul className='list-disc pl-5'>
            <li>You Cleared Your Cookies.</li>
            <li>You Have an Account But Did Not Login</li>
        </ul>
        <span className='font-light text-xl'>How To Fix:</span>
        <ul className='list-disc pl-5'>
            <li>
                Try to{' '}
                <Link href='/login'>
                    <a className='hover:underline text-blue-600 text-center'>
                        Login
                    </a>
                </Link>{' '}
                if You Have an Account
            </li>
        </ul>
    </div>
);

export default noOrders;
