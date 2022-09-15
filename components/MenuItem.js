import styles from '../styles/MenuItem.module.css';

const MenuItem = ({ data }) => {
  console.log(data);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pictureContainer}>
        <img
          className={styles.picture}
          draggable={false}
          src={data.image}
          alt='burger'
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.horizontalContainer}>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.price}>{data.price}</div>
        </div>
        <div className={styles.description}>{data.description}</div>
      </div>
    </div>
  );
};

export default MenuItem;
