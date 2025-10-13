import { useEffect, useState } from 'react';
import { PostApi } from '../api/PostApi';
import { IPosts } from '../app/components/PostItem';
import { FetchError } from '../errors/index';
import logger from '../utils/logger';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await PostApi.fetchPosts();
        if (isMounted) {
          setIsPostsLoading(true);
          setPosts(response);
        }

        return response;
      } catch (e: unknown) {
        if (e instanceof FetchError) {
          if (isMounted) {
            setError(e.message);
          }
          return;
        }

        const error = e instanceof Error ? e.message : 'Unknow error';

        if (isMounted) {
          setError(error);
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
