import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Private = ({ Component }) => {
  const token = useSelector((state) => state.user.token) && sessionStorage.getItem('token');
  console.log(useSelector((state) => state.user.token));

  return token ? <Component /> : <Navigate to="/" />;
};

export default Private;
