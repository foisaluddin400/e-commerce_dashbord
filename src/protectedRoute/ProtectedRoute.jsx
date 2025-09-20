

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  
  const {token} = useSelector((state) => state.logInUser)
  console.log(token)
  const { pathname } = useLocation();

  if (!token) {
      return <Navigate to="/login" state={{ path: pathname }}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
