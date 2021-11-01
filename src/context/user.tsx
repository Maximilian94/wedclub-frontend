import React, { createContext, ReactNode, useContext } from 'react';

type ContextValue = {
  getToken: Function;
  setToken: Function;
};

const DEFAULT_VALUE = {
  getToken: () => {},
  setToken: () => {},
};

export const UserContext = createContext<ContextValue>(DEFAULT_VALUE);

export const UserProvider = ({ children }: { children: ReactNode }) => {
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

  const context = { getToken, setToken };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
