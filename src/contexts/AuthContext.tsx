import React, {ReactNode} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '../services/api';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = React.useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: '',
  });

  const [loadingAuth, setLoadingAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = !!user.name;

  React.useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
      let hasUser: UserProps = JSON.parse(userInfo || '{}');

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common.Authorization = `Bearer ${hasUser.token}`;
        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function signIn({email, password}: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/session', {
        email,
        password,
      });

      const {id, name, token} = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data));

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);

      // console.log(response.data);
    } catch (error) {
      console.log('error ao acessar', error);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: '',
        name: '',
        email: '',
        token: '',
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{user, isAuthenticated, signIn, loading, loadingAuth, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}
