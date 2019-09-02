import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SYS_LANG, localTranslations } from './language-codes';
var TranslateLoader = /** @class */ (function () {
    function TranslateLoader(http, helpService, defaultLanguage, prefix, suffix) {
        if (defaultLanguage === void 0) { defaultLanguage = SYS_LANG; }
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = '.json'; }
        this.http = http;
        this.helpService = helpService;
        this.defaultLanguage = defaultLanguage;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    TranslateLoader.prototype.getTranslation = function (lang) {
        var _this = this;
        if (lang === void 0) { lang = SYS_LANG; }
        var langToUse = this.helpService.isLanguagePresent(lang) ? lang : this.defaultLanguage;
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
// AoT requires an exported function for factories
export function HttpLoaderFactory(http, helpService) {
    var defaultLanguage = helpService.getDefaultLanguage() || SYS_LANG;
    var i18nUrl = helpService.getI18nUrl();
    return new TranslateLoader(http, helpService, defaultLanguage, i18nUrl);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2VkYy1wb3BvdmVyLW5nLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbGF0ZS90cmFuc2xhdGUtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUvRDtJQUVFLHlCQUE2QixJQUFnQixFQUNoQixXQUF3QixFQUN4QixlQUEwQixFQUNuQyxNQUFXLEVBQ1gsTUFBZ0I7UUFGUCxnQ0FBQSxFQUFBLDBCQUEwQjtRQUNuQyx1QkFBQSxFQUFBLFdBQVc7UUFDWCx1QkFBQSxFQUFBLGdCQUFnQjtRQUpQLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQVc7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUNYLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBRXhDLHdDQUFjLEdBQWQsVUFBZSxJQUF1QjtRQUF0QyxpQkFLQztRQUxjLHFCQUFBLEVBQUEsZUFBdUI7UUFDcEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQVEsQ0FBQyxDQUFDLElBQUksQ0FDcEUsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FDaEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw0Q0FBa0IsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLGVBQThDO1FBQTlDLGdDQUFBLEVBQUEsa0JBQTBCLElBQUksQ0FBQyxlQUFlO1FBQzdFLElBQU0sZUFBZSxHQUFHLENBQUMsSUFBSSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELENBQUMsZUFBZSxJQUFJLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7O0FBRUQsa0RBQWtEO0FBQ2xELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFnQixFQUFFLFdBQXdCO0lBQzFFLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLFFBQVEsQ0FBQztJQUNyRSxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDekMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBIZWxwU2VydmljZSB9IGZyb20gJy4uL2hlbHAuc2VydmljZSc7XG5pbXBvcnQgeyBTWVNfTEFORywgbG9jYWxUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2xhbmd1YWdlLWNvZGVzJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZUxvYWRlciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGhlbHBTZXJ2aWNlOiBIZWxwU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0TGFuZ3VhZ2UgPSBTWVNfTEFORyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVmaXggPSAnJyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzdWZmaXggPSAnLmpzb24nKSB7fVxuXG4gIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyA9IFNZU19MQU5HKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBsYW5nVG9Vc2UgPSB0aGlzLmhlbHBTZXJ2aWNlLmlzTGFuZ3VhZ2VQcmVzZW50KGxhbmcpID8gbGFuZyA6IHRoaXMuZGVmYXVsdExhbmd1YWdlO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucHJlZml4fS8ke2xhbmdUb1VzZX0ke3RoaXMuc3VmZml4fWApLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHRoaXMuZ2V0VHJhbnNsYXRpb25GaWxlKGxhbmcpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpMThuIGpzb24gZmlsZSBmb3IgdGhlIHJlcXVlc3RlZCBsYW5nXG4gICAqIFdpbGwgYmUgY2FsbGVkIGlmIG5vIGkxOG4gZmlsZSB3YXMgZm91bmQgb24gc2VydmVyIGZvciB0aGlzIGxhbmdcbiAgICpcbiAgICogQHBhcmFtIGxhbmcgdGhlIGxhbmcgY29kZVxuICAgKiBAcGFyYW0gZGVmYXVsdExhbmd1YWdlIGRlZmF1bHQgbGFuZyBjb2RlXG4gICAqL1xuICBnZXRUcmFuc2xhdGlvbkZpbGUobGFuZzogc3RyaW5nLCBkZWZhdWx0TGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMuZGVmYXVsdExhbmd1YWdlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSAobGFuZyAmJiBsb2NhbFRyYW5zbGF0aW9uc1tsYW5nXSkgfHxcbiAgICAgIChkZWZhdWx0TGFuZ3VhZ2UgJiYgbG9jYWxUcmFuc2xhdGlvbnNbZGVmYXVsdExhbmd1YWdlXSkgfHxcbiAgICAgIGxvY2FsVHJhbnNsYXRpb25zW1NZU19MQU5HXTtcbiAgICByZXR1cm4gb2YodHJhbnNsYXRpb25GaWxlKTtcbiAgfVxufVxuXG4vLyBBb1QgcmVxdWlyZXMgYW4gZXhwb3J0ZWQgZnVuY3Rpb24gZm9yIGZhY3Rvcmllc1xuZXhwb3J0IGZ1bmN0aW9uIEh0dHBMb2FkZXJGYWN0b3J5KGh0dHA6IEh0dHBDbGllbnQsIGhlbHBTZXJ2aWNlOiBIZWxwU2VydmljZSkge1xuICBjb25zdCBkZWZhdWx0TGFuZ3VhZ2UgPSBoZWxwU2VydmljZS5nZXREZWZhdWx0TGFuZ3VhZ2UoKSB8fCBTWVNfTEFORztcbiAgY29uc3QgaTE4blVybCA9IGhlbHBTZXJ2aWNlLmdldEkxOG5VcmwoKTtcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVMb2FkZXIoaHR0cCwgaGVscFNlcnZpY2UsIGRlZmF1bHRMYW5ndWFnZSwgaTE4blVybCk7XG59XG4iXX0=