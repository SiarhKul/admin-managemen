const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

class PostApi {
  static async fetchPosts() {
    const fetchPosts = await fetch(API_BASE_URL);
    console.log('4444', fetchPosts);
    if (!fetchPosts.ok) {
      throw new Error('Fetch error');
    }

    return fetchPosts.json();
  }
}
