import { IPosts } from '../app/components/PostItem';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export class PostApi {
  static async fetchPosts(): Promise<IPosts[]> {
    const fetchPosts = await fetch(API_BASE_URL);
    console.log('4444', fetchPosts);
    if (!fetchPosts.ok) {
      throw new Error('Fetch error');
    }

    return fetchPosts.json();
  }
}
