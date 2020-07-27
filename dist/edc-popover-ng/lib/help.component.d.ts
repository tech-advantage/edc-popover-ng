import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Helper, Link } from 'edc-client-js';
import { HelpService } from './help.service';
import { EdcTranslationService } from './translate/edc-translation.service';
export declare class HelpComponent implements OnInit, OnChanges {
    private readonly helpService;
    private readonly translationService;
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
    constructor(helpService: HelpService, translationService: EdcTranslationService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private initHelper;
    loadHelper(): void;
    goToArticle(index: number): void;
    goToLink(link: Link): void;
    getPlacement(): string;
    cancelClick($event: Event): void;
    private open;
}
