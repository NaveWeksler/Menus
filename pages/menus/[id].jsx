import { getMenusIds, getMenuData } from 'lib/menu/getMenus';
import MenuItem from 'components/MenuItem';
import MenuBar from 'components/MenuBar';
import ItemDescription from 'components/ItemDescription';
import Cart from 'components/Cart';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import MenuModal from 'components/MenuModal';

export const getStaticPaths = async () => {
    const ids = await getMenusIds();

    // changing the format to match the requirements of next
    const paths = ids.map((id) => ({
        params: {
            id,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await getMenuData(id);

    return {
        props: data,
    };
};

const Menu = ({ title, items }) => {
    const [price, setPrice] = useState(0);
    const [modal, setModal] = useState({
        open: false,
        children: null,
    });

    // used for animating the modal closing
    useEffect(() => {
        // checks if 'closeModal' was called
        if (modal.children && !modal.open) {
            setPrice(getPrice()); // updating the price

            // setting children to null after the modal is closed
            setTimeout(
                () =>
                    setModal({
                        open: false,
                        children: null,
                    }),
                200
            );
        }
    }, [modal]);

    useEffect(() => setPrice(getPrice()), []);

    const openItem = (index) => {
        setModal({
            open: true,
            children: <ItemDescription {...items[index]} close={closeModal} />,
        });
    };

    const openCart = () => {
        setModal({
            open: true,
            children: <Cart price={price} />,
        });
    };

    const closeModal = () => {
        setModal({ ...modal, open: false });
    };

    const getPrice = () => {
        const orderString = localStorage.getItem('order');

        if (orderString) {
            return JSON.parse(orderString).price;
        }

        return 0;
    };

    return (
        <div className='flex flex-col w-screen h-screen overflow-hidden'>
            <MenuBar title={title} icon={AiOutlineShoppingCart} url='/cart' />

            <div className='flex flex-col w-full flex-1 divide-y overflow-auto'>
                {items.map((item, index) => (
                    <div key={index} onClick={() => openItem(index)}>
                        <MenuItem {...item} />
                    </div>
                ))}
            </div>

            {price > 0 && (
                <div className='fixed inset-x-3 bottom-3 rounded-md overflow-hidden'>
                    <button
                        onClick={openCart}
                        className='flex justify-between py-3 px-4 w-full bg-light-4 text-white'
                    >
                        <p>{price} ₪</p>
                        <p className='font-semibold'>צפה בהזמנה</p>
                    </button>
                </div>
            )}

            <MenuModal isOpen={modal.open} close={closeModal}>
                {modal.children}
            </MenuModal>
        </div>
    );
};

export default Menu;
