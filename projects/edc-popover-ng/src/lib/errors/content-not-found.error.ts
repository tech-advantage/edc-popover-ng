export class ContentNotFoundError extends Error {

  constructor(public mainKey: string,
              public subKey: string,
              public lang: string,
              message?: string) {
    super(message);
    this.name = 'ContentNotFoundError';
    // restore prototype chain, see more at
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ContentNotFoundError.prototype);
    // Can remove this when changing target to es6
  }
}
