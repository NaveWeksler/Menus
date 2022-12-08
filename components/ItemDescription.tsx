import { GrAdd } from 'react-icons/gr';
import { BiMinus } from 'react-icons/bi';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
	close: () => void;
	name: string;
	description: string;
	price: number;
	image: string;
	_id: string;
	addItemPrice: (price: number) => void;
	show: boolean;
};

type Item = {
	_id: string;
	quantity: number;
	price: number;
	image: string;
	description: string;
	name: string;
};

type Order = {
	items: Item[];
	price: number;
};

const addItem = (item: Item) => {
	const order = localStorage.getItem('order');

	const newOrder: Order = order
		? JSON.parse(order)
		: {
				items: [],
				price: 0,
		  };

	let existing = -1;
	newOrder.items.forEach((elem, index) => {
		if (elem._id === item._id) existing = index;
	});
	if (existing !== -1) {
		newOrder.items[existing].quantity = item.quantity;
		newOrder.price = item.quantity * item.price;

		if (item.quantity === 0) {
			newOrder.items.splice(existing, 1);
		}
	} else {
		newOrder.items.push(item);
		newOrder.price += item.quantity * item.price;
	}

	localStorage.setItem('order', JSON.stringify(newOrder));
	return newOrder.price;
};

const ItemDescription = ({
	name,
	description,
	price,
	image,
	_id,
	close,
	addItemPrice,
	show,
}: Props) => {
	const [quantity, setQuantity] = useState(1);
	const [inOrder, setInOrder] = useState(false);

	useEffect(() => {
		const order = localStorage.getItem('order') ?? '';

		if (order === '') {
			return;
		}

		const currentOrder = JSON.parse(order) as Order;
		let existing = -1;

		currentOrder.items.forEach((elem, index) => {
			if (elem._id === _id) existing = index;
		});

		if (existing !== -1) {
			setQuantity(currentOrder.items[existing].quantity);
			setInOrder(true);
		} else {
			setQuantity(1);
			setInOrder(false);
		}
	}, [show]);

	return (
		<div className='w-full'>
			<div className='relative w-full pt-[60%] overflow-hidden'>
				<Image src={image} alt={name} layout='fill' objectFit='cover' />
			</div>

			<div className='text-right px-3 py-4'>
				<p className='text-xl font-semibold'>{name}</p>
				<p className='text-light-3 font-medium pb-4'>{price} ₪</p>
				<p className='text-gray-500 text-sm'>{description}</p>
			</div>

			<div className='flex p-3'>
				<div className='flex mr-2 border rounded-md overflow-hidden shadow'>
					<button
						disabled={inOrder ? quantity === 0 : quantity === 1}
						onClick={() => setQuantity(quantity - 1)}
						className={`flex items-center justify-center px-3 ${
							(inOrder ? quantity === 0 : quantity === 1)
								? 'bg-slate-100 text-gray-500'
								: 'bg-gray-200 hover:bg-gray-300'
						}  transition`}>
						<BiMinus size={14} />
					</button>
					<span className='flex justify-center items-center w-10 text-sm'>
						{quantity}
					</span>
					<button
						onClick={() => setQuantity(quantity + 1)}
						className='flex items-center justify-center px-3 bg-gray-200 hover:bg-gray-300 transition'>
						<GrAdd size={14} />
					</button>
				</div>

				<button
					onClick={() => {
						addItemPrice(
							addItem({
								_id,
								quantity,
								price,
								image,
								description,
								name,
							})
						);
						close();
					}}
					className='flex justify-between p-3 w-ful bg-light-4 flex-1 rounded-md shadow-lg text-white transition text-sm'>
					<p>{quantity * price} ₪</p>
					<p className='font-semibold '>
						{inOrder ? 'עדכן פריט' : 'הוסף להזמנה'}
					</p>
				</button>
			</div>
		</div>
	);
};

export default ItemDescription;
