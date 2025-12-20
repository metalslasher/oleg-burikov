/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../../chunks/PageLayout_CwL1Xdm9.mjs';
import { $ as $$ContactCTA } from '../../chunks/ContactCTA_o2dcuXkY.mjs';
export { renderers } from '../../renderers.mjs';

const $$FacebookAds = createComponent(($$result, $$props, $$slots) => {
  const benefits = [
    {
      title: "Facebook Ads",
      description: "\u0422\u0430\u0440\u0433\u0435\u0442\u043E\u0432\u0430\u043D\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u043D\u0430\u0439\u0431\u0456\u043B\u044C\u0448\u0456\u0439 \u0441\u043E\u0446\u0456\u0430\u043B\u044C\u043D\u0456\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0456 \u0441\u0432\u0456\u0442\u0443",
      icon: "\u{1F4D8}"
    },
    {
      title: "Instagram Ads",
      description: "\u0412\u0456\u0437\u0443\u0430\u043B\u044C\u043D\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0434\u043B\u044F \u0437\u0430\u043B\u0443\u0447\u0435\u043D\u043D\u044F \u043C\u043E\u043B\u043E\u0434\u043E\u0457 \u0442\u0430 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0457 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u0457",
      icon: "\u{1F4F8}"
    },
    {
      title: "Lead Forms",
      description: "\u0417\u0431\u0456\u0440 \u0437\u0430\u044F\u0432\u043E\u043A \u043F\u0440\u044F\u043C\u043E \u0432 \u0441\u043E\u0446\u043C\u0435\u0440\u0435\u0436\u0430\u0445 \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0443 \u043D\u0430 \u0441\u0430\u0439\u0442",
      icon: "\u{1F4DD}"
    },
    {
      title: "Advantage+",
      description: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u043E\u0432\u0430\u043D\u0456 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0457 \u0437 \u043C\u0430\u0448\u0438\u043D\u043D\u0438\u043C \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F\u043C \u0434\u043B\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0457 \u0435\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0456",
      icon: "\u{1F916}"
    },
    {
      title: "Lookalike \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u0457",
      description: "\u041F\u043E\u0448\u0443\u043A \u043D\u043E\u0432\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432 \u0441\u0445\u043E\u0436\u0438\u0445 \u043D\u0430 \u0432\u0430\u0448\u0438\u0445 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0438\u0445 \u043F\u043E\u043A\u0443\u043F\u0446\u0456\u0432",
      icon: "\u{1F465}"
    },
    {
      title: "\u0420\u0435\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433",
      description: "\u041F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F \u0432\u0456\u0434\u0432\u0456\u0434\u0443\u0432\u0430\u0447\u0456\u0432 \u0441\u0430\u0439\u0442\u0443 \u0442\u0430 \u043F\u043E\u043A\u0438\u043D\u0443\u0442\u0438\u0445 \u043A\u043E\u0448\u0438\u043A\u0456\u0432",
      icon: "\u{1F504}"
    }
  ];
  const process = [
    { step: "01", title: "\u0410\u043D\u0430\u043B\u0456\u0437 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u0457", description: "\u0412\u0438\u0437\u043D\u0430\u0447\u0430\u0454\u043C\u043E \u0432\u0430\u0448\u0443 \u0446\u0456\u043B\u044C\u043E\u0432\u0443 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u044E \u0442\u0430 \u0457\u0457 \u0431\u043E\u043B\u0456" },
    { step: "02", title: "\u041A\u0440\u0435\u0430\u0442\u0438\u0432\u0438", description: "\u0421\u0442\u0432\u043E\u0440\u044E\u0454\u043C\u043E \u043F\u0440\u0438\u0432\u0430\u0431\u043B\u0438\u0432\u0456 \u043E\u0433\u043E\u043B\u043E\u0448\u0435\u043D\u043D\u044F \u0442\u0430 \u0432\u0456\u0434\u0435\u043E" },
    { step: "03", title: "\u0417\u0430\u043F\u0443\u0441\u043A", description: "\u041D\u0430\u043B\u0430\u0448\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u043F\u0456\u043A\u0441\u0435\u043B\u044C, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0457 \u0442\u0430 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0454\u043C\u043E \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0457" },
    { step: "04", title: "\u041C\u0430\u0441\u0448\u0442\u0430\u0431\u0443\u0432\u0430\u043D\u043D\u044F", description: "\u0417\u043D\u0430\u0445\u043E\u0434\u0438\u043C\u043E \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0456 \u0437\u0432'\u044F\u0437\u043A\u0438 \u0442\u0430 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0443\u0454\u043C\u043E \u0443\u0441\u043F\u0456\u0445" }
  ];
  const cases = [
    { metric: "865", label: "\u041B\u0456\u0434\u0456\u0432 \u0447\u0435\u0440\u0435\u0437 Lead Forms", description: "\u0414\u043B\u044F \u0416\u041A" },
    { metric: "$13.75", label: "\u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u043B\u0456\u0434\u0430", description: "\u041D\u0435\u0440\u0443\u0445\u043E\u043C\u0456\u0441\u0442\u044C" },
    { metric: "405K+", label: "\u041E\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F", description: "\u041F\u043E\u0442\u0435\u043D\u0446\u0456\u0439\u043D\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432" }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Meta Ads (Facebook/Instagram) \u0440\u0435\u043A\u043B\u0430\u043C\u0430 | Targetsy Agency", "description": "\u0422\u0430\u0440\u0433\u0435\u0442\u043E\u0432\u0430\u043D\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 Facebook \u0442\u0430 Instagram. Lead Forms, Advantage+, Lookalike \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u0457. \u0417\u0430\u043B\u0443\u0447\u0430\u0454\u043C\u043E \u0432\u0430\u0448\u0443 \u0446\u0456\u043B\u044C\u043E\u0432\u0443 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u044E \u0432 \u0441\u043E\u0446\u043C\u0435\u0440\u0435\u0436\u0430\u0445." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-8 pb-16 px-4"> <div class="max-w-7xl mx-auto"> <div class="grid lg:grid-cols-2 gap-12 items-center"> <div> <a href="/services" class="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6"> <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Всі послуги
</a> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"> <span class="text-purple-400">
Meta Ads
</span> <br>реклама
</h1> <p class="text-xl text-gray-400 mb-8">
Залучаємо вашу аудиторію в Facebook та Instagram. Створюємо креативи, 
            налаштовуємо таргетинг та оптимізуємо для максимальних результатів.
</p> <div class="flex flex-wrap gap-4"> <a href="#contact" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
Отримати консультацію
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </a> </div> </div> <div class="relative"> <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30"> <div class="grid grid-cols-3 gap-4 text-center"> ${cases.map((item) => renderTemplate`<div> <div class="text-2xl md:text-3xl font-bold text-white mb-1">${item.metric}</div> <div class="text-sm text-gray-400">${item.label}</div> </div>`)} </div> </div> </div> </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-7xl mx-auto"> <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-4">
Що входить в послугу?
</h2> <p class="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
Повний спектр можливостей Meta для залучення та конвертації вашої аудиторії
</p> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${benefits.map((benefit) => renderTemplate`<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"> <div class="text-4xl mb-4">${benefit.icon}</div> <h3 class="text-xl font-bold text-white mb-2">${benefit.title}</h3> <p class="text-gray-400">${benefit.description}</p> </div>`)} </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-7xl mx-auto"> <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">
Як ми працюємо
</h2> <div class="grid md:grid-cols-4 gap-8"> ${process.map((item) => renderTemplate`<div class="text-center"> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl"> ${item.step} </div> <h3 class="text-xl font-bold text-white mb-2">${item.title}</h3> <p class="text-gray-400">${item.description}</p> </div>`)} </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-4xl mx-auto text-center"> <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8"> <h2 class="text-2xl font-bold text-white mb-4">Вартість послуги</h2> <p class="text-gray-400 mb-6">
Вартість залежить від обсягу робіт та рекламного бюджету. Включає створення креативів та постійну оптимізацію. 
          Мінімальний рекламний бюджет від $300/міс.
</p> <a href="/pricing" class="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium">
Дізнатись детальніше про ціни
<svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </a> </div> </div> </section>  ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/services/facebook-ads.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/services/facebook-ads.astro";
const $$url = "/services/facebook-ads";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FacebookAds,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
