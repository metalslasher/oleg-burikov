/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../chunks/PageLayout_CwL1Xdm9.mjs';
import { $ as $$ContactCTA } from '../chunks/ContactCTA_o2dcuXkY.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const services = [
    {
      slug: "google-ads",
      title: "Google Ads",
      description: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0442\u0430 \u0432\u0435\u0434\u0435\u043D\u043D\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0438 \u0432 Google",
      icon: "\u{1F3AF}",
      color: "from-blue-500 to-blue-600",
      features: ["\u041F\u043E\u0448\u0443\u043A\u043E\u0432\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u0430", "Performance Max", "YouTube \u0440\u0435\u043A\u043B\u0430\u043C\u0430", "\u0420\u0435\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433"]
    },
    {
      slug: "facebook-ads",
      title: "Meta Ads",
      description: "\u0422\u0430\u0440\u0433\u0435\u0442\u043E\u0432\u0430\u043D\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 Facebook \u0442\u0430 Instagram",
      icon: "\u{1F4F1}",
      color: "from-purple-500 to-pink-500",
      features: ["Facebook", "Instagram"]
    },
    {
      slug: "analytics",
      title: "\u0412\u0435\u0431-\u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430",
      description: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0438 \u0442\u0430 \u0432\u0456\u0434\u0441\u0442\u0435\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0439",
      icon: "\u{1F4CA}",
      color: "from-green-500 to-emerald-500",
      features: ["Google Analytics 4", "Google Tag Manager", "Microsoft Clarity"]
    },
    {
      slug: "consulting",
      title: "\u041A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433",
      description: "\u0410\u0443\u0434\u0438\u0442 \u0442\u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0447\u043D\u0438\u0439 \u043A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433 \u0437 \u0440\u0435\u043A\u043B\u0430\u043C\u0438",
      icon: "\u{1F4A1}",
      color: "from-amber-500 to-orange-500",
      features: ["\u0410\u0443\u0434\u0438\u0442 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439", "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u044F"]
    }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "\u041F\u043E\u0441\u043B\u0443\u0433\u0438 | Targetsy Agency", "description": "\u041F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0456 \u043F\u043E\u0441\u043B\u0443\u0433\u0438 \u0437 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u0433\u043E \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0443: Google Ads, Meta Ads, \u0432\u0435\u0431-\u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430 \u0442\u0430 \u043A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433. \u0417\u0431\u0456\u043B\u044C\u0448\u0443\u0454\u043C\u043E \u0432\u0430\u0448\u0456 \u043F\u0440\u043E\u0434\u0430\u0436\u0456 \u0447\u0435\u0440\u0435\u0437 \u0435\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u0443 \u043E\u043D\u043B\u0430\u0439\u043D-\u0440\u0435\u043A\u043B\u0430\u043C\u0443." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-8 pb-16 px-4"> <div class="max-w-7xl mx-auto text-center"> <span class="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-400 text-sm font-medium mb-6">
Наші послуги
</span> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
Комплексний digital-маркетинг
<span class="block text-accent-400">
для вашого бізнесу
</span> </h1> <p class="text-xl text-gray-400 max-w-3xl mx-auto">
Від налаштування реклами до аналітики — ми забезпечуємо повний цикл онлайн-просування вашого бізнесу
</p> </div> </section>  <section class="py-16 px-4"> <div class="max-w-7xl mx-auto"> <div class="grid md:grid-cols-2 gap-8"> ${services.map((service) => renderTemplate`<a${addAttribute(`/services/${service.slug}`, "href")} class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-accent-500/50 transition-all duration-300"> <div${addAttribute(`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 text-3xl`, "class")}> ${service.icon} </div> <h2 class="text-2xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors"> ${service.title} </h2> <p class="text-gray-400 mb-6"> ${service.description} </p> <div class="flex flex-wrap gap-2 mb-6"> ${service.features.map((feature) => renderTemplate`<span class="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"> ${feature} </span>`)} </div> <div class="flex items-center text-accent-400 font-medium">
Детальніше
<svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </div> </a>`)} </div> </div> </section>  ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/services/index.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/services/index.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
