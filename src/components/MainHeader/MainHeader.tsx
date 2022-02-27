import { FC, createElement } from 'react';

import { Navigation } from './Navigation';
import './styles/main-header.css';

export const MainHeader: FC = () => {
  return (
    <header className="main-header">
      <h1>A Typical Page</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
