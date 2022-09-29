import Link from 'next/link';

const noOrders = () => (
    <div>
        <span className='lead'>This Might Happen When:</span>
        <ul>
            <li>You Cleared Your Cookies.</li>
            <li>You Have an Account But Did Not Login</li>
        </ul>
        <span className='lead'>How To Fix:</span>
        <ul>
            <li>
                Try to{' '}
                <Link href='/login'>
                    <a>Login</a>
                </Link>{' '}
                if You Have an Account
            </li>
        </ul>
    </div>
);

export default noOrders;
