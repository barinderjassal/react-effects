import { createContext, useEffect, useState, createElement, useContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: () => { }
});

/**
 * We can also use context by giving null as its initial value
 * 
    export const AuthContext = createContext<AuthContextType>(null as any);
 */

export const AuthContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email: any, password: any) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loginInfo = localStorage.getItem('isLoggedIn');
    if (loginInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      onLogin: loginHandler,
      onLogout: logoutHandler
    }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuthenticationContext = () => useContext(AuthContext);
