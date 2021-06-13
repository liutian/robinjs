import { AMDConfig, AMDOptions } from './amd';

const options: BootstrapOptions = {};

function configBootstrap(customOptions: BootstrapOptions): void {
  Object.assign(options, customOptions);
  AMDConfig(options as AMDOptions);
}

export type BootstrapOptions =
  | AMDOptions
  | {
      pageDataHostServer: string;
    };

export { options, configBootstrap };
