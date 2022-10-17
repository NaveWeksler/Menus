import Image from 'next/image';

const MenuItem = ({ name, description, price, image }) => {
    // return (
    //   <div className='flex flex-row border border-black dark:border-slate-100 rounded h-40 mx-2'>
    //     <div className='w-[25vw] h-full relative overflow-hidden rounded-r-lg'>
    //       <Image src={image} alt={name} layout='fill' objectFit='cover' />
    //     </div>
    //     <div className='flex-1 flex flex-col items-center justify-start mx-2'>
    //       <div className='w-full flex items-start justify-between '>
    //         <div className=' dark:text-blue-400 px-2 flex items-center justify-start text-xl mt-2  '>
    //           <span>{price}</span>
    //         </div>
    //         <span className='font-light text-3xl text-center flex items-center justify-center '>
    //           {name}
    //         </span>
    //         <span className='text-transparent px-2 flex items-center justify-start text-xl mt'>
    //           {price}
    //         </span>
    //       </div>
    //       <div className='flex w-full h-full justify-end mb-2'>
    //         <span className='dark:text-gray-300 font-thin flex items-end justify-end w-full h-full text-xl'>
    //           {description}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // );

    return (
        <div className='px-2 py-5 hover:bg-gray-50 dark:hover:bg-slate-900 transition'>
            <div className='flex justify-between w-full h-20'>
                <div className='relative w-32 h-full rounded-lg overflow-hidden'>
                    <Image
                        src={image}
                        alt={name}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>

                <div className='flex flex-col flex-1 text-right pl-1 overflow-hidden'>
                    <p className='font-semibold'>{name}</p>
                    <p className='py-0.5 flex-1 text-gray-500 text-xs truncate'>
                        {description}
                    </p>
                    <p className='text-light-3 pb-1'>{price} ₪</p>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
