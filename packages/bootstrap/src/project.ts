import { CodeMetadata } from '@robinjs/core';
import { instance, loadWorker } from './config';
import { InputMessage, OutputMessage } from './types';
import { errorInfo } from './util';

export class Project {
  private allPageMap = new Map<string, Page>();
  private loadedPageMap = new Map<string, Page>();

  private constructor(public name: string, public key: string) {}

  static create(data: any): Project {
    const project = new Project(data.name, data.key);

    /** mock */
    const page1 = new Page('/robin/page1', '');
    project.allPageMap.set('/robin/page1', page1);
    const page2 = new Page('/robin/page2', '');
    project.allPageMap.set('/robin/page2', page2);
    const page3 = new Page('/robin/page3', '');
    project.allPageMap.set('/robin/page3', page3);

    return project;
  }

  hasPage(path: string): boolean {
    return this.loadedPageMap.has(path);
  }

  getPage(path: string): Page {
    return this.loadedPageMap.get(path)!;
  }

  loadPage(path: string): Promise<Page> {
    const page = this.allPageMap.get(path);

    if (!page) {
      return Promise.reject(new Error('not found page'));
    }

    if (!page.resourceUrl && !instance.worker) {
      this.initWorker();
    }

    return page.loadModule().then(() => {
      this.loadedPageMap.set(path, page);
      return page;
    });
  }

  private initWorker() {
    loadWorker();

    instance.worker.addEventListener(
      'message',
      ({ data: { type, code, path } }: { data: OutputMessage }) => {
        if (type === 'emitCode') {
          window._moduleCallback = (module) => {
            const page = this.allPageMap.get(path);
            if (page) {
              page.module = module;
              page.metadataResovle();
            } else {
              errorInfo('unknow page code', 'project');
            }
          };

          try {
            window.Function(code)();
          } catch (e) {
            errorInfo('page code execute fail', 'project');
          }
        }
      }
    );
  }
}

export class Page {
  resourceUrl!: string;
  metadataResovle!: () => void;
  module: any;
  metadata: any;
  private metadataPromise!: Promise<void>;
  private resourcePromise!: Promise<void>;

  constructor(public path: string, public title: string) {}

  loadModule(): Promise<void> {
    if (this.resourceUrl) {
      if (!this.resourcePromise) {
        this.resourcePromise = this.loadModuleFromResource();
      }

      return this.resourcePromise;
    } else {
      if (!this.metadataPromise) {
        this.metadataPromise = this.loadModuleFromMetadata();
      }

      return this.metadataPromise;
    }
  }

  loadModuleFromMetadata(): Promise<void> {
    return new Promise<CodeMetadata>((resolve) => {
      /** todo - 请求页面metadata */
      setTimeout(() => {
        const data: CodeMetadata = {
          moduleName: this.path,
          type: 'page',
          data: null,
        };
        resolve(data);
      }, 1000);
    }).then((metadata) => {
      this.metadata = metadata;
      const messageData: InputMessage = {
        type: 'transformCode',
        metadata,
        path: this.path,
      };

      return new Promise((resolve) => {
        this.metadataResovle = resolve;
        (instance.worker as Worker).postMessage(messageData);
      });
    });
  }

  loadModuleFromResource(): Promise<void> {
    return Promise.resolve(/** todo - 加载静态代码 */);
  }
}
