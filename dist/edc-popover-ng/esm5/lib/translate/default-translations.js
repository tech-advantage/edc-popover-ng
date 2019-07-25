import en from '../../i18n/en.json';
import fr from '../../i18n/fr.json';
import ru from '../../i18n/ru.json';
import vi from '../../i18n/vi.json';
import zh from '../../i18n/zh.json';
import { LANGUAGE_CODES } from './language-codes';
import { SYS_LANG } from './translate-loader';
export var getTranslations = function (defaultLang) {
    // Add main languages
    // This also guarantees json files are effectively imported by webpack
    var translations = {
        en: en,
        fr: fr,
        ru: ru,
        vi: vi,
        zh: zh
    };
    // Add other languages
    LANGUAGE_CODES.forEach(function (code) {
        if (!translations[code]) {
            translations[code] = translations[defaultLang] || translations[SYS_LANG];
        }
    });
    return translations;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC10cmFuc2xhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lZGMtcG9wb3Zlci1uZy8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xhdGUvZGVmYXVsdC10cmFuc2xhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBQyxXQUFtQjtJQUNqRCxxQkFBcUI7SUFDckIsc0VBQXNFO0lBQ3RFLElBQU0sWUFBWSxHQUFHO1FBQ25CLEVBQUUsSUFBQTtRQUNGLEVBQUUsSUFBQTtRQUNGLEVBQUUsSUFBQTtRQUNGLEVBQUUsSUFBQTtRQUNGLEVBQUUsSUFBQTtLQUNILENBQUM7SUFFRixzQkFBc0I7SUFDdEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuIGZyb20gJy4uLy4uL2kxOG4vZW4uanNvbic7XG5pbXBvcnQgZnIgZnJvbSAnLi4vLi4vaTE4bi9mci5qc29uJztcbmltcG9ydCBydSBmcm9tICcuLi8uLi9pMThuL3J1Lmpzb24nO1xuaW1wb3J0IHZpIGZyb20gJy4uLy4uL2kxOG4vdmkuanNvbic7XG5pbXBvcnQgemggZnJvbSAnLi4vLi4vaTE4bi96aC5qc29uJztcbmltcG9ydCB7IExBTkdVQUdFX0NPREVTIH0gZnJvbSAnLi9sYW5ndWFnZS1jb2Rlcyc7XG5pbXBvcnQgeyBTWVNfTEFORyB9IGZyb20gJy4vdHJhbnNsYXRlLWxvYWRlcic7XG5cbmV4cG9ydCBjb25zdCBnZXRUcmFuc2xhdGlvbnMgPSAoZGVmYXVsdExhbmc6IHN0cmluZykgPT4ge1xuICAvLyBBZGQgbWFpbiBsYW5ndWFnZXNcbiAgLy8gVGhpcyBhbHNvIGd1YXJhbnRlZXMganNvbiBmaWxlcyBhcmUgZWZmZWN0aXZlbHkgaW1wb3J0ZWQgYnkgd2VicGFja1xuICBjb25zdCB0cmFuc2xhdGlvbnMgPSB7XG4gICAgZW4sXG4gICAgZnIsXG4gICAgcnUsXG4gICAgdmksXG4gICAgemhcbiAgfTtcblxuICAvLyBBZGQgb3RoZXIgbGFuZ3VhZ2VzXG4gIExBTkdVQUdFX0NPREVTLmZvckVhY2goY29kZSA9PiB7XG4gICAgaWYgKCF0cmFuc2xhdGlvbnNbY29kZV0pIHtcbiAgICAgIHRyYW5zbGF0aW9uc1tjb2RlXSA9IHRyYW5zbGF0aW9uc1tkZWZhdWx0TGFuZ10gfHwgdHJhbnNsYXRpb25zW1NZU19MQU5HXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB0cmFuc2xhdGlvbnM7XG59O1xuIl19