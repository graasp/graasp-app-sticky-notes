import React, { createContext, useEffect } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';
import i18n from '../../config/i18n';
import { DEFAULT_LANG } from '../../config/settings';
import { showErrorToast } from '../../utils/toasts';

const postMessage = data => {
  const message = JSON.stringify(data);
  if (window.parent.postMessage) {
    window.parent.postMessage(message, '*');
  } else {
    console.error('unable to find postMessage');
  }
};

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { data: context, isLoading, isError } = hooks.useGetLocalContext(
    {
      origin: window.location.origin,
    },
    postMessage
  );

  useEffect(() => {
    // handle a change of language
    const lang = context?.get('lang') ?? DEFAULT_LANG;
    if (i18n.lang !== lang) {
      i18n.changeLanguage(lang);
    }
    console.log(i18n.language);
  }, [context]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    showErrorToast('An error occured while fetching the context.');
  }

  const value = context ?? Map(); // todo: default context

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

ContextProvider.defaultProps = {
  children: null,
};

export { Context, ContextProvider };
