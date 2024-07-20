import { BASE_URL } from './axios';

type CustomOptions = RequestInit & {
  baseUrl?: string;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions
) => {
  const body =
    options?.body instanceof FormData
      ? options.body
      : JSON.stringify(options?.body);

  const headers =
    options?.body instanceof FormData
      ? options?.headers
      : {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        };

  const fullUrl = BASE_URL + url;

  const res = await fetch(fullUrl, {
    ...options,
    headers,
    credentials: 'include',
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    // throw new HttpError(data)
  }

  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'>
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'>
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
};

export default http;
