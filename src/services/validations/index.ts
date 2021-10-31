export const nameValidation = (name: string) => {
  const regexName = /^[a-z ,.'-]+$/i;
  return regexName.test(name);
};

export const emailValidation = (email: string) => {
  // eslint-disable-next-line
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email);
};

export const passwordCreationValidation = (
  password: string,
  confirmPassword: string,
) => {
  if (!password || !confirmPassword) {
    return false;
  }
  return password === confirmPassword;
};
