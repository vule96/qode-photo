import { CommentType } from '../../types';
import CommentItem from './comment-item';

interface CommentListType {
  comments: CommentType[];
}

export default function CommentList({ comments }: CommentListType) {
  return (
    <>
      {comments.length ? (
        <>
          <ul>
            {comments.map((item) => (
              <li key={item.id} style={{ padding: '15px 0 15px 0' }}>
                <CommentItem comment={item} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
