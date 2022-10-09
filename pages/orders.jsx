import Order from 'components/Order';
import Link from 'next/link';
import { withSSRAuth } from 'lib/util/auth';

const debug = require('debug')('menus:orders');

const Orders = ({ orders }) => {
    console.log(orders);
    return (
        <div className='flex-1 p-2 h-full'>
            <span className='flex items-center justify-between mt-2 mx-6'>
                <h1 className='block font-meduim text-xl text-center'>
                    Orders
                </h1>{' '}
                <Link href='/info/noOrders'>
                    <a className='hover:underline text-blue-600 text-center h-full p-0 m-0 pt-1'>
                        Cant See Your Orders?
                    </a>
                </Link>
            </span>
            <div className='p-3 flex flex-col items-center'>
                {orders.map((order, index) => (
                    <Order key={index.toString()} order={order} />
                ))}
            </div>
        </div>
    );
};

export const getServerSideProps = withSSRAuth(2, ({ req, res }) => {
    debug(req.headers.cookie);
    return {
        props: {
            orders: [
                {
                    time: 100,
                    items: [
                        { name: 'Hamburger', price: 10 },
                        { name: 'Hamburger', price: 10 },
                        { name: 'Chips', price: 2 },
                    ],
                },
                {
                    time: 750,
                    items: [
                        { name: 'Orange juice', price: 3 },
                        { name: 'Hamburger', price: 10 },
                        { name: 'Chips', price: 2 },
                    ],
                },
                {
                    time: 100,
                    items: [
                        { name: 'Cheeseburger', price: 12 },
                        { name: 'Large Hamburger', price: 12 },
                        { name: 'Chips', price: 2 },
                        { name: 'Large Chips', price: 5 },
                        { name: 'Large Cheeseburger', price: 14 },
                    ],
                },
            ],
        },
    };
});

export default Orders;
