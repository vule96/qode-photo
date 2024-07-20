import type { PhotoType } from '@qode-photo/shared';
import Image from 'next/image';
import Link from 'next/link';
import { blurhashToBase64 } from '../../lib/blurhash';

interface PhotoItemProps {
  photo: PhotoType;
}

export default function PhotoItem({
  photo: { id, url, hash, originalName },
}: PhotoItemProps) {
  return (
    <Link href={`/photo/${id}`}>
      <div style={{ position: 'relative', aspectRatio: '1 / 1' }}>
        <Image
          src={url}
          placeholder="blur"
          blurDataURL={blurhashToBase64(hash)}
          layout="fill"
          alt={`photo ${originalName}`}
          title={`photo ${originalName}`}
          sizes="(min-width: 1400px) 308px, (min-width: 1000px) calc(20.26vw + 28px), calc(100vw - 30px)"
        />
      </div>
    </Link>
  );
}
