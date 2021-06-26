import { emitCode } from './builder';
import { CodeMetadata } from './code_metadata';
import defaultConfig from './defaultConfig';

export function createCode(
  metadata: CodeMetadata,
  options: optionsType
): string {
  const sourceCode = emitCode(metadata);
  const result = options.transpileModule(sourceCode, {
    compilerOptions: Object.assign({}, defaultConfig, options.tsConfig),
    reportDiagnostics: false,
    moduleName: metadata.moduleName,
    fileName: metadata.moduleName + '.tsx',
  });

  return result.outputText;
}

type optionsType = { tsConfig?: any; transpileModule: transpileModuleType };

type transpileModuleType = (
  input: string,
  transpileOptions: any
) => transpileOutputType;

type transpileOutputType = {
  outputText: string;
  diagnostics?: any[];
  sourceMapText?: string;
};
