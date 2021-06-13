const loadedModuleMap = new Map<string, any>();
const pageModuleMap = new Map<string, any>();
let internalOptions: AMDOptions;

initDefaultModule();

window.define = function (depsKey, wrapper) {
  const pageModuleName = window._pageModuleName;
  const pageModuleCallback = window._pageModuleCallback;

  const depsPromise = Promise.all(
    depsKey.map((key) => {
      if (key === 'exports') {
        return Promise.resolve(key);
      }

      if (internalOptions.fetchModule) {
        const mod = internalOptions.fetchModule(key);
        if (mod) {
          loadedModuleMap.set(key, mod);
        }
      }

      if (loadedModuleMap.get(key)) {
        if (typeof loadedModuleMap.get(key).then === 'function') {
          return loadedModuleMap.get(key).then((mod: any) => {
            loadedModuleMap.set(key, mod);
            return mod;
          });
        }

        return Promise.resolve(loadedModuleMap.get(key));
      } else {
        throw Error('not found deps :' + key);
      }
    })
  );

  depsPromise.then((deps) => {
    const depsModules = deps.map((keyOrModule) => {
      if (keyOrModule === 'exports') {
        const exportsObj = { __pageModuleName: pageModuleName };
        pageModuleMap.set(pageModuleName, exportsObj);
        return exportsObj;
      }

      return keyOrModule;
    });
    wrapper(...depsModules);
    pageModuleCallback();
  });
};

function initDefaultModule() {
  loadedModuleMap.set('require', requireModule);
}

function requireModule() {
  throw new Error('call require');
}

export function AMDConfig(options: AMDOptions) {
  internalOptions = Object.assign({}, options);

  if (options.modules) {
    Object.keys(options.modules).forEach((key) => {
      loadedModuleMap.set(key, options.modules[key]);
    });
  }
}

export type AMDOptions = {
  modules?: any;
  fetchModule?: (key: string) => any;
};

export { pageModuleMap };
