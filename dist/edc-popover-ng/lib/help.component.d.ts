import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Helper, Link } from 'edc-client-js';
import { HelpService } from './help.service';
import { TranslateService } from '@ngx-translate/core';
export declare class HelpComponent implements OnInit, OnChanges {
    private readonly helpService;
    private readonly translateService;
    helper: Helper;
    container: string;
    iconCss: string;
    comingSoon: string;
    langLoading: string;
    pluginId: string;
    key: string;
    subKey: string;
    placement: string;
    dark: boolean;
    lang: string;
    constructor(helpService: HelpService, translateService: TranslateService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private startHelper;
    private initHelper;
    goToArticle(index: number): void;
    goToLink(link: Link): void;
    getPlacement(): string;
    cancelClick($event: Event): void;
    private open;
}
