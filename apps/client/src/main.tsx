import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { MessageProvider } from './app/providers/MessageProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <App />
      </MessageProvider>
    </BrowserRouter>
  </StrictMode>
);
