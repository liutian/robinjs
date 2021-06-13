interface Window {
  define: (depsKey: string[], wrapper: () => void) => void;
  _pageModuleName: string;
  _pageModuleCallback: () => void;
}
