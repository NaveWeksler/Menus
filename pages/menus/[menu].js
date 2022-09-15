const Menu = ({ items }) => {
  

  return (
    <div>
      {items.map((item) => (
        <MenuItem data={item} />
      ))}
    </div>
  );
};

export default Menu;
