import React, { createContext, ReactNode, useContext, useState } from 'react';
import { userLogin } from '../services/api';

type ContextValue = {
  getToken: Function;
  setToken: Function;
  login: Function;
  userData: { firstName: string; lastName: string, role: string };
};

const DEFAULT_VALUE = {
  getToken: () => {},
  setToken: () => {},
  login: () => {},
  userData: { firstName: 'First Name', lastName: 'Last Name', role: 'Role' },
};

const DEfAULT_USER_DATA = { firstName: 'loading' }; // eslint-disable-line

export const UserContext = createContext<ContextValue>(DEFAULT_VALUE);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>(DEfAULT_USER_DATA);

  const login = async (email: string, password: string) => {
    const response: any = await userLogin(email, password);
    const responseData: any = await response.json();
    setUserData(responseData.userData);
    return responseData;
  };

  const getToken = () => {
    let item: string | null = localStorage.getItem('wedUser');
    if (!item) {
      localStorage.setItem('wedUser', JSON.stringify({ token: '' }));
      item = localStorage.getItem('wedUser');
    }
    const wedUser: { token: string } = item ? JSON.parse(item) : { token: '' };
    console.log(wedUser.token);
    return wedUser.token;
  };

  const setToken = (Token: string) => {
    let item: string | null = localStorage.getItem('wedUser');
    if (!item) {
      localStorage.setItem('wedUser', JSON.stringify({ token: '' }));
      item = localStorage.getItem('wedUser');
    }
    const wedUser: { token: string } = item ? JSON.parse(item) : { token: '' };
    const newData = { ...wedUser, token: Token };
    localStorage.setItem('wedUser', JSON.stringify(newData));
  };

  const context = { getToken, setToken, login, userData };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
