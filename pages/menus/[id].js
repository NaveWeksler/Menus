import { getMenusIds, getMenuData } from '../../lib/getMenus';
import MenuItem from '../../components/MenuItem';

export const getStaticPaths = async () => {
  const ids = await getMenusIds();

  const paths = ids.map((id) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await getMenuData(id);

  return {
    props: data,
    revalidate: 120,
  };
};

const Menu = ({ title, items }) => {
  return (
    <div>
      <h1>{title}</h1>
      {items.map((item) => (
        <MenuItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Menu;
