import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl mb-4">404</h1>
      <p className="text-2xl mb-4">Pagina no encontrada</p>
      <Link to="/" className="hover:bg-blue-400 bg-blue-600 rounded-md text-white  text-xl p-2 ">
        Volver
      </Link>
    </div>
  );
};

export default NotFound;
