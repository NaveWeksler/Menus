import { getMenusIds, getMenuData } from '../../lib/getMenus';
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
    // just a test
    return (
        <div className='d-flex flex-column align-items-center'>
            <MenuBar />
            <h1>{title}</h1>
            {items.map((item, index) => (
                <MenuItem {...item} key={inedx.toString()} />
            ))}
        </div>
    );
};

export default Menu;
