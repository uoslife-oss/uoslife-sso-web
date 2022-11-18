import * as React from 'react';
import { PropsWithChildren, useCallback, useContext, useEffect } from 'react';

import { AuthAPI } from '@/api';
import { useAuthenticationContext } from '@/hooks/AuthenticationContext';
import { ProfileResponse } from '@/models';

type AuthorizationContextProps = {
  isLoadingProfile: boolean;
  setIsLoadingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profile: ProfileResponse | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileResponse | null>>;
};

export const AuthorizationContext =
  React.createContext<AuthorizationContextProps>({
    isLoadingProfile: true,
    setIsLoadingProfile: () => {},
    profile: null,
    setProfile: () => {},
  });

export const AuthorizationContextProvider: React.FC<PropsWithChildren> =
  React.memo(({ children }) => {
    const { isAuthenticating, isAuthenticated } = useAuthenticationContext();
    const [isLoadingProfile, setIsLoadingProfile] = React.useState(false);
    const [profile, setProfile] = React.useState<ProfileResponse | null>(null);

    const initialize = useCallback(() => {
      if (isAuthenticating) return;

      setIsLoadingProfile(true);

      AuthAPI.Profile().then(({ status, data }) => {
        if (status === 200) setProfile(data);
        return setIsLoadingProfile(false);
      });
    }, [isAuthenticated]);

    useEffect(() => initialize(), [isAuthenticating, isAuthenticated]);

    return (
      <AuthorizationContext.Provider
        value={{
          isLoadingProfile,
          setIsLoadingProfile,
          profile,
          setProfile,
        }}
      >
        {children}
      </AuthorizationContext.Provider>
    );
  });

export const useAuthorizationContext = () => useContext(AuthorizationContext);
