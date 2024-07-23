import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  if (!isAuthenticated) {
    toast.error("Vous devez être connecté pour accéder à cette page.");
    return <Navigate to="/" replace />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
