import axios from 'axios';
import {
  createContext, useState, useMemo, ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

type UserProps = { token: string | undefined, auth: boolean };
type ReactProps = { children: ReactNode };

interface AuthContextProps {
  user: UserProps;
  login: (userData: UserProps) => void;
  logout: () => void;
}

const initialUser: UserProps = {
  token: localStorage.getItem('token') || undefined,
  auth: Boolean(localStorage.getItem('token')) || false,
};

export const AuthContext = createContext<AuthContextProps>({
  user: initialUser,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: ReactProps) {
  const navigate = useNavigate();
  const [authProps, setAuthProps] = useState<UserProps>(initialUser);

  axios.defaults.headers.authorization = authProps.token || null;

  const login = (userData: UserProps) => {
    localStorage.setItem('token', userData.token || '');
    setAuthProps({ token: userData.token, auth: userData.auth });
  };

  const logout = () => {
    localStorage.removeItem('token');

    setAuthProps(initialUser);
    axios.defaults.headers.authorization = null;
    navigate('/login', { replace: true });
  };

  const contextValue = useMemo(() => ({
    user: authProps,
    login,
    logout,
  }), [authProps]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
