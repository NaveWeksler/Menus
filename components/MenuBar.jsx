import { IoMdSettings } from 'react-icons/io';
import { useState } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';

const StyledLink = ({ url, Icon }) => (
    <Link href={url}>
        <a className='bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition'>
            <Icon size={20} />
        </a>
    </Link>
);

const MenuBar = ({ title }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <div className='flex justify-center items-center p-3 pb-8'>
            <button
                onClick={() => setNavbarOpen(true)}
                className='absolute left-3'
            >
                <AiOutlineMenu size={22} />
            </button>

            <h1 className='relative right-0 text-2xl'>{title}</h1>
            <Navbar isOpen={navbarOpen} close={() => setNavbarOpen(false)} />
        </div>
    );
};

export default MenuBar;
