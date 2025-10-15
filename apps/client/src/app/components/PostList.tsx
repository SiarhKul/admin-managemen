import { PostItem } from './PostItem';
import { useFetchPosts } from '../../hooks/useFetchPosts';

export const PostList = () => {
  const { posts, error } = useFetchPosts();

  return (
    <div>
      <div>{error}</div>
      {posts.map((post) => {
        return <PostItem {...post} key={post.userId} />;
      })}
    </div>
  );
};
