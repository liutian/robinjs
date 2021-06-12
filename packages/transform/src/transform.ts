import { emitCode } from '@robinjs/builder';
import ts from 'typescript';
import defaultConfig from './defaultConfig';

export function createCode(metadata: { name: string }): string {
  const sourceCode = emitCode(metadata);
  const result = ts.transpileModule(sourceCode, {
    compilerOptions: defaultConfig,
    reportDiagnostics: false,
  });

  return result.outputText;
}
