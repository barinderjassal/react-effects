import {createElement} from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { AuthContextProvider } from './context';

import './index.css';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root'));
