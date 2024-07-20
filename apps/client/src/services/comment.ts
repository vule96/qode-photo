import type { PhotoType } from '@qode-photo/shared';
import { AxiosSuccessWithDataResponse } from '../lib/axios';
import http from '../lib/http';
import type { CommentFormData } from '../schemas';
import type { CommentType } from '../types';

export async function getCommentsByPhoto(id: PhotoType['id']) {
  const result = await http.get(`comment/${id}`, {
    cache: 'no-cache',
  });
  return result.payload as AxiosSuccessWithDataResponse<CommentType[]>;
}

export async function createComment(
  data: CommentFormData,
  photoId: PhotoType['id']
) {
  const result = await http.post<AxiosSuccessWithDataResponse<CommentType>>(
    `comment/${photoId}`,
    data,
    {
      cache: 'no-cache',
    }
  );

  return result.payload;
}
