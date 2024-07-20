'use client';

import { Input } from 'antd';
import get from 'lodash/get';
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  type?: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  readOnly?: boolean;
}

function FormInput<TFieldValues extends FieldValues>({
  name,
  type,
  size = 'large',
  value,
  placeholder,
  label,
  required,
  readOnly = false,
}: FormInputProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);

  return (
    <>
      <p style={{ marginBottom: '4px' }}>
        {required ? (
          <span
            style={{
              color: 'red',
              paddingRight: '2px',
            }}
          >
            *
          </span>
        ) : null}
        {label ? label : null}
      </p>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === 'password' ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              disabled={readOnly}
              readOnly={readOnly}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />

      {Boolean(fieldError) ? (
        <small style={{ color: 'red' }}>
          {fieldError?.message?.toString()}
        </small>
      ) : null}
    </>
  );
}

export default FormInput;
