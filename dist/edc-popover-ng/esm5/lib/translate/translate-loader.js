import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isLanguageCodePresent } from '../utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG, localTranslations } from './language-codes';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http, helpService) {
    var defaultLanguage = helpService.getDefaultLanguage() || SYS_LANG;
    var i18nUrl = helpService.getI18nUrl();
    return new TranslateLoader(http, defaultLanguage, i18nUrl);
}
var TranslateLoader = /** @class */ (function () {
    function TranslateLoader(http, defaultLanguage, prefix, suffix) {
        if (defaultLanguage === void 0) { defaultLanguage = SYS_LANG; }
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = '.json'; }
        this.http = http;
        this.defaultLanguage = defaultLanguage;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    TranslateLoader.prototype.getTranslation = function (lang) {
        var _this = this;
        if (lang === void 0) { lang = SYS_LANG; }
        var langToUse = isLanguageCodePresent(lang, LANGUAGE_CODES) ? lang : this.defaultLanguage;
        return this.http.get(this.prefix + "/" + langToUse + this.suffix).pipe(catchError(function () { return _this.getTranslationFile(lang); }));
    };
    /**
     * Get the i18n json file for the requested lang
     * Will be called if no i18n file was found on server for this lang
     *
     * @param lang the lang code
     * @param defaultLanguage default lang code
     */
    TranslateLoader.prototype.getTranslationFile = function (lang, defaultLanguage) {
        if (defaultLanguage === void 0) { defaultLanguage = this.defaultLanguage; }
        var translationFile = (lang && localTranslations[lang]) ||
            (defaultLanguage && localTranslations[defaultLanguage]) ||
            localTranslations[SYS_LANG];
        return of(translationFile);
    };
    return TranslateLoader;
}());
export { TranslateLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2VkYy1wb3BvdmVyLW5nLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbGF0ZS90cmFuc2xhdGUtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTVDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0Usa0RBQWtEO0FBQ2xELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFnQixFQUFFLFdBQXdCO0lBQzFFLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLFFBQVEsQ0FBQztJQUNyRSxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDekMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRDtJQUVFLHlCQUE2QixJQUFnQixFQUNoQixlQUEwQixFQUNuQyxNQUFXLEVBQ1gsTUFBZ0I7UUFGUCxnQ0FBQSxFQUFBLDBCQUEwQjtRQUNuQyx1QkFBQSxFQUFBLFdBQVc7UUFDWCx1QkFBQSxFQUFBLGdCQUFnQjtRQUhQLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQVc7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUNYLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBRXhDLHdDQUFjLEdBQWQsVUFBZSxJQUF1QjtRQUF0QyxpQkFLQztRQUxjLHFCQUFBLEVBQUEsZUFBdUI7UUFDcEMsSUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDNUYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsTUFBTSxTQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBUSxDQUFDLENBQUMsSUFBSSxDQUNwRSxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUNoRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILDRDQUFrQixHQUFsQixVQUFtQixJQUFZLEVBQUUsZUFBOEM7UUFBOUMsZ0NBQUEsRUFBQSxrQkFBMEIsSUFBSSxDQUFDLGVBQWU7UUFDN0UsSUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFJLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxlQUFlLElBQUksaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkQsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSGVscFNlcnZpY2UgfSBmcm9tICcuLi9oZWxwLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNMYW5ndWFnZUNvZGVQcmVzZW50IH0gZnJvbSAnLi4vdXRpbHMvdHJhbnNsYXRlLnV0aWxzJztcbmltcG9ydCB7IExBTkdVQUdFX0NPREVTLCBTWVNfTEFORywgbG9jYWxUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2xhbmd1YWdlLWNvZGVzJztcblxuLy8gQW9UIHJlcXVpcmVzIGFuIGV4cG9ydGVkIGZ1bmN0aW9uIGZvciBmYWN0b3JpZXNcbmV4cG9ydCBmdW5jdGlvbiBIdHRwTG9hZGVyRmFjdG9yeShodHRwOiBIdHRwQ2xpZW50LCBoZWxwU2VydmljZTogSGVscFNlcnZpY2UpIHtcbiAgY29uc3QgZGVmYXVsdExhbmd1YWdlID0gaGVscFNlcnZpY2UuZ2V0RGVmYXVsdExhbmd1YWdlKCkgfHwgU1lTX0xBTkc7XG4gIGNvbnN0IGkxOG5VcmwgPSBoZWxwU2VydmljZS5nZXRJMThuVXJsKCk7XG4gIHJldHVybiBuZXcgVHJhbnNsYXRlTG9hZGVyKGh0dHAsIGRlZmF1bHRMYW5ndWFnZSwgaTE4blVybCk7XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVMb2FkZXIge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0TGFuZ3VhZ2UgPSBTWVNfTEFORyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVmaXggPSAnJyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzdWZmaXggPSAnLmpzb24nKSB7fVxuXG4gIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyA9IFNZU19MQU5HKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBsYW5nVG9Vc2UgPSBpc0xhbmd1YWdlQ29kZVByZXNlbnQobGFuZywgTEFOR1VBR0VfQ09ERVMpID8gbGFuZyA6IHRoaXMuZGVmYXVsdExhbmd1YWdlO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucHJlZml4fS8ke2xhbmdUb1VzZX0ke3RoaXMuc3VmZml4fWApLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHRoaXMuZ2V0VHJhbnNsYXRpb25GaWxlKGxhbmcpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpMThuIGpzb24gZmlsZSBmb3IgdGhlIHJlcXVlc3RlZCBsYW5nXG4gICAqIFdpbGwgYmUgY2FsbGVkIGlmIG5vIGkxOG4gZmlsZSB3YXMgZm91bmQgb24gc2VydmVyIGZvciB0aGlzIGxhbmdcbiAgICpcbiAgICogQHBhcmFtIGxhbmcgdGhlIGxhbmcgY29kZVxuICAgKiBAcGFyYW0gZGVmYXVsdExhbmd1YWdlIGRlZmF1bHQgbGFuZyBjb2RlXG4gICAqL1xuICBnZXRUcmFuc2xhdGlvbkZpbGUobGFuZzogc3RyaW5nLCBkZWZhdWx0TGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMuZGVmYXVsdExhbmd1YWdlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSAobGFuZyAmJiBsb2NhbFRyYW5zbGF0aW9uc1tsYW5nXSkgfHxcbiAgICAgIChkZWZhdWx0TGFuZ3VhZ2UgJiYgbG9jYWxUcmFuc2xhdGlvbnNbZGVmYXVsdExhbmd1YWdlXSkgfHxcbiAgICAgIGxvY2FsVHJhbnNsYXRpb25zW1NZU19MQU5HXTtcbiAgICByZXR1cm4gb2YodHJhbnNsYXRpb25GaWxlKTtcbiAgfVxufVxuIl19