'use client';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import get from 'lodash/get';
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

const { Dragger } = Upload;

interface FormUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
}

function FormUpload<TFieldValues extends FieldValues>({
  name,
}: FormUploadProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { value = [], onChange } = field; // Default to empty array if value is undefined

          const handleRemove = (file: any) => {
            URL.revokeObjectURL(file.url);

            const updatedFiles = value.filter(
              (f: File) => f.name !== file.name
            );
            onChange(updatedFiles);
          };

          return (
            <Dragger
              multiple={false}
              beforeUpload={(file) => {
                if (!file.type.startsWith('image/')) {
                  message.error(`${file.name} is not an image file`);
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              onChange={(info) => {
                const files = info.fileList
                  .map((file) => file.originFileObj)
                  .filter(Boolean);
                onChange(files);
              }}
              fileList={
                value?.map((file: File) => ({
                  uid: file.name,
                  name: file.name,
                  status: 'done',
                  url: URL.createObjectURL(file),
                })) || []
              }
              onRemove={handleRemove}
              showUploadList={{
                showRemoveIcon: true,
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Support for a single upload.</p>
            </Dragger>
          );
        }}
      />

      {Boolean(fieldError) ? (
        <small style={{ color: 'red' }}>
          {fieldError?.message?.toString()}
        </small>
      ) : null}
    </>
  );
}

export default FormUpload;
