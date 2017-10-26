
export abstract class PopoverConfigurationHandler {

  abstract getHelpPath(): string;

  abstract getDocPath(): string;

  abstract getPluginId(): string;

  abstract getIcon(): string;

  abstract isAppendToBody(): boolean;

}
