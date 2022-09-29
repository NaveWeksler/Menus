import { IoMdSettings } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';

const StyledLink = ({ url, Icon }) => (
    <Link href={url}>
        <a className='bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition'>
            <Icon size={20} />
        </a>
    </Link>
);

const MenuBar = ({ title }) => (
    <div className='flex justify-between items-center p-3 pb-8'>
        <StyledLink url={'/settings'} Icon={IoMdSettings} />
        <h1 className='text-2xl'>{title}</h1>
        <StyledLink url={'/shopping-cart'} Icon={AiOutlineShoppingCart} />
    </div>
);

export default MenuBar;
