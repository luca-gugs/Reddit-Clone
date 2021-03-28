import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { CommentSection } from '../../components/Organisms/CommentSection';
import { Nav } from '../../components/Organisms/Nav';
import { MainCard } from '../../components/Organisms/Posts/MainCard';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
interface postProps {}

const Post: React.FC<postProps> = ({}) => {
  const router = useRouter();

  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  const [{ data }] = usePostQuery({
    variables: {
      id: intId,
    },
  });
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Nav />
      <MainCard post={data?.post?.post} />
      <CommentSection
        comments={data?.post?.comments}
        id={data?.post?.post.id}
      />
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
