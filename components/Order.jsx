const Order = ({ order }) => {
    console.log('O: ', order);
    return (
        <div className='w-100 d-flex flex-row align-items-center'>
            <span>{order.time}</span>
            <div className='ps-3 d-flex align-items-center'>
                {order.items.map((item, index) => (
                    <span key={index.toString()} className='lead p-1'>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Order;
