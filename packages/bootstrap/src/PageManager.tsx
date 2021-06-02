import { useEffect, useState } from 'react';
import React from 'react';

import config, { BootstrapOptions } from './config';
import { resolvePage } from './resolvePage';

interface IPageManager<T> extends React.FC<T> {
  config: (options: BootstrapOptions) => void;
}

export const PageManager: IPageManager<{ path: string }> = ({ path }) => {
  const [page, setPage] = useState();

  useEffect(() => {
    resolvePage(path).then((component) => setPage(component));
    return () => {
      setPage(undefined);
    };
  });

  return <>{page || 'loading...'}</>;
};

PageManager.config = config;
