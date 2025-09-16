import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { message } from 'antd';

interface IMessageContext {
  success: (text: string) => void;
  error: (text: string) => void;
}

const MessageContext = createContext<IMessageContext | null>(null);

export const MessageProvider = ({ children }: PropsWithChildren) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text: string) => messageApi.success(text);
  const error = (text: string) => messageApi.error(text);

  const ms = useMemo(() => ({ success, error }), []);

  return (
    <MessageContext.Provider value={ms}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
