const isValidUsername = (username: string) => {
  return /^[a-zA-Z0-9]{3,15}$/.test(username);
};

export default isValidUsername;
