import dynamic from "next/dynamic";
// import { Suspense } from "react";
import { useState, useEffect, Suspense } from 'react';
import {GetStaticProps, GetStaticPaths, GetStaticPathsContext, InferGetStaticPropsType} from "next";

import { getMenusIds, getMenuData } from 'lib/api/menu/getMenus';

//const MenuItem = dynamic(() => import("components/MenuItem"), {suspense: true});
import MenuItem from 'components/MenuItem';
import MenuBar from 'components/MenuBar';
const ItemDescription = dynamic(() => import("components/ItemDescription"), {suspense: true});
const Cart = dynamic(() => import("components/Cart"), {suspense: true});
//import ItemDescription from 'components/ItemDescription';
//import Cart from 'components/Cart';
import MenuModal from 'components/MenuModal';

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
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

export const getStaticProps: GetStaticProps<Awaited<ReturnType<typeof getMenuData>>> = async (context) => {
    const id = context.params?.id as string;
    const data = await getMenuData(id);
    return {
        props: data,
    };
};


const Menu = ({ title, items }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [price, setPrice] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [showItem, setShowItem] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);

    const addItemPrice = (add: number) => { // add item to order
        setPrice(price + add);
    }

    return (
        <div className='flex flex-col w-screen h-screen overflow-hidden'>
            <MenuBar title={title} />
             <div className='flex flex-col w-full flex-1 divide-y overflow-auto'>
                {items.map((item, index) => (
                    <div key={index} onClick={() => {setItemIndex(index); setShowItem(true)}}>
                        <MenuItem {...item} />
                    </div>
                ))}
            </div>

            {price > 0 && (
                <div className='fixed inset-x-3 bottom-3 rounded-md overflow-hidden'>
                    <button
                        onClick={() => setShowCart(true)}
                        className='flex justify-between py-3 px-4 w-full bg-light-4 text-white'
                    >
                        <p>{price} ₪</p>
                        <p className='font-semibold'>צפה בהזמנה</p>
                    </button>
                </div>
            )}

            <Suspense fallback={"loading..."}>
                <MenuModal isOpen={showCart} close={() => setShowCart(false)}>
                    <Cart/>
                </MenuModal>
            </Suspense>
            <Suspense fallback={"loading..."}>
                <MenuModal isOpen={showItem} close={() => setShowItem(false)}>
                    <ItemDescription {...items[itemIndex]} close={() => setShowItem(false)} addItemPrice={addItemPrice}/>
                </MenuModal>
            </Suspense>
        </div>
    );
};



export default Menu;



/*const [price, setPrice] = useState(0);
    const [modal, setModal] = useState<{open: boolean, children: JSX.Element | null}>({
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
            children: <Cart/>,
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
            <MenuBar title={title} />

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
                {modal.children ? modal.children : <></>}
            </MenuModal>
        </div>
    );
*/