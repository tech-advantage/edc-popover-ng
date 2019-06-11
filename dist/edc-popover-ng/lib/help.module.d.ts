import { ModuleWithProviders, Provider } from '@angular/core';
export interface HelpModuleConfig {
    configLoader: Provider;
}
export declare class HelpModule {
    static forRoot(config: HelpModuleConfig): ModuleWithProviders;
}
