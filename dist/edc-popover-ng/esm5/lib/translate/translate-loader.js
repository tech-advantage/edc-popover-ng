import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isLanguageCodePresent } from '../utils/translate.utils';
import { LANGUAGE_CODES, SYS_LANG, localTranslations } from './language-codes';
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
// AoT requires an exported function for factories
export function HttpLoaderFactory(http, helpService) {
    var defaultLanguage = helpService.getDefaultLanguage() || SYS_LANG;
    var i18nUrl = helpService.getI18nUrl();
    return new TranslateLoader(http, defaultLanguage, i18nUrl);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2VkYy1wb3BvdmVyLW5nLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbGF0ZS90cmFuc2xhdGUtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTVDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0U7SUFFRSx5QkFBNkIsSUFBZ0IsRUFDaEIsZUFBMEIsRUFDbkMsTUFBVyxFQUNYLE1BQWdCO1FBRlAsZ0NBQUEsRUFBQSwwQkFBMEI7UUFDbkMsdUJBQUEsRUFBQSxXQUFXO1FBQ1gsdUJBQUEsRUFBQSxnQkFBZ0I7UUFIUCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG9CQUFlLEdBQWYsZUFBZSxDQUFXO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQUs7UUFDWCxXQUFNLEdBQU4sTUFBTSxDQUFVO0lBQUcsQ0FBQztJQUV4Qyx3Q0FBYyxHQUFkLFVBQWUsSUFBdUI7UUFBdEMsaUJBS0M7UUFMYyxxQkFBQSxFQUFBLGVBQXVCO1FBQ3BDLElBQU0sU0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQVEsQ0FBQyxDQUFDLElBQUksQ0FDcEUsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FDaEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw0Q0FBa0IsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLGVBQThDO1FBQTlDLGdDQUFBLEVBQUEsa0JBQTBCLElBQUksQ0FBQyxlQUFlO1FBQzdFLElBQU0sZUFBZSxHQUFHLENBQUMsSUFBSSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELENBQUMsZUFBZSxJQUFJLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7O0FBRUQsa0RBQWtEO0FBQ2xELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFnQixFQUFFLFdBQXdCO0lBQzFFLElBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLFFBQVEsQ0FBQztJQUNyRSxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDekMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzdELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEhlbHBTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscC5zZXJ2aWNlJztcbmltcG9ydCB7IGlzTGFuZ3VhZ2VDb2RlUHJlc2VudCB9IGZyb20gJy4uL3V0aWxzL3RyYW5zbGF0ZS51dGlscyc7XG5pbXBvcnQgeyBMQU5HVUFHRV9DT0RFUywgU1lTX0xBTkcsIGxvY2FsVHJhbnNsYXRpb25zIH0gZnJvbSAnLi9sYW5ndWFnZS1jb2Rlcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVMb2FkZXIge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0TGFuZ3VhZ2UgPSBTWVNfTEFORyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVmaXggPSAnJyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzdWZmaXggPSAnLmpzb24nKSB7fVxuXG4gIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyA9IFNZU19MQU5HKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBsYW5nVG9Vc2UgPSBpc0xhbmd1YWdlQ29kZVByZXNlbnQobGFuZywgTEFOR1VBR0VfQ09ERVMpID8gbGFuZyA6IHRoaXMuZGVmYXVsdExhbmd1YWdlO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucHJlZml4fS8ke2xhbmdUb1VzZX0ke3RoaXMuc3VmZml4fWApLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHRoaXMuZ2V0VHJhbnNsYXRpb25GaWxlKGxhbmcpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpMThuIGpzb24gZmlsZSBmb3IgdGhlIHJlcXVlc3RlZCBsYW5nXG4gICAqIFdpbGwgYmUgY2FsbGVkIGlmIG5vIGkxOG4gZmlsZSB3YXMgZm91bmQgb24gc2VydmVyIGZvciB0aGlzIGxhbmdcbiAgICpcbiAgICogQHBhcmFtIGxhbmcgdGhlIGxhbmcgY29kZVxuICAgKiBAcGFyYW0gZGVmYXVsdExhbmd1YWdlIGRlZmF1bHQgbGFuZyBjb2RlXG4gICAqL1xuICBnZXRUcmFuc2xhdGlvbkZpbGUobGFuZzogc3RyaW5nLCBkZWZhdWx0TGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMuZGVmYXVsdExhbmd1YWdlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSAobGFuZyAmJiBsb2NhbFRyYW5zbGF0aW9uc1tsYW5nXSkgfHxcbiAgICAgIChkZWZhdWx0TGFuZ3VhZ2UgJiYgbG9jYWxUcmFuc2xhdGlvbnNbZGVmYXVsdExhbmd1YWdlXSkgfHxcbiAgICAgIGxvY2FsVHJhbnNsYXRpb25zW1NZU19MQU5HXTtcbiAgICByZXR1cm4gb2YodHJhbnNsYXRpb25GaWxlKTtcbiAgfVxufVxuXG4vLyBBb1QgcmVxdWlyZXMgYW4gZXhwb3J0ZWQgZnVuY3Rpb24gZm9yIGZhY3Rvcmllc1xuZXhwb3J0IGZ1bmN0aW9uIEh0dHBMb2FkZXJGYWN0b3J5KGh0dHA6IEh0dHBDbGllbnQsIGhlbHBTZXJ2aWNlOiBIZWxwU2VydmljZSkge1xuICBjb25zdCBkZWZhdWx0TGFuZ3VhZ2UgPSBoZWxwU2VydmljZS5nZXREZWZhdWx0TGFuZ3VhZ2UoKSB8fCBTWVNfTEFORztcbiAgY29uc3QgaTE4blVybCA9IGhlbHBTZXJ2aWNlLmdldEkxOG5VcmwoKTtcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVMb2FkZXIoaHR0cCwgZGVmYXVsdExhbmd1YWdlLCBpMThuVXJsKTtcbn1cbiJdfQ==