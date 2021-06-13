import { useEffect, useState } from 'react';
import React from 'react';

import { BootstrapOptions, configBootstrap } from './config';
import { resolvePage } from './resolvePage';

interface IPageContainer<T> extends React.FC<T> {
  configBootstrap: (options: BootstrapOptions) => void;
}

export const PageManager: IPageContainer<{ path: string }> = ({ path }) => {
  const [page, setPage] = useState('div');

  useEffect(() => {
    resolvePage(path).then((pageModule) => {
      setPage(() => {
        return pageModule;
      });
    });
    return () => {
      setPage('div');
    };
  }, [path]);

  return React.createElement(page, { children: 'loading...' });
};

PageManager.configBootstrap = configBootstrap;
