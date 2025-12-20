/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../../chunks/PageLayout_CwL1Xdm9.mjs';
import { $ as $$ContactCTA } from '../../chunks/ContactCTA_o2dcuXkY.mjs';
export { renderers } from '../../renderers.mjs';

const $$Consulting = createComponent(($$result, $$props, $$slots) => {
  const benefits = [
    {
      title: "\u0410\u0443\u0434\u0438\u0442 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439",
      description: "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u0430\u043D\u0430\u043B\u0456\u0437 \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439 \u0437 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u044F\u043C\u0438 \u043F\u043E \u043E\u043F\u0442\u0438\u043C\u0456\u0437\u0430\u0446\u0456\u0457",
      icon: "\u{1F50D}"
    },
    {
      title: "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u044F",
      description: "\u0420\u043E\u0437\u0440\u043E\u0431\u043A\u0430 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u043E\u0457 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0457 \u043F\u0440\u043E\u0441\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0456\u0434 \u0432\u0430\u0448\u0456 \u0446\u0456\u043B\u0456",
      icon: "\u{1F4CB}"
    },
    {
      title: "\u041E\u043F\u0442\u0438\u043C\u0456\u0437\u0430\u0446\u0456\u044F \u0431\u044E\u0434\u0436\u0435\u0442\u0443",
      description: "\u0410\u043D\u0430\u043B\u0456\u0437 \u0442\u0430 \u043F\u0435\u0440\u0435\u0440\u043E\u0437\u043F\u043E\u0434\u0456\u043B \u0431\u044E\u0434\u0436\u0435\u0442\u0443 \u0434\u043B\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0457 \u0435\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0456",
      icon: "\u{1F4B0}"
    },
    {
      title: "\u0410\u043D\u0430\u043B\u0456\u0437 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u0456\u0432",
      description: "\u0414\u043E\u0441\u043B\u0456\u0434\u0436\u0435\u043D\u043D\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0439 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u0456\u0432 \u0442\u0430 \u0457\u0445 \u043F\u043E\u0437\u0438\u0446\u0456\u043E\u043D\u0443\u0432\u0430\u043D\u043D\u044F",
      icon: "\u{1F440}"
    },
    {
      title: "\u041D\u0430\u0432\u0447\u0430\u043D\u043D\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0438",
      description: "\u0422\u0440\u0435\u043D\u0456\u043D\u0433\u0438 \u0442\u0430 \u0432\u043E\u0440\u043A\u0448\u043E\u043F\u0438 \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u043E\u0457 \u043A\u043E\u043C\u0430\u043D\u0434\u0438",
      icon: "\u{1F393}"
    },
    {
      title: "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u0457",
      description: "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0456 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u0457 \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0456 \u043D\u0430 \u0432\u0430\u0448\u0456 \u043F\u0438\u0442\u0430\u043D\u043D\u044F",
      icon: "\u{1F4AC}"
    }
  ];
  const formats = [
    {
      title: "\u0420\u0430\u0437\u043E\u0432\u0438\u0439 \u0430\u0443\u0434\u0438\u0442",
      description: "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u0430\u043D\u0430\u043B\u0456\u0437 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u043D\u0443 \u0437 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u044F\u043C\u0438",
      price: "\u0432\u0456\u0434 $300",
      features: ["\u0410\u043D\u0430\u043B\u0456\u0437 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439", "\u041F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u0430 \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0438", "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0432\u0456\u0442", "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457"]
    },
    {
      title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0447\u043D\u0430 \u0441\u0435\u0441\u0456\u044F",
      description: "2-3 \u0433\u043E\u0434\u0438\u043D\u0438 \u0456\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u043E\u0457 \u0440\u043E\u0431\u043E\u0442\u0438 \u043D\u0430\u0434 \u0432\u0430\u0448\u043E\u044E \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0454\u044E",
      price: "\u0432\u0456\u0434 $200",
      features: ["\u0410\u043D\u0430\u043B\u0456\u0437 \u0446\u0456\u043B\u0435\u0439", "\u0420\u043E\u0437\u0440\u043E\u0431\u043A\u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0457", "\u041F\u043B\u0430\u043D \u0434\u0456\u0439", "\u0417\u0430\u043F\u0438\u0441 \u0441\u0435\u0441\u0456\u0457"]
    },
    {
      title: "\u041C\u0435\u043D\u0442\u043E\u0440\u0441\u0442\u0432\u043E",
      description: "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0456 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u0457 \u0442\u0430 \u0441\u0443\u043F\u0440\u043E\u0432\u0456\u0434 \u0432\u0430\u0448\u043E\u0457 \u043A\u043E\u043C\u0430\u043D\u0434\u0438",
      price: "\u0432\u0456\u0434 $500/\u043C\u0456\u0441",
      features: ["4 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u0457/\u043C\u0456\u0441", "\u0420\u0435\u0432\u044E \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439", "\u0412\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0456 \u043D\u0430 \u043F\u0438\u0442\u0430\u043D\u043D\u044F", "\u041F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u0430 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430"]
    }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "\u041A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433 \u0437 \u0440\u0435\u043A\u043B\u0430\u043C\u0438 | Targetsy Agency", "description": "\u0410\u0443\u0434\u0438\u0442 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439, \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u044F, \u043E\u043F\u0442\u0438\u043C\u0456\u0437\u0430\u0446\u0456\u044F \u0431\u044E\u0434\u0436\u0435\u0442\u0443, \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0438. \u0415\u043A\u0441\u043F\u0435\u0440\u0442\u043D\u0456 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u0457 \u0437 digital-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0443." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-8 pb-16 px-4"> <div class="max-w-7xl mx-auto"> <div class="grid lg:grid-cols-2 gap-12 items-center"> <div> <a href="/services" class="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6"> <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Всі послуги
</a> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"> <span class="text-amber-400">
Консалтинг
</span> <br>з реклами
</h1> <p class="text-xl text-gray-400 mb-8">
Аналізуємо вашу поточну рекламу та стратегію просування. 
            Надаємо покроковий план покращення та допомагаємо з впровадженням.
</p> <div class="flex flex-wrap gap-4"> <a href="#contact" class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all">
Замовити консультацію
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </a> </div> </div> <div class="relative"> <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border border-amber-500/30"> <div class="text-center"> <div class="text-5xl mb-4">💡</div> <h3 class="text-2xl font-bold text-white mb-2">4+ років досвіду</h3> <p class="text-gray-400">в digital-маркетингу</p> <div class="mt-6 pt-6 border-t border-white/10"> <div class="text-3xl font-bold text-white">100+</div> <div class="text-gray-400">проектів реалізовано</div> </div> </div> </div> </div> </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-7xl mx-auto"> <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-4">
Що входить в консалтинг?
</h2> <p class="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
Експертна підтримка на кожному етапі вашого маркетингового шляху
</p> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${benefits.map((benefit) => renderTemplate`<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"> <div class="text-4xl mb-4">${benefit.icon}</div> <h3 class="text-xl font-bold text-white mb-2">${benefit.title}</h3> <p class="text-gray-400">${benefit.description}</p> </div>`)} </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-7xl mx-auto"> <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">
Формати співпраці
</h2> <div class="grid md:grid-cols-3 gap-8"> ${formats.map((format) => renderTemplate`<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-colors"> <h3 class="text-xl font-bold text-white mb-2">${format.title}</h3> <p class="text-gray-400 mb-4">${format.description}</p> <div class="text-2xl font-bold text-amber-400 mb-6">${format.price}</div> <ul class="space-y-2"> ${format.features.map((feature) => renderTemplate`<li class="flex items-center text-gray-300"> <svg class="w-5 h-5 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> ${feature} </li>`)} </ul> </div>`)} </div> </div> </section>  ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/services/consulting.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/services/consulting.astro";
const $$url = "/services/consulting";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Consulting,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
