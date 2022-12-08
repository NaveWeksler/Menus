import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdSettings } from 'react-icons/md';
import { GrNotes } from 'react-icons/gr';
import Link from 'next/link';

const Navbar = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
    const data = [
        { name: 'כניסה', Icon: BiUserCircle, href: '/auth/login' },
        { name: 'הזמנות קודמות', Icon: GrNotes, href: '/orders' },
        { name: 'יצירת תפריט', Icon: AiOutlinePlus, href: '' },
        { name: 'בית', Icon: AiOutlineHome, href: '/' },
        { name: 'הגדרות', Icon: MdSettings, href: '' },
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
                    {data.map(({ name, Icon, href }, index) => (
                        <Link href={href} key={index}>
                            <div className='flex justify-between items-center p-2 hover:bg-gray-600 hover:bg-opacity-20 transition'>
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
