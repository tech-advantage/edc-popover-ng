import { Injectable } from '@angular/core';
import { EdcConfiguration } from 'src/config/edc-configuration';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private config: EdcConfiguration | undefined;

  constructor(private http: HttpClient) {
  }

  load(url: string): Promise<EdcConfiguration> {
    return new Promise((resolve) => {
      this.http.get<EdcConfiguration>(url).subscribe((config: EdcConfiguration) => {
          this.config = config;
          resolve(config);
        });
    });
  }

  getConfiguration(): EdcConfiguration {
    return this.config ?? new EdcConfiguration();
  }

}
