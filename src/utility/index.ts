const validateUserForm= (username: string, password: string): { valid: boolean; errors: { username: string; password: string } } => {
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  const passwordRegex = /^.{6,}$/;

  if (!nameRegex.test(username)) {
    return { valid: false, errors: { username: "Username can only contain letters, numbers, and underscores.", password: "" } };
  }

  if (!passwordRegex.test(password)) {
    return { valid: false, errors: { username: "", password: "Password must be at least 6 characters long." } };
  }

  return { valid: true, errors: { username: "", password: "" } };
};
export { validateUserForm };