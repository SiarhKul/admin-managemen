import { PostItem } from './PostItem';
import { useFetchPosts } from '../../hooks/useFetchPosts';

export const PostList = () => {
  const posts1 = [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae',
    },
    {
      userId: 1,
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'et iusto sed quo iure',
    },
  ];

  const { posts } = useFetchPosts();
  console.log(posts);

  return (
    <div>
      {posts1.map((post) => {
        return <PostItem post={post} key={post.userId} />;
      })}
    </div>
  );
};
