import { prisma } from './prisma';

export const getMenusIds = async () => {
  const ids = await prisma.menus.findMany({
    select: {
      id: true,
    },
  });

  return ids.map(({ id }) => id);
};

export const getMenuData = async (id) => {
  const menu = await prisma.menus.findUnique({
    where: { id },
    select: {
      title: true,
      items: true,
    },
  });

  return menu;
};
