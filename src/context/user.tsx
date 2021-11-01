import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextValue = {
  token: string;
  setToken: Function;
};

const DEFAULT_VALUE = { token: '', setToken: () => {} };

export const UserContext = createContext<ContextValue>(DEFAULT_VALUE);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('');

  const context = { token, setToken };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
