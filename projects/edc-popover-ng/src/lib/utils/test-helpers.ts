import { forEach, assign } from 'lodash';
import { Provider } from '@angular/core';

export function mockService(provide: any, methods?: string[]): Provider {
  class MockService {}
  forEach(methods, method => MockService.prototype[method] = () => {});
  return {provide: provide, useClass: MockService};
}

export function mock<T>(type: { new(... args: any[]): T; }, objet: any = {}): T {
  const entity: T = new type();
  assign(entity, objet);
  return entity;
}
