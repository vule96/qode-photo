import { AntdRegistry } from '@ant-design/nextjs-registry';
import NextTopLoader from 'nextjs-toploader';
import { AntdThemeConfigProvider } from '../providers';
import './global.css';

export const metadata = {
  title: 'Welcome to client',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#3F96FE"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3F96FE,0 0 5px "
        />
        <AntdRegistry>
          <AntdThemeConfigProvider>{children}</AntdThemeConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
