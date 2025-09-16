import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { MessageProvider } from './app/providers/MessageProvider';
import { Flex } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <Flex
          vertical
          style={{ padding: 16, maxWidth: 1200, margin: '0 auto' }}
        >
          <App />
        </Flex>
      </MessageProvider>
    </BrowserRouter>
  </StrictMode>
);
