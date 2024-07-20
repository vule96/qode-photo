import axios, { HttpStatusCode, type AxiosError } from 'axios';

type ApiErrorResponseType = {
  error: string;
  message: string;
  statusCode: number;
};

export type AxiosErrorResponse = AxiosError<ApiErrorResponseType>;

export type AxiosSuccessResponse = {
  message: string;
  statusCode: number;
};

export type AxiosSuccessWithDataResponse<T extends object> =
  AxiosSuccessResponse & {
    metadata: T;
  };

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      if (
        error.response.status === HttpStatusCode.Unauthorized &&
        error.response.data.message === 'AccessTokenError' &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        //   await refreshAccessTokenFn()

        return axiosInstance(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);
