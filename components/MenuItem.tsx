import Image from 'next/image';

const MenuItem = ({ name, description, price, image }: {name: string, description: string, price: number, image: string}) => (
    <div className='px-2 py-5 hover:bg-gray-50 dark:hover:bg-slate-900 transition'>
        <div className='flex justify-between w-full h-20'>
            <div className='w-32 h-full rounded-lg overflow-hidden relative'>
                <Image src={image} alt={name} layout='fill' objectFit='cover' priority={true}/>
            </div>

            <div className='flex flex-col flex-1 text-right pl-1 overflow-hidden'>
                <p className='font-semibold'>{name}</p>
                <p className='flex-1 text-gray-500 text-sm truncate'>
                    {description}
                </p>
                <p className='text-light-3 pb-1'>{price} ₪</p>
            </div>
        </div>
    </div>
);

export default MenuItem;
