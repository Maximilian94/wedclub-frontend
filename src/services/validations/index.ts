const emailValidation = (email: string) => {
  // eslint-disable-next-line
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email);
};

export default emailValidation;
