import ts, { CompilerOptions, JsxEmit, ScriptTarget } from 'typescript';

const defaultConfig: CompilerOptions = {
  module: ts.ModuleKind.AMD,
  jsx: JsxEmit.ReactJSX,
  target: ScriptTarget.ES2015,
  esModuleInterop: true,
  importHelpers: true,
  isolatedModules: true,
  sourceMap: true,
  inlineSourceMap: true,
  inlineSources: true,
};

export default defaultConfig;
