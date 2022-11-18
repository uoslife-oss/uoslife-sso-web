import * as React from 'react';
import { PropsWithChildren, useCallback, useContext, useEffect } from 'react';

import { AuthAPI } from '@/api';
import { LoginRequest } from '@/models';
import { TokenStorage } from '@/utils/storages';

type AuthenticationContextProps = {
  isAuthenticating: boolean;
  setIsAuthenticating: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (payload: LoginRequest) => Promise<boolean>;
  logout: () => void;
};

export const AuthenticationContext =
  React.createContext<AuthenticationContextProps>({
    isAuthenticating: true,
    isAuthenticated: false,
    setIsAuthenticating: () => {},
    setIsAuthenticated: () => {},
    login: async () => false,
    logout: async () => {},
  });

export const AuthenticationContextProvider: React.FC<PropsWithChildren> =
  React.memo(({ children }) => {
    const [isAuthenticating, setIsAuthenticating] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const initialize = useCallback(() => {
      const refreshToken = TokenStorage.refreshToken.get();
      if (!refreshToken) return setIsAuthenticating(false);

      AuthAPI.Refresh({ refreshToken }).then(({ status, data }) => {
        setIsAuthenticating(false);
        if (status !== 200) return;

        setIsAuthenticated(true);
        TokenStorage.accessToken.set(data.accessToken);
      });
    }, [setIsAuthenticating, setIsAuthenticated]);

    const login = useCallback(async (payload: LoginRequest) => {
      const { status, data } = await AuthAPI.Login(payload);

      if (status === 201) {
        setIsAuthenticated(true);
        TokenStorage.accessToken.set(data.accessToken);
        TokenStorage.refreshToken.set(data.refreshToken);
        return true;
      }

      return false;
    }, []);

    const logout = useCallback(() => {
      setIsAuthenticated(false);
      TokenStorage.accessToken.clear();
      TokenStorage.refreshToken.clear();
      location.replace('/login');
    }, []);

    useEffect(() => initialize(), []);

    return (
      <AuthenticationContext.Provider
        value={{
          isAuthenticated,
          isAuthenticating,
          setIsAuthenticated,
          setIsAuthenticating,
          login,
          logout,
        }}
      >
        {children}
      </AuthenticationContext.Provider>
    );
  });

export const useAuthenticationContext = () => useContext(AuthenticationContext);