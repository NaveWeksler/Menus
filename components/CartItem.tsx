import { GrAdd } from 'react-icons/gr';
import { BiMinus } from 'react-icons/bi';
import Image from 'next/image';

const CartItem = ({
    name,
    description,
    price,
    image,
    quantity,
    setQuantity,
}: {name: string, price: number, image: string, quantity: number, description: string, setQuantity: (newQuantity: number) => void}) => {
    return (
        <div className='flex justify-between h-24 py-2 shadow-theme overflow-hidden'>
            <div className='w-32 h-full relative rounded-lg overflow-hidden'>
                <Image src={image} alt={name} layout='fill' objectFit='cover' />
            </div>

            <div className='flex flex-col flex-1 pl-2 overflow-hidden'>
                <div className='flex flex-col flex-1 justify-between text-right px-2 py-0.5'>
                    <p className='text-light-3 font-medium'>{name}</p>
                    <p className='pb-0.5 text-sm font-light text-gray-600 truncate'>
                        {description}
                    </p>
                </div>

                <div className='flex justify-between items-center py-0.5 border-t'>
                    <p className='text-light-3 font-medium'>
                        {quantity * price} ₪
                    </p>

                    <div className='flex mt-1 mb-0.5 text-center border rounded-md overflow-hidden h-6'>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className='flex items-center justify-center w-6 bg-gray-200 hover:bg-gray-300 transition'
                        >
                            <GrAdd size={14} />
                        </button>
                        <span className='flex justify-center items-center w-6 text-sm'>
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity - 1)}
                            className='flex items-center justify-center w-6 bg-gray-200 hover:bg-gray-300 transition'
                        >
                            <BiMinus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
