import Link from 'next/link';

const noOrders = () => (
    <div className='h-screen p-2 pb-[30%] flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium'>Orders Not Showing</h2>

        <div className='max-w-[min(90%,50rem)] mt-4 pt-4 border-t border-gray-400'>
            <span className='font-light text-xl'>This Might Happen If:</span>
            <ul className='list-disc pl-5'>
                <li>You cleared your cookies.</li>
                <li>You have an account but did not login</li>
            </ul>

            <div className='mt-4'>
                <span className='font-light text-xl'>How To Fix:</span>
            </div>

            <ul className='list-disc pl-5'>
                <li>
                    Try to{' '}
                    <Link href='/auth/login'>
                        <a className='hover:underline text-blue-500 text-center'>
                            login
                        </a>
                    </Link>{' '}
                    if you have an account.
                </li>
            </ul>
        </div>
    </div>
);

export default noOrders;
