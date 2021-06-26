import { AMDConfig, AMDOptions } from './amd';
import { Project } from './project';
import { Options, RobinInstance } from './types';
import { debugInfo, errorInfo } from './util';

const options: Options = {} as any;
const instance: RobinInstance = {} as any;

export function configBootstrap(customOptions: Options): RobinInstance {
  Object.assign(options, customOptions);
  AMDConfig(options as AMDOptions);

  if (options.lazyLoadWorker === false) {
    loadWorker();
  } else if (typeof options.lazyLoadWorker !== 'boolean') {
    options.lazyLoadWorker?.then(() => {
      loadWorker();
    });
  }

  if (options.lazyLoadProject === false) {
    loadProject();
  } else if (typeof options.lazyLoadProject !== 'boolean') {
    options.lazyLoadProject?.then(() => {
      loadProject();
    });
  }

  return instance;
}

export function loadWorker(): void {
  const workerOptions = JSON.stringify({
    tsWorkerUrl:
      'https://typescript.azureedge.net/cdn/4.3.4/monaco/min/vs/language/typescript/tsWorker.js',
  });

  const workerInstance = new Worker(new URL('./webworker', import.meta.url), {
    name: workerOptions,
  });
  workerInstance.addEventListener('message', (e) => {
    if (e.data === 'ok') {
      instance.workerOk = true;
      debugInfo('ready', 'webworker');
    } else {
      debugInfo(`new message \n\n${JSON.stringify(e.data)}`, 'webworker');
    }
  });

  workerInstance.addEventListener('error', (e) => {
    errorInfo(e.message, 'webworker');
  });
  instance.worker = workerInstance;
}

export function loadProject(): Promise<void> {
  if (instance.project) {
    throw new Error('project has loaded');
  }

  instance.projectLoading = true;
  return Promise.resolve({
    /** todo - 请求项目信息 */
  }).then(() => {
    instance.project = Project.create({});
    instance.projectLoading = false;
  });
}

export { options, instance };
