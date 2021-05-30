import { emitCode } from '@robinjs/builder';
import ts from 'typescript';

export function createCode(metadata: { name: string }): string {
  const sourceCode = emitCode(metadata);
  const result = ts.transpileModule(sourceCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  console.log('result' + JSON.stringify(result));
  return sourceCode;
}
