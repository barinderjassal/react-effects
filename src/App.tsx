import { FC, Fragment, createElement } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { LoginWithUseReducer } from './components/Login/LoginWithUseReducer';
import { MainHeader } from './components/MainHeader';
import { useAuthenticationContext } from './context';

export const App: FC = () => {
  const { isLoggedIn} = useAuthenticationContext();
  return (
    <Fragment>
      <MainHeader />
      {/* {!isLoggedIn && <Login onLogin={loginHandler} />} */}
      {!isLoggedIn && <LoginWithUseReducer />}
      {isLoggedIn && <Home  />}
    </Fragment>
  );
}