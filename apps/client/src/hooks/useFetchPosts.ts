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

        setPosts(response);

        return response;
      } catch (e: unknown) {
        throw new Error('11111111111111111111111');
        // if (e instanceof Error && e.name === 'AbortError') {
        //   return;
        // }
        //
        // if (e instanceof FetchError || e instanceof Error) {
        //   setError(e.message);
        //   return;
        // } else {
        //   setError('Unknown error');
        // }
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

/*
import { useEffect, useState } from 'react';
import { PostApi } from '../api/PostApi';
import { IPosts } from '../app/components/PostItem';
import { FetchError } from '../errors/index';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true); // 1. Начальное состояние true
  const [error, setError] = useState('');

  useEffect(() => {
    // 2. Используем AbortController для отмены запроса
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        // Сбрасываем предыдущие ошибки
        setError('');
        // Устанавливаем загрузку (на случай повторного вызова)
        setIsPostsLoading(true);

        // 3. Передаем signal в метод API
        const response = await PostApi.fetchPosts(abortController.signal);
        setPosts(response);
      } catch (e: unknown) {
        // 4. Игнорируем ошибку отмены
        if (e instanceof Error && e.name === 'AbortError') {
          return;
        }

        // 5. Упрощенная обработка ошибок
        if (e instanceof FetchError || e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsPostsLoading(false);
      }
    };

    fetchData();

    // 6. Функция очистки для отмены запроса
    return () => {
      abortController.abort();
    };
  }, []);

  return { posts, isPostsLoading, error };
};
*/
