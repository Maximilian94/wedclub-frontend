import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  userLogin,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../services/api';

type ContextValue = {
  getToken: Function;
  setToken: Function;
  login: Function;
  userData: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  };
  userToUpdateData: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  };
  getUserToUpdateData: Function;
  useToUpdateHandleChange: Function;
  updateUserOnlyChangesFields: Function;
  deleteUser: Function;
};

const DEFAULT_VALUE = {
  getToken: () => {},
  setToken: () => {},
  login: () => {},
  userData: {
    _id: 'id',
    firstName: 'First Name',
    lastName: 'Last Name',
    role: 'Role',
    email: 'email@email.com',
  },
  userToUpdateData: {
    _id: 'id',
    firstName: 'First Name',
    lastName: 'Last Name',
    role: 'Role',
    email: 'email@email.com',
  },
  getUserToUpdateData: () => {},
  useToUpdateHandleChange: () => {},
  updateUserOnlyChangesFields: () => {},
  deleteUser: () => {},
};

// eslint-disable-next-line
const DEfAULT_USER_DATA = {
  firstName: 'First Name',
  lastName: 'Last Name',
  role: 'Role',
  email: 'email@email.com',
};

export const UserContext = createContext<ContextValue>(DEFAULT_VALUE);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>(DEfAULT_USER_DATA);
  const [originalUserToUpdateData, setOriginalUserToUpdateData] = useState({});
  const [userToUpdateData, setUserToUpdateData] = useState<any>(
    DEFAULT_VALUE.userToUpdateData,
  );

  const login = async (email: string, password: string) => {
    const response: any = await userLogin(email, password);
    const responseData: any = await response.json();
    console.log(responseData.userData);
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

  const updateUserOnlyChangesFields = async (id: string) => {
    const originalData: any = Object.entries(originalUserToUpdateData);
    const updateData: any = Object.entries(userToUpdateData);
    let changedValues: any = [];
    if (originalData.length >= updateData.length) {
      const changedFields = originalData.filter(
        (item: any) => userToUpdateData[item[0]] !== item[1],
      );
      changedValues = changedFields.map((ondeItem: any) => [
        ondeItem[0],
        userToUpdateData[ondeItem[0]],
      ]);
    }

    changedValues = Object.fromEntries(changedValues);
    // console.log(originalData);
    // console.log(updateData);
    // console.log('Novo');
    // console.log(changedValues);
    const response = await updateUserById(id, changedValues);
    return response;
  };

  const useToUpdateHandleChange = (target: HTMLInputElement) => {
    const { name, value } = target;
    setUserToUpdateData({ ...userToUpdateData, [name]: value });
  };

  const getUserToUpdateData = async (id: string) => {
    const response = await getUserById(id);
    const data = await response.json();
    console.log(data);
    setUserToUpdateData(data.userData);
    setOriginalUserToUpdateData(data.userData);
  };

  const deleteUser: any = async (id: string) => {
    const response = await deleteUserById(id);
    const dataResponse = await response.json();
    return dataResponse;
  };

  const context = {
    getToken,
    setToken,
    login,
    userData,
    userToUpdateData,
    getUserToUpdateData,
    useToUpdateHandleChange,
    updateUserOnlyChangesFields,
    deleteUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
