import { IPosts } from '../app/components/PostItem';
import { FetchError } from '../errors/index';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts1';

export class PostApi {
  static async fetchPosts(signal: AbortSignal): Promise<IPosts[]> {
    const response = await fetch(API_BASE_URL, { signal });
    if (!response.ok) {
      throw new FetchError('Error while fetching posts');
    }

    return response.json();
  }
}
