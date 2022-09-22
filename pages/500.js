import style from 'styles/errorPage.module.css';
import Link from 'next/link';

const ServerError = () => (
  <div
    className={`${style.marginText} fullscreen d-flex justify-content-center align-items-center`}
  >
    <div className='w-25'>
      <h2>
        <strong>500</strong> Internal Server Error
      </h2>
    </div>
    <hr className='border-2 w-25' />
    <span className='lead'>
      Sorry, There is an Error in The Server. Please Try Again Later.{' '}
      <Link href='/'>
        <a className=''>Go To Main Menu</a>
      </Link>
    </span>
  </div>
);

export default ServerError;
