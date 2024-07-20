import { userKey } from '@qode-photo/shared';
import PhotoDetailPage from 'apps/client/src/components/pages/photo-detail';
import { getCommentsByPhoto, getPhotoById } from 'apps/client/src/services';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

type PhotoProps = {
  params: { id: string };
};

async function getPhotoDetail(id: PhotoProps['params']['id']) {
  const response = await getPhotoById(id);
  return response.metadata;
}

async function getComments(id: PhotoProps['params']['id']) {
  const response = await getCommentsByPhoto(id);
  return response.metadata;
}

export async function generateMetadata({
  params: { id },
}: PhotoProps): Promise<Metadata> {
  const photo = await getPhotoById(id);

  if (!photo.metadata) return {};

  return {
    title: `Photo ${photo.metadata.originalName}`,
  };
}

export default async function Photo({ params: { id } }: PhotoProps) {
  const cookiesStore = cookies();
  const userCookie = cookiesStore.get(userKey);

  const [photo, comments] = await Promise.all([
    getPhotoDetail(id),
    getComments(id),
  ]);

  return (
    <PhotoDetailPage
      photo={photo}
      comments={comments}
      isAuthenticated={!!userCookie}
    />
  );
}
