import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { HelpConfigService } from './services/help-config.service';
import { IEdcPopoverOptions } from './config/edc-popover-options.interface';
import { IconPopoverConfig } from './config/icon-popover-config';
import { Popover } from 'edc-popover-utils';
import { isNil } from './utils/global.utils';

@Component({
  selector: 'edc-help',
  styleUrls: ['./help.less', '../style.less'],
  template: `
    <span
      class="edc-help-icon"
      [ngClass]="getIconClasses()"
      [ngStyle]="getIconStyle()"
      edcHelpPopover [config]="config"></span>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnChanges {

  config: IconPopoverConfig | undefined;
  popover: Popover | undefined;

  @Input() pluginId: string | undefined;
  @Input() mainKey: string | undefined;
  @Input() subKey: string | undefined;
  @Input() lang: string | undefined;
  @Input() options: IEdcPopoverOptions | undefined;

  constructor(private readonly helpConfigService: HelpConfigService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildPopoverConfig();
  }

  getIconClasses(): string | string[] {
    return this.helpConfigService.getIconClasses(this.config);
  }

  getIconStyle(): Partial<CSSStyleDeclaration> | null {
    if (isNil(this.config) || isNil(this.config.iconConfig)) {
      return null;
    }
    return this.config.iconConfig.imageStyle ?? null;
  }

  private buildPopoverConfig(): void {
    this.helpConfigService.buildPopoverConfig(this.mainKey, this.subKey, this.pluginId, this.lang, this.options)
      .then((config: IconPopoverConfig) => this.config = config);
  }
}
