import Navbar from './Navbar';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';

type Props = {
    title: string;
};

const Header = ({ title }: Props) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [shadow, setShadow] = useState(false);

    const handleScroll = () => {
        setShadow(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className={`flex justify-center items-center sticky top-0 z-10 bg-white px-3 py-4 ${
                    shadow ? 'shadow-header' : ''
                } transition-all ease-linear`}
            >
                <button
                    onClick={() => setNavbarOpen(true)}
                    className='absolute left-3'
                >
                    <AiOutlineMenu size={22} />
                </button>

                <h3 className='text-2xl'>{title}</h3>
            </div>

            <Navbar isOpen={navbarOpen} close={() => setNavbarOpen(false)} />
        </>
    );
};

export default Header;
