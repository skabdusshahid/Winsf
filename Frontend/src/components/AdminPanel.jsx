import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminPanel;
