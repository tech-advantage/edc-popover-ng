import { Provider } from '@angular/core';

export function mockService(provide: any, methods: string[] = []): Provider {
  class MockService {}
  methods.forEach(method => MockService.prototype[method] = () => {});
  return {provide: provide, useClass: MockService};
}

export function mock<T>(type: { new(... args: any[]): T; }, objet: any = {}): T {
  const entity: T = new type();
  Object.assign(entity, objet);
  return entity;
}
