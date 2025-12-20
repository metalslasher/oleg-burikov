/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../chunks/PageLayout_CwL1Xdm9.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "404 - \u0421\u0442\u043E\u0440\u0456\u043D\u043A\u0443 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E | Targetsy", "description": "\u041D\u0430 \u0436\u0430\u043B\u044C, \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0430, \u044F\u043A\u0443 \u0432\u0438 \u0448\u0443\u043A\u0430\u0454\u0442\u0435, \u043D\u0435 \u0456\u0441\u043D\u0443\u0454. \u041F\u043E\u0432\u0435\u0440\u043D\u0456\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u043D\u0443 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443 Targetsy." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-[80vh] flex items-center justify-center px-4"> <div class="max-w-2xl mx-auto text-center"> <!-- 404 Number --> <div class="relative mb-8"> <h1 class="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-primary-500 opacity-20 leading-none">
404
</h1> <div class="absolute inset-0 flex items-center justify-center"> <div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full flex items-center justify-center border border-accent-500/30"> <svg class="w-16 h-16 md:w-20 md:h-20 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> </div> </div> <!-- Message --> <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
Упс! Сторінку не знайдено
</h2> <p class="text-xl text-gray-400 mb-8">
Схоже, ця сторінка пішла на відпочинок. Можливо, вона була переміщена або видалена.
</p> <!-- Suggestions --> <div class="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"> <p class="text-gray-300 mb-4">Спробуйте:</p> <ul class="text-left text-gray-400 space-y-2 max-w-sm mx-auto"> <li class="flex items-center gap-3"> <svg class="w-5 h-5 text-accent-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Перевірити правильність URL-адреси
</li> <li class="flex items-center gap-3"> <svg class="w-5 h-5 text-accent-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Повернутися на головну сторінку
</li> <li class="flex items-center gap-3"> <svg class="w-5 h-5 text-accent-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Зв'язатися з нами для допомоги
</li> </ul> </div> <!-- Action Buttons --> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-500/25 transition-all duration-300"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg>
На головну
</a> <a href="/contact" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg>
Зв'язатися з нами
</a> </div> <!-- Fun Element --> <div class="mt-12 pt-8 border-t border-white/10"> <p class="text-gray-500 text-sm">
А поки ви тут... може, подивитесь наші
<a href="/services" class="text-accent-400 hover:underline">послуги</a>
або
<a href="/cases" class="text-accent-400 hover:underline">кейси</a>?
</p> </div> </div> </section> ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/404.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
