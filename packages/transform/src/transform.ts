import { emitCode } from '@robinjs/builder';
import ts, { JsxEmit } from 'typescript';

export function createCode(metadata: { name: string }): string {
  const sourceCode = emitCode(metadata);
  const result = ts.transpileModule(sourceCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: JsxEmit.ReactJSX },
  });
  return result.outputText;
}
