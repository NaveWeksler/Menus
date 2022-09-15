import { useState } from 'react';

const Header = ({ title }) => {
  return <h1>{title ? title : 'Default Title'}</h1>;
};

const HomePage = () => {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <Header title='Develop. Preview. Ship. 🚀' />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button
        onClick={() => setLikes(likes + 1)}
        className='bg-sky-500 hover:bg-sky-700'
      >
        Like ({likes})
      </button>
    </div>
  );
};

export default HomePage;
