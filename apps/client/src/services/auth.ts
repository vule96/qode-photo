import {
  axiosInstance,
  AxiosSuccessResponse,
  AxiosSuccessWithDataResponse,
} from '../lib/axios';
import type { LoginFormData, RegisterFormData } from '../schemas';
import type { LoginResponse, UserType } from '../types';

export const authLoginFn = async (data: LoginFormData) => {
  const res = await axiosInstance.post<
    AxiosSuccessWithDataResponse<LoginResponse>
  >('auth/login', data, {});
  return res.data;
};

export const authRegisterFn = async (data: RegisterFormData) => {
  const res = await axiosInstance.post<AxiosSuccessWithDataResponse<UserType>>(
    'auth/register',
    data,
    {}
  );
  return res.data;
};

export const authLogoutFn = async () => {
  const res = await axiosInstance.post<AxiosSuccessResponse>('auth/logout');
  return res.data;
};
