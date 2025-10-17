import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

interface IContext {
  updateState: () => void;
  state: boolean;
}

const StateContext = createContext<IContext>({} as IContext);

export const StateProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(false);
  const updateState = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  const contextValues = {
    updateState,
    state,
  };

  return (
    <StateContext.Provider value={contextValues}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be wrapped with StateContext');
  }
  return context;
};
