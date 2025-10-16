import { useEffect, useState } from 'react';
import { PostApi } from '../api/PostApi';
import { IPosts } from '../app/components/PostItem';
import { FetchError } from '../errors/index';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setIsPostsLoading(true);

        const response = await PostApi.fetchPosts(abortController.signal);

        setPosts([]);

        return response;
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') {
          return;
        }

        if (e instanceof FetchError || e instanceof Error) {
          setError(e.message);
          return;
        } else {
          setError('Unknown error');
        }
      } finally {
        setIsPostsLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { posts, isPostsLoading, error };
};
