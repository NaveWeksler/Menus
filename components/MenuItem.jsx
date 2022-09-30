import Image from 'next/image';

const MenuItem = ({ name, description, price, image }) => {
    // NOTE: MenuItem is designed for hebrew
    return (
        <div className='flex flex-row border rounded h-32 mx-5'>
            <div className='w-[20vh] h-full relative overflow-hidden rounded-lg'>
                <Image src={image} alt={name} layout='fill' objectFit='cover' />
            </div>
            <div className='flex-1 flex flex-row-reverse items-center justify-start mx-2'>
                <span className='font-light text-lg text-center flex items-center justify-center'>
                    {name}
                </span>
                <span className='text-blue-600 px-2 flex items-center justify-center'>
                    {price}
                </span>
                <span className='text-gray-700 font-thin flex items-center justify-center'>
                    {description}
                </span>
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
