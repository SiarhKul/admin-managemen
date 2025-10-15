import { UserTable } from './components/UserTable';
import { PostList } from './components/PostList';
import ErrorBoundary from './components/ErrorBoundary';
import {
  GlobalErrorHandler,
  useGlobalErrorHandler,
} from '../hooks/useGlobalErrorHandler';

const onError: GlobalErrorHandler = (error, meta) => {
  console.error('Global error captured:', { error, meta });
};

const App = () => {
  useGlobalErrorHandler(onError);

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
