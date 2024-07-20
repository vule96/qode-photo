'use client';

import { Button, Result } from 'antd';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <Result
        status="error"
        title="Unexpected error"
        subTitle={error.message}
        extra={[
          <Button key="back" onClick={reset}>
            Retry again!
          </Button>
        ]}
      />
    </div>
  );
}
