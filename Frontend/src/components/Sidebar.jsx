import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside>
    <ul>
      <li><Link to="/admin">Dashboard</Link></li>
      {/* Add more links as needed */}
    </ul>
  </aside>
);

export default Sidebar;
