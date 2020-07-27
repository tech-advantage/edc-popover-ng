import { PopoverOptions } from 'edc-popover-js';
export interface PopoverConfiguration {
    pluginId: string;
    helpPath: string;
    docPath: string;
    body?: boolean;
    icon?: string;
    i18nDirName?: string;
    popoverOptions?: PopoverOptions;
}
