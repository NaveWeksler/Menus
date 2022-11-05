import { getMenusIds, getMenuData } from 'lib/api/menu/getMenus';
import Header from 'components/Header';
import MenuItem from 'components/MenuItem';
import Cart from 'components/Cart';
import ItemDescription from 'components/ItemDescription';
import MenuModal from 'components/MenuModal';
import { useState, useEffect, ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
    title: string;
    items: {
        name: string;
        price: number;
        description: string;
        image: string;
        _id: string;
    }[];
};

interface IModal {
    open: boolean;
    children: ReactElement | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;
    const data = await getMenuData(id);

    data.items = [
        data.items![0],
        data.items![0],
        data.items![0],
        data.items![0],
        data.items![0],
        data.items![0],
        data.items![0],
        data.items![0],
        data.items![0],
    ];

    return {
        props: data,
    };
};

const Menu = ({ title, items }: Props) => {
    const [price, setPrice] = useState(0);
    const [modal, setModal] = useState<IModal>({
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

    const openItem = (index: number) => {
        setModal({
            open: true,
            children: <ItemDescription {...items[index]} close={closeModal} />,
        });
    };

    const openCart = () => {
        setModal({
            open: true,
            children: <Cart />,
        });
    };

    const closeModal = () => {
        setModal({ ...modal, open: false });
    };

    const getPrice = () => {
        return JSON.parse(localStorage.getItem('order') ?? '{"price":0}').price;
    };

    return (
        <div className='flex flex-col h-full'>
            <Header title={title} />

            <div className='h-full flex-1'>
                <div className='divide-y'>
                    {items.map((item, index) => (
                        <div key={index} onClick={() => openItem(index)}>
                            <MenuItem {...item} />
                        </div>
                    ))}
                </div>

                {price > 0 && (
                    <div className='fixed bottom-0 p-2 w-full'>
                        <button
                            onClick={openCart}
                            className='flex justify-between w-full py-3 px-4 bg-light-4 text-white rounded-md'
                        >
                            <p>{price} ₪</p>
                            <p className='font-semibold'>צפה בהזמנה</p>
                        </button>
                    </div>
                )}
            </div>

            <MenuModal isOpen={modal.open} close={closeModal}>
                {modal.children!}
            </MenuModal>
        </div>
    );
};

export default Menu;
