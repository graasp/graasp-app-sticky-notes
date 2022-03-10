import { useContext } from 'react';
import { Context } from './ContextContext';
import { TokenContext } from './TokenContext';
import { hooks } from '../../config/queryClient';

export const useAppData = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppData({ token, itemId: context?.get('itemId') });
  return query;
};

export const useAppActions = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppActions({ token, itemId: context?.get('itemId') });
  return query;
};

export const useAppContext = () => {
  const context = useContext(Context);
  const token = useContext(TokenContext);
  const query = hooks.useAppContext({ token, itemId: context?.get('itemId') });
  return query;
};