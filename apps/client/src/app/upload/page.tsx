import type { Metadata } from 'next';
import UploadPage from '../../components/pages/upload-page';

export const metadata: Metadata = {
  title: 'Upload',
};

export default function Upload() {
  return <UploadPage />;
}
