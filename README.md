# وَعْي | أكاديمية الأمن الرقمي

تطبيق عربي تفاعلي لتعلّم أساسيات الأمن السيبراني عبر مسارات قصيرة، أمثلة يومية، واختبار من خمسة أسئلة. يُحفظ التقدم على الجهاز، ويمكن تثبيت التطبيق كتطبيق ويب تقدمي أو بناؤه كتطبيق Android.

## التشغيل

```bash
npm ci
npm run dev
```

## بناء الويب

```bash
npm run build
npm run preview
```

## تطبيق Android

صفحة التنزيل المستقلة: `/APK.html`، ورابطها يقدّم APK الموجود في `public/downloads/waei-cyber-learning.apk`.

ينشر GitHub Actions الموقع تلقائياً إلى GitHub Pages عند الدفع إلى `main`. رابط الموقع بعد تفعيل Pages: `https://ahmedllaya48-max.github.io/k-hg-fdxc/`، وصفحة تنزيل APK: `https://ahmedllaya48-max.github.io/k-hg-fdxc/APK.html`.

بعد تثبيت Android SDK وJava 21:

```bash
npm run android:debug
```

ينشئ الأمر APK تجريبياً في `android/app/build/outputs/apk/debug/app-debug.apk` وينسخ نسخة التنزيل إلى `public/downloads/waei-cyber-learning.apk`. رابط التنزيل داخل التطبيق هو `/downloads/waei-cyber-learning.apk`.

لبناء APK ونشره للتنزيل العام، ارفع المشروع إلى GitHub. يُحفظ كل بناء للفرع `main` كملف في GitHub Actions لمدة ٣٠ يوماً؛ ولإنشاء تنزيل دائم في صفحة الإصدارات، أنشئ وسم إصدار مثل `v1.0.0` وادفعه إلى GitHub.

## ملاحظة أمنية

المحتوى تعليمي ودفاعي. اختبر الأنظمة التي تملكها أو لديك تصريح صريح باختبارها فقط.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
