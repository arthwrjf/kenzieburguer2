/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../providers/ShopContext/ShopContext';
import { UserContext } from '../../providers/UserContext/UserContext';

export function ProtectedRoutes() {
  const token = localStorage.getItem('@TOKEN');

  const navigate = useNavigate();
  const { userLoad } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  return token ? <Outlet /> : null;
}
