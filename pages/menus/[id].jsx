import { getMenusIds, getMenuData } from 'lib/getMenus';
import MenuItem from 'components/MenuItem';
import MenuBar from 'components/MenuBar';
//const debug = require('debug')('menus:id');

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
    //debug('render page with: %O', data);
    return {
        props: data,
    };
};

const Menu = ({ title, items }) => {
    return (
        <div className='flex flex-col w-full h-full overflow-hidden'>
            <MenuBar title={title} />

            <div className='flex flex-col w-full flex-1'>
                {items.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
