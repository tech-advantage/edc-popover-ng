import { ModuleWithProviders, Provider } from '@angular/core';
import 'edc-popover-js/dist/edc-popover.css';
export interface HelpModuleConfig {
    configLoader: Provider;
}
export declare class HelpModule {
    static forRoot(config: HelpModuleConfig): ModuleWithProviders<HelpModule>;
}
