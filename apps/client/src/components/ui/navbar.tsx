'use client';

import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  message,
  Row,
  Space,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { authLogoutFn } from '../../services';

const { Header: AntHeader } = Layout;

type NavbarProps = {
  isAuthenticated: boolean;
};

export const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    const result = await authLogoutFn();
    if (result.statusCode === 200) message.success('Logout successfully!');
    router.refresh();
  }, [router]);

  useEffect(() => {
    router.refresh();
  }, [isAuthenticated, handleLogout]);

  const items: MenuProps['items'] = [
    {
      key: 'upload',
      label: (
        <Link href="/upload">
          <Button type="link">Upload</Button>
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <Button onClick={handleLogout} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <AntHeader
      id="ant-header"
      style={{
        background: '#fff',
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Row justify="center" align="middle">
          <div>
            <Link href="/">
              <Button
                type="link"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  QODE
                </span>
              </Button>
            </Link>
          </div>
        </Row>

        <div>
          {!isAuthenticated ? (
            <>
              {' '}
              <Link href="/register">
                <Button style={{ marginRight: '5px' }}>Signup</Button>
              </Link>
              <Link href="/login">
                <Button type="primary">Login</Button>
              </Link>
            </>
          ) : (
            <>
              <Dropdown menu={{ items }}>
                <Space wrap size={16}>
                  <Avatar icon={<UserOutlined />} />
                </Space>
              </Dropdown>
            </>
          )}
        </div>
      </Row>
    </AntHeader>
  );
};
