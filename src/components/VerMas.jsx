import PropTypes from 'prop-types'; // Importar PropTypes
import { Link } from 'react-router-dom';
import { ArrowUpRightSquare } from 'react-bootstrap-icons';

export default function VerMas({ link }) {
  return (
    <Link
      to={link}
      className="flex items-center gap-2 text-white font-medium py-2 px-3 bg-blue-500 rounded-md w-fit mx-auto cursor-pointer hover:bg-blue-400 transition"
    >
      <span>Ver más</span>
      <ArrowUpRightSquare />
    </Link>
  );
}

VerMas.propTypes = {
  link: PropTypes.string.isRequired,
};
