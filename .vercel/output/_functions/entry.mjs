import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D69xR6c-.mjs';
import { manifest } from './manifest_DlOtnw5N.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/analyze.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/cases/case-1.astro.mjs');
const _page5 = () => import('./pages/cases/case-2.astro.mjs');
const _page6 = () => import('./pages/cases/case-3.astro.mjs');
const _page7 = () => import('./pages/cases/case-4.astro.mjs');
const _page8 = () => import('./pages/cases/case-5.astro.mjs');
const _page9 = () => import('./pages/cases/case-6.astro.mjs');
const _page10 = () => import('./pages/cases.astro.mjs');
const _page11 = () => import('./pages/contact.astro.mjs');
const _page12 = () => import('./pages/pricing.astro.mjs');
const _page13 = () => import('./pages/privacy.astro.mjs');
const _page14 = () => import('./pages/services/analytics.astro.mjs');
const _page15 = () => import('./pages/services/consulting.astro.mjs');
const _page16 = () => import('./pages/services/facebook-ads.astro.mjs');
const _page17 = () => import('./pages/services/google-ads.astro.mjs');
const _page18 = () => import('./pages/services.astro.mjs');
const _page19 = () => import('./pages/tools/site-audit.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/analyze.ts", _page2],
    ["src/pages/blog/index.astro", _page3],
    ["src/pages/cases/case-1.astro", _page4],
    ["src/pages/cases/case-2.astro", _page5],
    ["src/pages/cases/case-3.astro", _page6],
    ["src/pages/cases/case-4.astro", _page7],
    ["src/pages/cases/case-5.astro", _page8],
    ["src/pages/cases/case-6.astro", _page9],
    ["src/pages/cases/index.astro", _page10],
    ["src/pages/contact.astro", _page11],
    ["src/pages/pricing.astro", _page12],
    ["src/pages/privacy.astro", _page13],
    ["src/pages/services/analytics.astro", _page14],
    ["src/pages/services/consulting.astro", _page15],
    ["src/pages/services/facebook-ads.astro", _page16],
    ["src/pages/services/google-ads.astro", _page17],
    ["src/pages/services/index.astro", _page18],
    ["src/pages/tools/site-audit.astro", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "6b3a31fc-2ee7-4659-957d-9a8ec9bb6859",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
