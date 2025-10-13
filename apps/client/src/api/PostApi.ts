import { IPosts } from '../app/components/PostItem';
import { FetchError } from '../errors/index';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/postsы';

export class PostApi {
  static async fetchPosts(): Promise<IPosts[]> {
    const fetchPosts = await fetch(API_BASE_URL);
    if (!fetchPosts.ok) {
      throw new FetchError('Error while fetching posts');
    }

    return fetchPosts.json();
  }
}
