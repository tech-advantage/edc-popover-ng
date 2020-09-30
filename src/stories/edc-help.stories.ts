import { HelpComponent } from '../../projects/edc-popover-ng/src/lib/help.component';

import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { HelpModule, PopoverConfigurationHandler } from 'edc-popover-ng';
import { PopoverConfigHandler } from '../config/popover-config-handler';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigLoader } from '../app/app.module';

export default {
  title: 'EDC',
  component: HelpComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        HelpModule.forRoot({
          configLoader: {provide: PopoverConfigurationHandler, useClass: PopoverConfigHandler}
        })],
      providers: [
        ConfigService,
        {
          provide   : APP_INITIALIZER,
          useFactory: ConfigLoader,
          deps      : [ConfigService],
          multi     : true
        }
      ]
    })
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HelpComponent> = (args: HelpComponent) => ({
  component: HelpComponent,
  props: args,
});

export const EdcHelpMain = Template.bind({});
EdcHelpMain.args = {
  mainKey: 'fr.techad.edc',
  subKey: 'help.center'
};
