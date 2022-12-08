import dynamic from 'next/dynamic';
import { useState, useEffect, Suspense } from 'react';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { getMenusIds, getMenuData } from 'lib/api/menu/getMenus';

import MenuItem from 'components/MenuItem';
import Header from 'components/Header';
import MenuModal from 'components/MenuModal';

const Cart = dynamic(() => import('components/Cart'), { suspense: true });
const ItemDescription = dynamic(() => import('components/ItemDescription'), {
	suspense: true,
});

export const getStaticPaths: GetStaticPaths = async () => {
	const ids = await getMenusIds();

	// changing the format to match the requirements of next
	const paths = ids.map((id) => ({
		params: {
			id,
		},
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<
	Awaited<ReturnType<typeof getMenuData>>
> = async (context) => {
	const id = context.params?.id as string;
	const data = await getMenuData(id);

	data.items = [
		data.items[0],
		data.items[0],
		data.items[0],
		data.items[0],
		data.items[0],
		data.items[0],
		data.items[0],
	];

	return {
		props: data,
	};
};

const Menu = ({
	title,
	items,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [price, setPrice] = useState(0);
	const [showCart, setShowCart] = useState(false);
	const [showItem, setShowItem] = useState(false);
	const [itemIndex, setItemIndex] = useState(0);

	useEffect(() => {
		if (showCart) {
			return;
		}

		const orderString = localStorage.getItem('order');

		if (orderString) {
			const order = JSON.parse(orderString);
			setPrice(order.price);
		}
	}, [showCart]);

	return (
		<div className='flex flex-col h-full'>
			<Header title={title} />

			<div className='h-full flex-1'>
				<div className='divide-y'>
					{items.map((item, index) => (
						<div
							key={index}
							onClick={() => {
								setItemIndex(index);
								setShowItem(true);
							}}>
							<MenuItem {...item} />
						</div>
					))}
				</div>

				{price > 0 && (
					<div className='fixed inset-x-3 bottom-3 rounded-md overflow-hidden'>
						<button
							onClick={() => setShowCart(true)}
							className='flex justify-between py-3 px-4 w-full bg-light-4 text-white'>
							<p>{price} ₪</p>
							<p className='font-semibold'>צפה בהזמנה</p>
						</button>
					</div>
				)}
			</div>

			<Suspense fallback='loading...'>
				<MenuModal isOpen={showCart} close={() => setShowCart(false)}>
					<Cart isOpen={showCart} />
				</MenuModal>
			</Suspense>

			<MenuModal isOpen={showItem} close={() => setShowItem(false)}>
				<ItemDescription
					{...items[itemIndex]}
					close={() => setShowItem(false)}
					addItemPrice={(price: number) => setPrice(price)}
					show={showItem}
				/>
			</MenuModal>
		</div>
	);
};

export default Menu;
