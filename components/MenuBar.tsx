import { useState } from 'react';
import Navbar from './Navbar';
import { AiOutlineMenu } from 'react-icons/ai';


const MenuBar = ({ title }: {title: string}) => {
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
