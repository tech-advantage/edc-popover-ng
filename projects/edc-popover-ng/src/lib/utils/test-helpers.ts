import { NgModule, Pipe, PipeTransform, Provider } from '@angular/core';

export function mockService(provide: any, methods: string[] = []): Provider {
  class MockService {
  }

  methods.forEach(method => MockService.prototype[method] = () => {
  });
  return { provide: provide, useClass: MockService };
}

export function mock<T>(type: new(...args: any[]) => T, object: any = {}): T {
  const entity: T = new type();
  Object.assign(entity, object);
  return entity;
}

@Pipe({ name: 'translate' })
export class FakeTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@NgModule({ declarations: [FakeTranslatePipe], exports: [FakeTranslatePipe] })
export class TestModule {
}
