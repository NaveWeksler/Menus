import Order from 'components/Order';
import Link from 'next/link';
import { withSSRAuth } from 'lib/api/util/auth';
import { getOrdersById } from 'lib/api/orders/getOrders';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AuthRequest } from 'lib/api/types/types';

const debug = require('debug')('menus:orders');

const Orders = ({
	orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div className='flex-1 p-2 h-full'>
			<span className='flex items-center justify-between mt-2 mx-6'>
				<h1 className='block font-meduim text-xl text-center'>Orders</h1>{' '}
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

export const getServerSideProps = withSSRAuth<{
	orders: { time: number; items: { name: string; price: number }[] }[];
}>(async (ctx) => {
	const orders = await getOrdersById(ctx.user._id);
	console.log('orders: ', orders, 'id: ', ctx.user._id);
	return {
		props: {
			orders: orders,
		},
	};
});

export default Orders;
