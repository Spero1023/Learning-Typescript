import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Link
        style={{ fontSize: '30px', position: 'absolute', left: '80px' }}
        to='/hangman'
      >
        HANGMAN
      </Link>
      <Link
        style={{ fontSize: '30px', position: 'absolute', left: '255px' }}
        to='/todo'
      >
        TODO
      </Link>
      <div
        style={{
          textAlign: 'center',
          textDecoration: 'underline',
          fontSize: '20px',
        }}
      >
        This is my landing page
      </div>
    </>
  );
}
export default HomePage;
