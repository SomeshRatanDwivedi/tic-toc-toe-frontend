import { gameApiInstance } from "../instance";
// User Authentication APIs

/**
 * User login
 * @param userInfo - User information
 * @returns token and user info
 */
export const login = async (userInfo: { username: string; password: string }) => {
  const response = await gameApiInstance.post("auth/login", userInfo);
  return response.data;
};


/** * User signup
 * @param userInfo - User information
 * @returns success message
 */
export const signup = async (userInfo: { username: string; password: string }) => {
  const response = await gameApiInstance.post("auth/register", userInfo);
  return response.data;
};