import { HelpService } from '../help.service';
import { SYS_LANG } from './language-codes';
import { Injectable } from '@angular/core';
export class EdcTranslationService {
    constructor(helpService) {
        this.helpService = helpService;
        this.defaultLanguage = SYS_LANG;
        this.lang = SYS_LANG;
    }
    getLang() {
        return this.lang;
    }
    setLang(lang) {
        this.lang = lang;
    }
}
EdcTranslationService.decorators = [
    { type: Injectable }
];
EdcTranslationService.ctorParameters = () => [
    { type: HelpService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRjLXRyYW5zbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGMtcG9wb3Zlci1uZy9zcmMvbGliL3RyYW5zbGF0ZS9lZGMtdHJhbnNsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUtoQyxZQUE2QixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUhyRCxvQkFBZSxHQUFHLFFBQVEsQ0FBQztRQUMzQixTQUFJLEdBQUcsUUFBUSxDQUFDO0lBR2hCLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDOzs7WUFmRixVQUFVOzs7WUFKRixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgU1lTX0xBTkcgfSBmcm9tICcuL2xhbmd1YWdlLWNvZGVzJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVkY1RyYW5zbGF0aW9uU2VydmljZSB7XG5cbiAgZGVmYXVsdExhbmd1YWdlID0gU1lTX0xBTkc7XG4gIGxhbmcgPSBTWVNfTEFORztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGhlbHBTZXJ2aWNlOiBIZWxwU2VydmljZSkge1xuICB9XG5cbiAgZ2V0TGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhbmc7XG4gIH1cblxuICBzZXRMYW5nKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubGFuZyA9IGxhbmc7XG4gIH1cbn1cbiJdfQ==