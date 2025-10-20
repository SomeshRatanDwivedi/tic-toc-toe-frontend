const validateUserForm= (username: string, password: string): { valid: boolean; message?: string } => {
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  const passwordRegex = /^.{6,}$/;

  if (!nameRegex.test(username)) {
    return { valid: false, message: "Username can only contain letters, numbers, and underscores." };
  }

  if (!passwordRegex.test(password)) {
    return { valid: false, message: "Password must be at least 6 characters long." };
  }

  return { valid: true };
};
export { validateUserForm };