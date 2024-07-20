'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { PhotoType } from '@qode-photo/shared';
import { Button, Col, message, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { AxiosErrorResponse } from '../../lib/axios';
import { blurhashToBase64 } from '../../lib/blurhash';
import { commentSchema, type CommentFormData } from '../../schemas';
import { createComment } from '../../services';
import { CommentType } from '../../types';
import CommentList from '../comments/comment-list';
import Form from '../forms/form';
import FormInput from '../forms/form-input';

interface PhotoDetailPageProps {
  photo: PhotoType;
  comments: CommentType[];
  isAuthenticated: boolean;
}

export default function PhotoDetailPage({
  photo,
  comments,
  isAuthenticated,
}: PhotoDetailPageProps) {
  const router = useRouter();

  const { originalName, url, hash } = photo;

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    try {
      setLoading(true);

      const result = await createComment(data, photo.id);

      if (result.metadata) {
        message.success('comment successfully');
        router.refresh();
      }
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
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
      <Row justify="center" align="top" gutter={24}>
        <Col xl={24}>
          <h1
            style={{
              margin: '15px 0px',
            }}
          >
            Qode - Photo {originalName}
          </h1>

          <Button type="primary" onClick={() => router.push('/')}>
            Go home
          </Button>
        </Col>

        <Col xs={24} md={24} xl={14} style={{ margin: '15px 0' }}>
          <div
            style={{
              aspectRatio: '1',
              position: 'relative',
            }}
          >
            <Image
              src={url}
              placeholder="blur"
              blurDataURL={blurhashToBase64(hash)}
              layout="fill"
              alt={`photo ${originalName}`}
              title={`photo ${originalName}`}
              sizes="(min-width: 1700px) 912px, (min-width: 1200px) calc(48.13vw + 104px), calc(100vw - 16px)"
            />
          </div>
        </Col>

        <Col xl={10} style={{ margin: '15px 0' }}>
          <div
            style={{
              maxHeight: 650,
              overflow: 'auto',
            }}
          >
            <CommentList comments={comments} />
          </div>

          {isAuthenticated ? (
            <Form
              submitHandler={onSubmit}
              resolver={zodResolver(commentSchema)}
            >
              <Col span={24} style={{ margin: '15px 0' }}>
                <FormInput
                  name="content"
                  type="text"
                  size="large"
                  label="Message"
                  required
                  readOnly={loading}
                />

                <div>
                  <Button
                    style={{ margin: '15px 0 0' }}
                    type="primary"
                    htmlType="submit"
                    disabled={loading}
                  >
                    Post
                  </Button>
                </div>
              </Col>
            </Form>
          ) : (
            <p
              style={{
                fontSize: 24,
                margin: '24px 0',
              }}
            >
              Please login to comment
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
}
