import Order from 'components/Order';
import Link from 'next/link';

const debug = require('debug')('menus:orders');

const Orders = ({ orders }) => {
    console.log(orders);
    return (
        <div className='container-fluid pt-2'>
            <span className='d-flex align-items-center justify-content-between'>
                <h2 className='d-inline'>Orders:</h2>{' '}
                <Link href='/info/noOrders'>
                    <a>Cant See Your Orders?</a>
                </Link>
            </span>
            <div className='p-3 d-flex flex-column align-items-center'>
                {orders.map((order, index) => (
                    <Order key={index.toString()} order={order} />
                ))}
            </div>
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    debug(req.headers.cookie);

    return {
        props: {
            orders: [{ time: 100, items: ['Hamburger', 'Hamburger', 'Chips'] }],
        },
    };
}

export default Orders;
