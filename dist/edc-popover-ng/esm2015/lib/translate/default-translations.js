import en from '../../i18n/en.json';
import fr from '../../i18n/fr.json';
import ru from '../../i18n/ru.json';
import vi from '../../i18n/vi.json';
import zh from '../../i18n/zh.json';
import { LANGUAGE_CODES } from './language-codes';
import { SYS_LANG } from './translate-loader';
export const getTranslations = (defaultLang) => {
    // Add main languages
    // This also guarantees json files are effectively imported by webpack
    const translations = {
        en,
        fr,
        ru,
        vi,
        zh
    };
    // Add other languages
    LANGUAGE_CODES.forEach(code => {
        if (!translations[code]) {
            translations[code] = translations[defaultLang] || translations[SYS_LANG];
        }
    });
    return translations;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC10cmFuc2xhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xhdGUvZGVmYXVsdC10cmFuc2xhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxXQUFtQixFQUFFLEVBQUU7SUFDckQscUJBQXFCO0lBQ3JCLHNFQUFzRTtJQUN0RSxNQUFNLFlBQVksR0FBRztRQUNuQixFQUFFO1FBQ0YsRUFBRTtRQUNGLEVBQUU7UUFDRixFQUFFO1FBQ0YsRUFBRTtLQUNILENBQUM7SUFFRixzQkFBc0I7SUFDdEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW4gZnJvbSAnLi4vLi4vaTE4bi9lbi5qc29uJztcbmltcG9ydCBmciBmcm9tICcuLi8uLi9pMThuL2ZyLmpzb24nO1xuaW1wb3J0IHJ1IGZyb20gJy4uLy4uL2kxOG4vcnUuanNvbic7XG5pbXBvcnQgdmkgZnJvbSAnLi4vLi4vaTE4bi92aS5qc29uJztcbmltcG9ydCB6aCBmcm9tICcuLi8uLi9pMThuL3poLmpzb24nO1xuaW1wb3J0IHsgTEFOR1VBR0VfQ09ERVMgfSBmcm9tICcuL2xhbmd1YWdlLWNvZGVzJztcbmltcG9ydCB7IFNZU19MQU5HIH0gZnJvbSAnLi90cmFuc2xhdGUtbG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IGdldFRyYW5zbGF0aW9ucyA9IChkZWZhdWx0TGFuZzogc3RyaW5nKSA9PiB7XG4gIC8vIEFkZCBtYWluIGxhbmd1YWdlc1xuICAvLyBUaGlzIGFsc28gZ3VhcmFudGVlcyBqc29uIGZpbGVzIGFyZSBlZmZlY3RpdmVseSBpbXBvcnRlZCBieSB3ZWJwYWNrXG4gIGNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgICBlbixcbiAgICBmcixcbiAgICBydSxcbiAgICB2aSxcbiAgICB6aFxuICB9O1xuXG4gIC8vIEFkZCBvdGhlciBsYW5ndWFnZXNcbiAgTEFOR1VBR0VfQ09ERVMuZm9yRWFjaChjb2RlID0+IHtcbiAgICBpZiAoIXRyYW5zbGF0aW9uc1tjb2RlXSkge1xuICAgICAgdHJhbnNsYXRpb25zW2NvZGVdID0gdHJhbnNsYXRpb25zW2RlZmF1bHRMYW5nXSB8fCB0cmFuc2xhdGlvbnNbU1lTX0xBTkddO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHRyYW5zbGF0aW9ucztcbn07XG4iXX0=