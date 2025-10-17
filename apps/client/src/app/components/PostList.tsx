import { PostItem } from './PostItem';
import { useFetchPosts } from '../../hooks/useFetchPosts';
import { useStateContext } from '../../prividers/StateProvider';

export const PostList = () => {
  const { posts, error } = useFetchPosts();
  const { updateState, state } = useStateContext();
  console.log('11111111111', state);

  return (
    <div>
      <button onClick={updateState}>Toggle state</button>
      <div>{error}</div>
      {posts.map((post) => {
        return <PostItem {...post} key={post.userId} />;
      })}
    </div>
  );
};
