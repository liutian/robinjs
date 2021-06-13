import { CodeMetadata, createCode } from '@robinjs/transform';
import { pageModuleMap } from './amd';
const pageDataMap = new Map<string, any>();

export function resolvePage(path: string): Promise<any> {
  if (pageModuleMap.get(path)) {
    return Promise.resolve(pageModuleMap.get(path).default);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = { moduleName: path.replace('/robin/', '') };
      pageDataMap.set(path, data);
      resolve(data);
    }, 1000);
  }).then((data) => {
    let resolveCallback: (moduleDefault: any) => void;

    const sourceCode = createCode(data as CodeMetadata);
    window._pageModuleName = path;
    window._pageModuleCallback = function () {
      const pageModuleDefault = pageModuleMap.get(path).default;
      resolveCallback(pageModuleDefault);
    };

    window.Function(sourceCode)();

    return new Promise((resolve) => {
      resolveCallback = resolve;
    });
  });
}
