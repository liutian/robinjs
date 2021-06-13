interface Window {
  define: (depsKey: string[], wrapper: (...defaultModule: any) => void) => void;
  _pageModuleName: string;
  _pageModuleCallback: () => void;
}
