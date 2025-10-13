import { UserTable } from './components/UserTable';
import { PostList } from './components/PostList';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <div>
        <PostList />
        <UserTable />
      </div>
    </ErrorBoundary>
  );
};

export default App;
