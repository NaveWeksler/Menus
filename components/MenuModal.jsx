import { cloneElement } from 'react';
import { IoMdClose } from 'react-icons/io';

const MenuModal = ({ children, isOpen, close }) => {
    return (
        <div
            aria-hidden={!isOpen}
            className={`fixed inset-0 flex justify-center items-center ${
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
                className={`absolute mx-auto inset-x-0 bottom-0 rounded-t-2xl bg-light-1 max-h-[95%] overflow-hidden shadow-xl sm:rounded-b-2xl sm:bottom-auto sm:max-w-md lg:max-w-lg ${
                    isOpen ? '' : 'opacity-0 translate-y-full sm:translate-y-20'
                } transition-all ease-in-out`}
            >
                {
                    /* sends 'close' function to the children */
                    children && cloneElement(children, { close })
                }

                <button
                    onClick={close}
                    className='absolute top-4 right-4 bg-light-1 rounded-full p-2 transition-colors'
                >
                    <IoMdClose size={24} />
                </button>
            </div>
        </div>
    );
};

export default MenuModal;
