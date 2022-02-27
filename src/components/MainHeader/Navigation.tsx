import { createElement, FC } from 'react';
import { useAuthenticationContext } from '../../context';

import './styles/navigation.css';

export const Navigation: FC = () => {
  const { isLoggedIn, onLogout } = useAuthenticationContext();
  return (
    <nav className="nav">
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
