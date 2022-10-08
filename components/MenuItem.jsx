import Image from 'next/image';

const MenuItem = ({ name, description, price, image }) => {
  return (
    <div className='flex flex-row border border-black dark:border-slate-100 rounded h-40 mx-2'>
      <div className='w-[25vw] h-full relative overflow-hidden rounded-r-lg'>
        <Image src={image} alt={name} layout='fill' objectFit='cover' />
      </div>
      <div className='flex-1 flex flex-col items-center justify-start mx-2'>
        <div className='w-full flex items-start justify-between '>
          <div className=' dark:text-blue-400 px-2 flex items-center justify-start text-xl mt-2  '>
            <span>{price}</span>
          </div>
          <span className='font-light text-3xl text-center flex items-center justify-center '>
            {name}
          </span>
          <span className='text-transparent px-2 flex items-center justify-start text-xl mt'>
            {price}
          </span>
        </div>
        <div className='flex w-full h-full justify-end mb-2'>
          <span className='dark:text-gray-300 font-thin flex items-end justify-end w-full h-full text-xl'>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * <div className='flex flex-row-reverse justify-between max-w-screen-sm px-4 py-5 border border-gray-100 dark:border-gray-700 rounded sm:mx-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition'>
            <div className='text-right'>
                <p className='font-medium pb-1'>{name}</p>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                    {description}
                </p>
                <p className='text-blue-400 text-sm font-light pt-1.5'>
                    {price}
                </p>
            </div>

            <div className='relative w-32 h-20 sm:w-44 sm:h-28 rounded-lg overflow-hidden transition-height duration-300'>
                <Image src={image} alt={name} layout='fill' objectFit='cover' />
            </div>
        </div>
 */
export default MenuItem;
