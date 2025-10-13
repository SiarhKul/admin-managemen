import { useEffect, useState } from 'react';
import { PostApi } from '../api/PostApi';
import { IPosts } from '../app/components/PostItem';
import { FetchError } from '../errors/index';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsPostsLoading(true);
        const res = await PostApi.fetchPosts();
        if (isMounted) {
          setPosts(res);
        }

        isMounted = true;
        return res;
      } catch (e: unknown) {
        if (e instanceof FetchError) {
          if (isMounted) {
            setError(e.message);
          }
          console.log('FetchError', JSON.stringify(e, null, 2));
          throw new Error(e.message);
        }
      } finally {
        if (isMounted) {
          setIsPostsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, isPostsLoading, error };
};
