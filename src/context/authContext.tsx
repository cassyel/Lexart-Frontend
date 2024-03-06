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
  token: undefined,
  auth: false,
};

export const AuthContext = createContext<AuthContextProps>({
  user: initialUser,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: ReactProps) {
  const navigate = useNavigate();
  const [authProps, setAuthProps] = useState<UserProps>(initialUser);

  const login = (userData: UserProps) => {
    setAuthProps({ token: userData.token, auth: userData.auth });
  };

  const logout = () => {
    setAuthProps(initialUser);
    navigate('/login');
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
