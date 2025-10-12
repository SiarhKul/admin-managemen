import { useEffect, useState } from 'react';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await PostApi.fetchPosts();
        console.log('111111111', res);
        setPosts(res);
        return res;
      } catch (e: unknown) {}
    };
    fetchPosts();
  }, []);

  return { posts };
};
