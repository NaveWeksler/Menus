import { useState, useEffect } from 'react';
import CartItem from './CartItem';

const Cart = () => {
    const [order, setOrder] = useState({
        items: [],
        price: 0,
    });

    useEffect(() => {
        const orderString = localStorage.getItem('order');

        if (orderString) {
            setOrder(JSON.parse(orderString));
        }
    }, []);

    const setQuantity = (index) => (newQuantity) => {
        const newOrder = { ...order };

        const previousQuantity = newOrder.items[index].quantity;
        const price = newOrder.items[index].price;

        newOrder.price += (newQuantity - previousQuantity) * price;
        newOrder.items[index].quantity = newQuantity;

        if (newQuantity === 0) {
            newOrder.items.splice(index, 1);
        }

        setOrder(newOrder);
        localStorage.setItem('order', JSON.stringify(newOrder));
    };

    return (
        <div className='flex flex-col p-4 pt-12 h-[38rem] max-h-[85vh]'>
            <p className='text-xl font-bold text-center'>ההזמנה שלי</p>

            <div className='my-4 flex-1 overflow-auto divide-y'>
                {order.items.map((item, index) => (
                    <CartItem
                        key={index}
                        {...item}
                        setQuantity={setQuantity(index)}
                    />
                ))}
            </div>

            <div className='flex flex-col items-center'>
                <div className='text-right w-full'>
                    <p>הוסף הערות למנה</p>
                    <textarea
                        placeholder='הערות'
                        className='px-1 py-0.5 w-full h-10 text-right text-sm resize-none'
                    />
                </div>

                <button className='flex justify-between bg-light-4 w-32 py-3 px-4 my-2 rounded-md shadow-lg text-white transition'>
                    <p className=''>{order.price} ₪</p>
                    <p className='font-semibold'>הזמן</p>
                </button>
            </div>
        </div>
    );
};

export default Cart;
