import type { PhotoType } from '@qode-photo/shared';
import {
  AxiosSuccessResponse,
  AxiosSuccessWithDataResponse,
} from '../lib/axios';
import http from '../lib/http';

export async function getPhotos() {
  const result = await http.get('photo', {
    cache: 'no-store',
  });

  return result.payload as AxiosSuccessWithDataResponse<PhotoType[]>;
}

export async function getPhotoById(id: PhotoType['id']) {
  const result = await http.get(`photo/${id}`, {
    cache: 'no-store',
  });

  return result.payload as AxiosSuccessWithDataResponse<PhotoType>;
}

export const uploadPhoto = async (formData: FormData) => {
  const res = await http.post<AxiosSuccessResponse>(`photo/uploads`, formData);
  return res.payload;
};
