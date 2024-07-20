'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, message, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { UploadFormData, uploadSchema } from '../../schemas';
import { uploadPhoto } from '../../services';
import Form from '../forms/form';
import FormUpload from '../forms/form-upload';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<UploadFormData> = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      const images = data.images as File[];

      images.forEach((image) => {
        formData.append('images', image);
      });

      const result = await uploadPhoto(formData);

      if (result.statusCode === 200) {
        message.success('Upload successfully!');
      }
    } catch (error: unknown) {
      message.error('Something went wrong. Please try again');
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
            Qode - Upload
          </h1>

          <div>
            <Form submitHandler={onSubmit} resolver={zodResolver(uploadSchema)}>
              <Col span={24} style={{ margin: '15px 0' }}>
                <FormUpload name="images" />
              </Col>

              <Button type="primary" htmlType="submit" disabled={loading}>
                Upload
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
