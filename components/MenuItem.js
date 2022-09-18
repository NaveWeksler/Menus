import styles from '../styles/MenuItem.module.css';

const MenuItem = ({ name, description, price, imageURL }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pictureContainer}>
        <img
          className={styles.picture}
          draggable={false}
          src={imageURL}
          alt='burger'
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.horizontalContainer}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>{price}</div>
        </div>
        {description && (
          <div className={styles.description}>{data.description}</div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
