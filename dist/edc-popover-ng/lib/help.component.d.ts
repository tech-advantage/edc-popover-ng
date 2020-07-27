import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Helper } from 'edc-client-js';
import { PopoverConfig } from 'edc-popover-js';
import { HelpConfigService } from './config/help-config.service';
import { Placement } from 'tippy.js';
export declare class HelpComponent implements OnInit, OnChanges {
    private readonly helpConfigService;
    readonly DEFAULT_PLACEMENT = "bottom";
    helper: Helper;
    iconCss: string;
    config: PopoverConfig;
    pluginId: string;
    mainKey: string;
    subKey: string;
    placement: Placement;
    dark: boolean;
    lang: string;
    customClass: string;
    constructor(helpConfigService: HelpConfigService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getIconClasses(): string[];
    private buildPopoverConfig;
}
