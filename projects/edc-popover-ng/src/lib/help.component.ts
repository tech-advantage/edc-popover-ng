import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { HelpConfigService } from './services/help-config.service';
import { IEdcPopoverOptions } from './config/edc-popover-options.interface';
import { IconPopoverConfig } from './config/icon-popover-config';
import { Popover } from 'edc-popover-js';

@Component({
  selector: 'edc-help',
  styleUrls: ['./help.less', '../style.less'],
  template: `
    <span
      class="fa help-icon"
      [ngClass]="getIconClasses()"
      [ngStyle]="getIconStyle()"
      edcHelpPopover [config]="config"></span>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnChanges {

  config: IconPopoverConfig;
  popover: Popover;

  @Input() pluginId: string;
  @Input() mainKey: string;
  @Input() subKey: string;
  @Input() lang: string;
  @Input() options: IEdcPopoverOptions;

  constructor(private readonly helpConfigService: HelpConfigService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildPopoverConfig();
  }

  getIconClasses(): string | string[] {
    return this.helpConfigService.getIconClasses(this.config);
  }

  getIconStyle(): Partial<CSSStyleDeclaration> {
    return this.config && this.config.iconConfig && this.config.iconConfig.imageStyle;
  }

  private buildPopoverConfig(): void {
    this.helpConfigService.buildPopoverConfig(this.mainKey, this.subKey, this.pluginId, this.lang, this.options)
      .then((config: IconPopoverConfig) => this.config = config);
  }
}
