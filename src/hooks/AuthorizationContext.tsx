import * as React from 'react';
import { PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import { ReactChannelIO } from 'react-channel-plugin';

import { AuthAPI } from '@/api';
import { useAuthenticationContext } from '@/hooks/AuthenticationContext';
import { ProfileResponse } from '@/models';
import commonConfig from '@/utils/configs/common.config';

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
      if (isAuthenticating || !isAuthenticated) return;

      setIsLoadingProfile(true);

      AuthAPI.profile()
        .then(({ status, data }) => {
          if (status === 200) setProfile(data);
          return setIsLoadingProfile(false);
        })
        .catch(() => setIsLoadingProfile(false));
    }, [isAuthenticated]);

    useEffect(initialize, [isAuthenticating, isAuthenticated]);

    return (
      <AuthorizationContext.Provider
        value={{
          isLoadingProfile,
          setIsLoadingProfile,
          profile,
          setProfile,
        }}
      >
        {profile ? (
          <ReactChannelIO
            pluginKey={commonConfig.CHANNEL_IO_PLUGIN_KEY}
            profile={{
              email: profile.email,
              mobileNumber: profile.phoneNumber,
              name: profile.name,
            }}
            memberId={profile.id}
            autoBoot={true}
          />
        ) : (
          <ReactChannelIO
            pluginKey={commonConfig.CHANNEL_IO_PLUGIN_KEY}
            autoBoot={true}
          />
        )}

        {children}
      </AuthorizationContext.Provider>
    );
  });

export const useAuthorizationContext = () => useContext(AuthorizationContext);
