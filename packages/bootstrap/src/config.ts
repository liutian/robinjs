const pathDataMap = new Map<string, unknown>();

function config(options: BootstrapOptions): void {
  console.log(options);
}

export interface BootstrapOptions {
  pageDataHostServer: string;
}

export { pathDataMap };
export default config;
