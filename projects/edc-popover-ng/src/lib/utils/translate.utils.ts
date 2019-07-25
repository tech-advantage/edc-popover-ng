export function isLanguageCodePresent(code: string, languages: string[]): boolean {
  return code && languages && languages.length && languages.indexOf(code) > -1;
}
