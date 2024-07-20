import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex } from 'antd';
import type { CommentType } from '../../types';

interface CommentItemProps {
  comment: CommentType;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const {
    content,
    user: { email },
  } = comment;

  return (
    <Flex gap="middle" align="start" vertical={false}>
      <Avatar icon={<UserOutlined />} />
      <Flex gap="small" vertical>
        <p
          style={{
            color: 'rgba(0,0,0,0.45)',
          }}
        >
          {email}
        </p>
        <p>{content}</p>
      </Flex>
    </Flex>
  );
}
