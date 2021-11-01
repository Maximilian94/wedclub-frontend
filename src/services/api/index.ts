const BASE_URL = 'http://localhost:3001';

const options = (
  requestMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: object,
  token?: string,
) => {
  console.log('Pediu para fazer o objeto');
  return {
    method: requestMethod,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || 'no token',
    },
  };
};

export const userUpdate = async () => {};

export const userLogin = async (email: string, password: string) => {
  const body = { email, password };
  return fetch(`${BASE_URL}/login`, options('POST', body));
};

export const createAccount = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const body = { email, password, firstName, lastName };
  return fetch(`${BASE_URL}/user`, options('POST', body));
};

export const getAllUsers = async () => fetch(`${BASE_URL}/user`, options('GET'));
