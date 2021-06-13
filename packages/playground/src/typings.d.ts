declare module '*.less';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly APP: 'online' | 'pl' | 'qa' | 'dev';
  }
}

interface Window {
  define: (depsKey: string[], wrapper: () => void) => void;
  _pageModuleName: string;
  _pageModuleCallback: () => void;
}
