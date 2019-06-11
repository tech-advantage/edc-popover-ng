
export abstract class PopoverConfigurationHandler {

  abstract getPluginId(): string;

  abstract getHelpPath(): string;

  abstract getDocPath(): string;

  abstract getIcon(): string;

  abstract isAppendToBody(): boolean;

}
