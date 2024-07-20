import { userKey } from '@qode-photo/shared';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import PhotoList from '../components/photos/photo-list';
import { Navbar } from '../components/ui';

export default function Index() {
  const cookiesStore = cookies();
  const userCookie = cookiesStore.get(userKey);

  return (
    <div style={{ maxWidth: '1580px', margin: '0 auto' }}>
      <Navbar isAuthenticated={!!userCookie} />

      <Suspense fallback={'Loading...'}>
        {/* @ts-ignore Async Server Component */}
        <PhotoList />
      </Suspense>
    </div>
  );
}
