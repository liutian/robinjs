import { createCode } from '@robinjs/transform';
import { pathDataMap } from './config';

export function resolvePage(path: string): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pathDataMap.get(path));
    }, 1000);
  }).then(() => {
    return createCode({ name: 'hello' });
  });
}
