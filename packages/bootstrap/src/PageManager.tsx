import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import config, { BootstrapOptions } from './config';
import { resolvePage } from './resolvePage';

interface IPageManager extends React.FC {
  config: (options: BootstrapOptions) => void;
}

export const PageManager: IPageManager = () => {
  const [page, setPage] = useState();
  const location = useLocation();

  useEffect(() => {
    resolvePage(location.pathname).then((component) => setPage(component));
    return () => {
      setPage(undefined);
    };
  });

  return <>{page || 'loading...'}</>;
};

PageManager.config = config;
