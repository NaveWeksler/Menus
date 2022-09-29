import { getMenusIds, getMenuData } from 'lib/getMenus';
import MenuItem from 'components/MenuItem';
import MenuBar from 'components/MenuBar';

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
    return (
        <div className='flex flex-col max-w-screen-sm mx-auto'>
            <MenuBar title={title} />

            <div className='overflow-y-auto'>
                {items.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
