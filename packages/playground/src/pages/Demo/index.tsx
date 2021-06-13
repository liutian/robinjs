import { Button, Input, Select } from 'antd';
import { PageManager } from '@robinjs/bootstrap';
import { useLocation } from 'react-router';
import react from 'react';
import * as tslib from 'tslib';
import * as jsxRuntime from 'react/jsx-runtime';

PageManager.configBootstrap({
  modules: {
    react,
    antd: {
      Button,
      Input,
      Select,
    },
    tslib,
    ['react/jsx-runtime']: jsxRuntime,
  },
});

function Demo() {
  const location = useLocation();

  return (
    <>
      <PageManager path={location.pathname} />
    </>
  );
}

export default Demo;
