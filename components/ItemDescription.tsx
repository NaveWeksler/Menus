import { GrAdd } from 'react-icons/gr';
import { BiMinus } from 'react-icons/bi';
import Image from 'next/image';
import { useState } from 'react';

const ItemDescription = ({ name, description, price, image, _id, close }: {close: () => void, name: string, description: string, price: number, image: string, _id: string}) => {
    const [quantity, setQuantity] = useState(1);

    const addItem = () => {
        const order = localStorage.getItem('order');

        const newOrder = order
            ? JSON.parse(order)
            : {
                  items: [],
                  price: 0,
              };

        newOrder.price += price * quantity;
        newOrder.items.push({
            name,
            description,
            price,
            image,
            quantity,
            _id,
        });

        localStorage.setItem('order', JSON.stringify(newOrder));
        close();
    };

    return (
        <div className='w-full'>
            <div className='relative w-full h-64 overflow-hidden'>
                <Image src={image} alt={name} layout='fill' objectFit='cover' />
            </div>

            <div className='text-right px-3 py-4'>
                <p className='text-xl font-bold'>{name}</p>
                <p className='text-light-3 font-medium pb-4'>{price} ₪</p>
                <p className='text-gray-500 text-sm'>{description}</p>
            </div>

            <div className='flex p-3'>
                <div className='flex mr-2 border rounded-md overflow-hidden'>
                    <button
                        disabled={quantity == 1}
                        onClick={() => setQuantity(quantity - 1)}
                        className={`flex items-center justify-center px-3 ${
                            quantity == 1
                                ? 'bg-slate-100 text-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }  transition`}
                    >
                        <BiMinus size={14} />
                    </button>
                    <span className='flex justify-center items-center w-10 text-sm'>
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='flex items-center justify-center px-3 bg-gray-200 hover:bg-gray-300 transition'
                    >
                        <GrAdd size={14} />
                    </button>
                </div>

                <button
                    onClick={addItem}
                    className='flex justify-between p-3 w-ful bg-light-4 flex-1 rounded-md shadow-lg text-white transition text-sm'
                >
                    <p>{quantity * price} ₪</p>
                    <p className='font-semibold'>הוסף להזמנה</p>
                </button>
            </div>
        </div>
    );
};

export default ItemDescription;
