import { emitCode } from './builder';
import ts from 'typescript';
import { CodeMetadata } from './code_metadata';
import defaultConfig from './defaultConfig';

export function createCode(metadata: CodeMetadata): string {
  const sourceCode = emitCode(metadata);
  const result = ts.transpileModule(sourceCode, {
    compilerOptions: defaultConfig,
    reportDiagnostics: false,
    moduleName: metadata.moduleName,
    fileName: metadata.moduleName + '.tsx',
  });

  return result.outputText;
}
