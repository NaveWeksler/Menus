import { MdOutlineAdd } from 'react-icons/md';
import { useState } from 'react';
import EditMenuItem from 'components/EditMenuItem';

const AddMenu = () => {
    const [items, setItems] = useState([]);

    const addItem = () => {
        setItems([...items, <EditMenuItem key={items.length.toString()} />]);
    };

    return (
        <form className='flex h-full p-2 flex-col'>
            <div className='my-2 w-[50%] flex items-center mx-8'>
                <label
                    htmlFor='menuName'
                    className='inline text-gray-700 text-sm font-bold mr-5'
                >
                    Menu Name
                </label>
                <input
                    type='text'
                    id='menuName'
                    className='inline shadow border appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>

            <div className='flex flex-col flex-1 w-full'>
                <span className='mb-3 flex items-center justify-between mx-8'>
                    <h1 className='inline block text-gray-700 text-lg font-bold mb-2'>
                        Items:
                    </h1>
                    <button
                        type='button'
                        onClick={addItem}
                        className='rounded border hover:bg-gray-200 w-8 h-8 box-border inline-block flex items-center justify-center'
                    >
                        <MdOutlineAdd color='black' size={20} />
                    </button>
                </span>
                <div className='border w-full flex-1 rounded'>{items}</div>
            </div>
            <button type='submit'>Add</button>
        </form>
    );
};

export default AddMenu;
