const toTimeString = (time) => {
    const hours = parseInt(time / 60);
    time -= hours * 60;
    return (
        (hours > 9 ? hours : '0' + hours) + ':' + (time > 9 ? time : '0' + time)
    );
};

const Order = ({ order }) => {
    return (
        <div className='flex items-center w-full border-t border-b'>
            <span>At: {toTimeString(order.time)}</span>
            <div className='pl-8 flex items-center py-1 justify-between flex-1 mr-2'>
                {order.items.map((item, index) => (
                    <div key={index.toString()}>
                        <span className='font-light'>{item.name}</span>{' '}
                        <span className='text-blue-600'>{item.price}$</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
