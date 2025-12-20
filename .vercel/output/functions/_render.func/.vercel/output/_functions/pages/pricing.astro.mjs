/* empty css                                 */
import { f as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../chunks/PageLayout_CwL1Xdm9.mjs';
import { $ as $$ContactCTA } from '../chunks/ContactCTA_o2dcuXkY.mjs';
export { renderers } from '../renderers.mjs';

const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const plans = [
    {
      name: "Starter",
      description: "\u0414\u043B\u044F \u043C\u0430\u043B\u043E\u0433\u043E \u0431\u0456\u0437\u043D\u0435\u0441\u0443, \u0449\u043E \u0442\u0456\u043B\u044C\u043A\u0438 \u043F\u043E\u0447\u0438\u043D\u0430\u0454 \u0437 \u0440\u0435\u043A\u043B\u0430\u043C\u0438",
      price: "$400",
      period: "/\u043C\u0456\u0441",
      adBudget: "\u0434\u043E $1,000",
      features: [
        "1 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0439 \u043A\u0430\u043D\u0430\u043B (Google \u0430\u0431\u043E Meta)",
        "\u0414\u043E 3 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439",
        "\u0411\u0430\u0437\u043E\u0432\u0430 \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430",
        "\u0429\u043E\u043C\u0456\u0441\u044F\u0447\u043D\u0438\u0439 \u0437\u0432\u0456\u0442",
        "Telegram \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430"
      ],
      highlighted: false,
      cta: "\u041F\u043E\u0447\u0430\u0442\u0438"
    },
    {
      name: "Growth",
      description: "\u0414\u043B\u044F \u0431\u0456\u0437\u043D\u0435\u0441\u0443, \u0449\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u043E \u0437\u0440\u043E\u0441\u0442\u0430\u0454",
      price: "$700",
      period: "/\u043C\u0456\u0441",
      adBudget: "$1,000 - $5,000",
      features: [
        "2 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u043A\u0430\u043D\u0430\u043B\u0438",
        "\u0414\u043E 10 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439",
        "\u041F\u043E\u0432\u043D\u0430 \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430 (GA4 + GTM)",
        "\u0429\u043E\u0442\u0438\u0436\u043D\u0435\u0432\u0456 \u0437\u0432\u0456\u0442\u0438",
        "A/B \u0442\u0435\u0441\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u0456\u0432",
        "\u041F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u0430 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430"
      ],
      highlighted: true,
      cta: "\u041E\u0431\u0440\u0430\u0442\u0438"
    },
    {
      name: "Scale",
      description: "\u0414\u043B\u044F \u0431\u0456\u0437\u043D\u0435\u0441\u0443 \u0437 \u0432\u0435\u043B\u0438\u043A\u0438\u043C\u0438 \u0430\u043C\u0431\u0456\u0446\u0456\u044F\u043C\u0438",
      price: "$1,200",
      period: "/\u043C\u0456\u0441",
      adBudget: "$5,000+",
      features: [
        "\u0412\u0441\u0456 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0456 \u043A\u0430\u043D\u0430\u043B\u0438",
        "\u041D\u0435\u043E\u0431\u043C\u0435\u0436\u0435\u043D\u0430 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439",
        "\u041F\u043E\u0432\u043D\u0430 \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430 + \u0434\u0430\u0448\u0431\u043E\u0440\u0434\u0438",
        "\u0429\u043E\u0434\u0435\u043D\u043D\u0438\u0439 \u043C\u043E\u043D\u0456\u0442\u043E\u0440\u0438\u043D\u0433",
        "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0447\u043D\u0456 \u0441\u0435\u0441\u0456\u0457 \u0449\u043E\u043C\u0456\u0441\u044F\u0446\u044F",
        "\u0412\u0438\u0434\u0456\u043B\u0435\u043D\u0438\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440",
        "\u041A\u0440\u0435\u0430\u0442\u0438\u0432\u0438 \u0432\u0456\u0434 \u043D\u0430\u0448\u043E\u0457 \u043A\u043E\u043C\u0430\u043D\u0434\u0438"
      ],
      highlighted: false,
      cta: "\u041E\u0431\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0438"
    }
  ];
  const oneTime = [
    { name: "\u0410\u0443\u0434\u0438\u0442 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0456\u0439", price: "\u0432\u0456\u0434 $300", description: "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u0430\u043D\u0430\u043B\u0456\u0437 + \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457" },
    { name: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F GA4 + GTM", price: "\u0432\u0456\u0434 $200", description: "\u0411\u0430\u0437\u043E\u0432\u0435 \u0432\u0456\u0434\u0441\u0442\u0435\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0439" },
    { name: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0447\u043D\u0430 \u0441\u0435\u0441\u0456\u044F", price: "\u0432\u0456\u0434 $200", description: "2-3 \u0433\u043E\u0434\u0438\u043D\u0438 \u0440\u043E\u0431\u043E\u0442\u0438 \u043D\u0430\u0434 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0454\u044E" },
    { name: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F e-commerce", price: "\u0432\u0456\u0434 $400", description: "\u041F\u043E\u0432\u043D\u0435 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0456\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0443" }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "\u0426\u0456\u043D\u0438 | Targetsy Agency", "description": "\u041F\u0440\u043E\u0437\u043E\u0440\u0456 \u0446\u0456\u043D\u0438 \u043D\u0430 \u043F\u043E\u0441\u043B\u0443\u0433\u0438 digital-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0443. \u041F\u0430\u043A\u0435\u0442\u0438 \u0434\u043B\u044F \u0431\u0456\u0437\u043D\u0435\u0441\u0443 \u0431\u0443\u0434\u044C-\u044F\u043A\u043E\u0433\u043E \u0440\u043E\u0437\u043C\u0456\u0440\u0443: \u0432\u0456\u0434 \u0441\u0442\u0430\u0440\u0442\u0430\u043F\u0456\u0432 \u0434\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0439." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-8 pb-16 px-4"> <div class="max-w-7xl mx-auto text-center"> <span class="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-400 text-sm font-medium mb-6">
Тарифи
</span> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
Прозорі ціни
<span class="block text-accent-400">
без прихованих платежів
</span> </h1> <p class="text-xl text-gray-400 max-w-3xl mx-auto">
Оберіть пакет, що відповідає вашим потребам та бюджету. Кожен пакет можна налаштувати індивідуально.
</p> </div> </section>  <section class="py-16 px-4"> <div class="max-w-7xl mx-auto"> <div class="grid md:grid-cols-3 gap-8"> ${plans.map((plan) => renderTemplate`<div${addAttribute(`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 ${plan.highlighted ? "border-accent-500 scale-105" : "border-white/10"}`, "class")}> ${plan.highlighted && renderTemplate`<div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-500 rounded-full text-sm font-medium text-white">
Популярний
</div>`} <h3 class="text-2xl font-bold text-white mb-2">${plan.name}</h3> <p class="text-gray-400 mb-6">${plan.description}</p> <div class="mb-2"> <span class="text-4xl font-bold text-white">${plan.price}</span> <span class="text-gray-400">${plan.period}</span> </div> <p class="text-sm text-gray-500 mb-6">Рекламний бюджет: ${plan.adBudget}</p> <ul class="space-y-3 mb-8"> ${plan.features.map((feature) => renderTemplate`<li class="flex items-start gap-3 text-gray-300"> <svg class="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> ${feature} </li>`)} </ul> <a href="#contact"${addAttribute(plan.name, "data-plan")}${addAttribute(plan.price, "data-price")}${addAttribute(`plan-select-btn block w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.highlighted ? "bg-gradient-to-r from-accent-500 to-primary-500 text-white hover:shadow-lg hover:shadow-accent-500/30" : "bg-white/10 text-white hover:bg-white/20"}`, "class")}> ${plan.cta} </a> </div>`)} </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-4xl mx-auto"> <h2 class="text-3xl font-bold text-white text-center mb-12">Разові послуги</h2> <div class="grid md:grid-cols-2 gap-6"> ${oneTime.map((service) => renderTemplate`<div class="bg-white/5 border border-white/10 rounded-xl p-6 flex justify-between items-center"> <div> <h3 class="text-lg font-semibold text-white">${service.name}</h3> <p class="text-gray-400 text-sm">${service.description}</p> </div> <div class="text-xl font-bold text-accent-400 whitespace-nowrap ml-4"> ${service.price} </div> </div>`)} </div> </div> </section>  <section class="py-16 px-4"> <div class="max-w-4xl mx-auto"> <h2 class="text-3xl font-bold text-white text-center mb-12">Важливо знати</h2> <div class="grid md:grid-cols-2 gap-8"> <div class="bg-white/5 border border-white/10 rounded-xl p-6"> <h3 class="text-lg font-semibold text-white mb-2">💰 Як формується ціна?</h3> <p class="text-gray-400">Вартість залежить від обсягу робіт та рекламного бюджету. Чим більший бюджет — тим більше часу потрібно на оптимізацію.</p> </div> <div class="bg-white/5 border border-white/10 rounded-xl p-6"> <h3 class="text-lg font-semibold text-white mb-2">📅 Мінімальний термін?</h3> <p class="text-gray-400">Рекомендуємо мінімум 3 місяці для отримання стабільних результатів. Але можемо працювати і помісячно.</p> </div> <div class="bg-white/5 border border-white/10 rounded-xl p-6"> <h3 class="text-lg font-semibold text-white mb-2">💳 Як оплачувати рекламу?</h3> <p class="text-gray-400">Рекламний бюджет оплачується напряму в Google/Meta. Ми не беремо посередницьких комісій.</p> </div> <div class="bg-white/5 border border-white/10 rounded-xl p-6"> <h3 class="text-lg font-semibold text-white mb-2">🎯 Що якщо немає результату?</h3> <p class="text-gray-400">Ми зацікавлені в вашому успіху. Якщо не бачимо результатів — разом шукаємо рішення або припиняємо співпрацю.</p> </div> </div> </div> </section>  ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })} ${renderScript($$result, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/pricing.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/pricing.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/pricing.astro";
const $$url = "/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
