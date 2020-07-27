import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Helper } from 'edc-client-js';
import { HelpService } from './help.service';
import { PopoverConfig } from 'edc-popover-js';
import { HelpConfigService } from './config/help-config.service';
import { Placement } from 'tippy.js';

@Component({
  selector: 'edc-help',
  styleUrls: ['help.less'],
  template: `
    <i class="fa help-icon" [ngClass]="this.getIconClasses()" edcHelpPopover [config]="config"></i>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnInit, OnChanges {

  readonly DEFAULT_PLACEMENT = 'bottom';

  helper: Helper;
  iconCss: string;

  config: PopoverConfig;

  @Input() pluginId: string; // if defined, the plugin identifier to use for fetching help content
  @Input() mainKey: string;
  @Input() subKey: string;
  @Input() placement: Placement;
  @Input() dark: boolean;
  @Input() lang: string;
  @Input() customClass: string;

  constructor(private readonly helpConfigService: HelpConfigService) {
  }

  ngOnInit(): void {
    this.iconCss = this.helpConfigService.getIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // When at least one of the inputs related to content changes, the configuration must be rebuild
    const contentTriggers = ['pluginId', 'mainKey', 'subKey', 'lang'];
    // Those only require to update the configuration options attribute
    const optionsTriggers = ['placement', 'customClass'];
    if (contentTriggers.some(prop => changes[prop])) {
      this.buildPopoverConfig();
    } else if (optionsTriggers.some(prop => changes[prop])) {
      this.config = this.helpConfigService.updateOptions(this.config, this.placement, this.customClass);
    }
  }

  getIconClasses(): string[] {
    const classes = [];
    if (this.iconCss) {
      classes.push(this.iconCss);
    }
    // Set dark class
    if (this.dark) {
      classes.push('on-dark');
    }
    return classes;
  }

  private buildPopoverConfig(): void {
    const placement = this.placement || this.DEFAULT_PLACEMENT;
    this.helpConfigService.buildPopoverConfig(this.mainKey, this.subKey, this.pluginId, this.lang, placement, this.customClass)
      .then((config: PopoverConfig) => {
        this.config = config;
      });
  }
}
