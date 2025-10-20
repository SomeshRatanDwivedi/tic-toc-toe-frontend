import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL } from '../../constants/api.constant';
import { requestHandler, responseHandler } from '../../config/api.config';
const gameApiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

gameApiInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return req;
  req.headers.Authorization = 'Bearer ' + token;
  return req;
}, requestHandler);

gameApiInstance.interceptors.response.use((res) => res, responseHandler);

export { gameApiInstance };