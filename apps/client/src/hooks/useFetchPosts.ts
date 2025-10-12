import { useEffect, useState } from 'react';
import { PostApi } from '../api/PostApi';
import { IPosts } from '../app/components/PostItem';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await PostApi.fetchPosts();
        console.log('111111111', res);
        setPosts(res);
        return res;
      } catch (e: unknown) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  return { posts };
};
