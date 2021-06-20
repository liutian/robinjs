import { createCode } from '@robinjs/core';
import { InputMessage, OutputMessage } from './types';

(self as any).postMessage('ok');

self.addEventListener('message', (event) => {
  const { type, metadata, path } = event.data as InputMessage;
  if (type === 'transformCode') {
    const code = createCode(metadata);
    const message: OutputMessage = {
      type: 'emitCode',
      path,
      code,
    };

    (self as any).postMessage(message);
  }
});
