import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdSettings } from 'react-icons/md';
import { GrNotes } from 'react-icons/gr';
import Link from 'next/link';

type Props = {
    isOpen: boolean;
    close: () => void;
};

const Navbar = ({ isOpen, close }: Props) => {
    const data = [
        { name: 'כניסה', Icon: BiUserCircle, url: '/auth/login' },
        { name: 'הזמנות קודמות', Icon: GrNotes, url: '/orders' },
        { name: 'יצירת תפריט', Icon: AiOutlinePlus, url: '/create-menu' },
        { name: 'בית', Icon: AiOutlineHome, url: '/' },
        { name: 'הגדרות', Icon: MdSettings, url: '/settings' },
    ];

    return (
        <div
            aria-hidden={!isOpen}
            className={`fixed inset-0 z-50 flex justify-center items-center ${
                isOpen ? '' : 'pointer-events-none'
            }`}
        >
            <div
                className={`fixed inset-0 bg-black ${
                    isOpen ? 'opacity-50' : 'opacity-0'
                } transition-opacity ease-in-out`}
                onClick={close}
            />

            <div
                className={`absolute left-0 inset-y-0 bg-light-1 ${
                    isOpen ? '' : 'opacity-0 -translate-x-full'
                } transition-all ease-in-out`}
            >
                <div className='w-56 divide-y'>
                    {data.map(({ name, Icon, url }, index) => (
                        <Link key={index} href={url}>
                            <div className='flex justify-between items-center p-2 hover:bg-gray-600 hover:bg-opacity-20'>
                                <Icon size={24} />
                                <p className='text-lg'>{name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
