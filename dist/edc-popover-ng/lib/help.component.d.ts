import { OnInit } from '@angular/core';
import { Helper, Link } from 'edc-client-js';
import { HelpService } from './help.service';
export declare class HelpComponent implements OnInit {
    private helpService;
    helper: Helper;
    container: string;
    iconCss: string;
    comingSoon: string;
    pluginId: string;
    key: string;
    subKey: string;
    placement: string;
    dark: boolean;
    constructor(helpService: HelpService);
    ngOnInit(): void;
    goToArticle(index: number): void;
    goToLink(link: Link): void;
    getPlacement(): string;
    cancelClick($event: Event): void;
    private open;
}
