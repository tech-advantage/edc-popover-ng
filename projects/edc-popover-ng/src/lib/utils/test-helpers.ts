import { NgModule, Pipe, PipeTransform, Provider } from '@angular/core';
import { Helper, Article, Link } from 'edc-client-js';

export function mockService(provide: any, methods: string[] = []): Provider {
  class MockService {
  }

  // @ts-ignore
  methods.forEach(method => MockService.prototype[method] = () => {
  });
  return { provide: provide, useClass: MockService };
}

export function mock<T>(type: new(...args: any[]) => T, object: any = {}): T {
  const entity: T = new type();
  Object.assign(entity, object);
  return entity;
}

/**
 * Mock a documentation helper
 *
 */
export function mockHelper(): Helper {
  return mock(Helper, {
    label: 'MyTitle',
    description: 'MyDescription',
    articles: [
      mock(Article, {
        label: 'articleLabel1',
        url: 'articleUrl1'
      })
    ],
    links: [
      mock(Link, {
        id: 7,
        label: 'linkLabel1',
        url: 'linkUrl1'
      })
    ],
    language: 'en',
    exportId: 'resolvedPluginId'
  });
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
