'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, message, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { AxiosErrorResponse } from '../../lib/axios';
import { registerSchema, type RegisterFormData } from '../../schemas';
import { authRegisterFn } from '../../services';
import Form from '../forms/form';
import FormInput from '../forms/form-input';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      setLoading(true);

      const result = await authRegisterFn(data);

      if (result.metadata.id) {
        message.success('Register successfully!');
        router.push('/login');
      }
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;

      if (err.response?.status === 422) {
        message.error('Email is already registered');
      } else {
        message.error('Something went wrong. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        maxWidth: '1580px',
        margin: '0 auto',
        padding: '8px',
        display: 'grid',
        alignContent: 'center',
      }}
    >
      <Row justify="center" align="middle">
        <Col xl={8}>
          <Button type="primary" onClick={() => router.push('/')}>
            Go home
          </Button>

          <h1
            style={{
              margin: '15px 0px',
            }}
          >
            Qode - Register
          </h1>
          <div>
            <Form
              submitHandler={onSubmit}
              resolver={zodResolver(registerSchema)}
            >
              <Col span={24} style={{ margin: '15px 0' }}>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="Email"
                  required
                  readOnly={loading}
                />
              </Col>
              <Col span={24} style={{ margin: '15px 0' }}>
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  required
                  readOnly={loading}
                />
              </Col>
              <Button type="primary" htmlType="submit" disabled={loading}>
                Register
              </Button>
            </Form>
            <p style={{ margin: '8px 4px' }}>
              You already have account? <Link href="/login">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
