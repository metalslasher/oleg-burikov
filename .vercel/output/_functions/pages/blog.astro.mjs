/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../chunks/PageLayout_CwL1Xdm9.mjs';
import { $ as $$ContactCTA } from '../chunks/ContactCTA_o2dcuXkY.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const blogPosts = [
    {
      slug: "google-ads-2024-trends",
      title: "\u0422\u0440\u0435\u043D\u0434\u0438 Google Ads 2024: \u0449\u043E \u043F\u0440\u0430\u0446\u044E\u0454 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0435",
      excerpt: "\u0420\u043E\u0437\u0433\u043B\u044F\u0434\u0430\u0454\u043C\u043E \u043A\u043B\u044E\u0447\u043E\u0432\u0456 \u0437\u043C\u0456\u043D\u0438 \u0432 Google Ads \u0442\u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0457, \u044F\u043A\u0456 \u043F\u0440\u0438\u043D\u043E\u0441\u044F\u0442\u044C \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0456 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u0434\u043B\u044F \u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u043E\u0433\u043E \u0431\u0456\u0437\u043D\u0435\u0441\u0443.",
      date: "10 \u0433\u0440\u0443\u0434\u043D\u044F 2024",
      category: "Google Ads",
      readTime: "7 \u0445\u0432",
      image: "/images/blog/google-ads-trends.jpg"
    },
    {
      slug: "facebook-ads-targeting",
      title: "\u042F\u043A \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u0442\u0438 \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u043D\u0433 \u0443 Facebook Ads",
      excerpt: "\u041F\u043E\u043A\u0440\u043E\u043A\u043E\u0432\u0438\u0439 \u0433\u0430\u0439\u0434 \u0437 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0435\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u043D\u0433\u0443 \u0434\u043B\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u0432\u0430\u0448\u043E\u0457 \u0446\u0456\u043B\u044C\u043E\u0432\u043E\u0457 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u0457.",
      date: "5 \u0433\u0440\u0443\u0434\u043D\u044F 2024",
      category: "Meta Ads",
      readTime: "10 \u0445\u0432",
      image: "/images/blog/facebook-targeting.jpg"
    },
    {
      slug: "analytics-basics",
      title: "\u041E\u0441\u043D\u043E\u0432\u0438 \u0432\u0435\u0431-\u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0438 \u0434\u043B\u044F \u0431\u0456\u0437\u043D\u0435\u0441\u0443",
      excerpt: "\u0414\u0456\u0437\u043D\u0430\u0439\u0442\u0435\u0441\u044C, \u044F\u043A\u0456 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u0432\u0430\u0436\u043B\u0438\u0432\u043E \u0432\u0456\u0434\u0441\u0442\u0435\u0436\u0443\u0432\u0430\u0442\u0438 \u0442\u0430 \u044F\u043A \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0434\u0430\u043D\u0456 \u0434\u043B\u044F \u043F\u0440\u0438\u0439\u043D\u044F\u0442\u0442\u044F \u0431\u0456\u0437\u043D\u0435\u0441-\u0440\u0456\u0448\u0435\u043D\u044C.",
      date: "28 \u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430 2024",
      category: "\u0410\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430",
      readTime: "8 \u0445\u0432",
      image: "/images/blog/analytics-basics.jpg"
    },
    {
      slug: "landing-page-optimization",
      title: "\u041E\u043F\u0442\u0438\u043C\u0456\u0437\u0430\u0446\u0456\u044F \u043B\u0435\u043D\u0434\u0456\u043D\u0433\u0443 \u0434\u043B\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0439",
      excerpt: "\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u043D\u0456 \u043F\u043E\u0440\u0430\u0434\u0438 \u0449\u043E\u0434\u043E \u043F\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u043D\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0457 \u0432\u0430\u0448\u043E\u0457 \u043F\u043E\u0441\u0430\u0434\u043A\u043E\u0432\u043E\u0457 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0438 \u0431\u0435\u0437 \u0432\u0435\u043B\u0438\u043A\u0438\u0445 \u0432\u0438\u0442\u0440\u0430\u0442.",
      date: "20 \u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430 2024",
      category: "\u041A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0457",
      readTime: "6 \u0445\u0432",
      image: "/images/blog/landing-optimization.jpg"
    },
    {
      slug: "remarketing-strategies",
      title: "\u0420\u0435\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433: \u044F\u043A \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432",
      excerpt: "\u0415\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u0456 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0457 \u0440\u0435\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0443 \u0434\u043B\u044F e-commerce \u0442\u0430 \u0441\u0435\u0440\u0432\u0456\u0441\u043D\u0438\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0439.",
      date: "15 \u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430 2024",
      category: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u044F",
      readTime: "9 \u0445\u0432",
      image: "/images/blog/remarketing.jpg"
    },
    {
      slug: "ppc-budget-planning",
      title: "\u041F\u043B\u0430\u043D\u0443\u0432\u0430\u043D\u043D\u044F \u0431\u044E\u0434\u0436\u0435\u0442\u0443 \u043D\u0430 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0443 \u0440\u0435\u043A\u043B\u0430\u043C\u0443",
      excerpt: "\u042F\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0440\u043E\u0437\u043F\u043E\u0434\u0456\u043B\u0438\u0442\u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0438\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 \u0442\u0430 \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0443 \u0432\u0456\u0434\u0434\u0430\u0447\u0443 \u0432\u0456\u0434 \u0456\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0456\u0439.",
      date: "8 \u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430 2024",
      category: "\u0411\u044E\u0434\u0436\u0435\u0442",
      readTime: "5 \u0445\u0432",
      image: "/images/blog/budget-planning.jpg"
    }
  ];
  const categories = ["\u0412\u0441\u0456", "Google Ads", "Meta Ads", "\u0410\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430", "\u041A\u043E\u043D\u0432\u0435\u0440\u0441\u0456\u0457", "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u044F"];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "\u0411\u043B\u043E\u0433 | Targetsy - \u0421\u0442\u0430\u0442\u0442\u0456 \u043F\u0440\u043E digital-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", "description": "\u041A\u043E\u0440\u0438\u0441\u043D\u0456 \u0441\u0442\u0430\u0442\u0442\u0456 \u043F\u0440\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0443 \u0440\u0435\u043A\u043B\u0430\u043C\u0443, \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u043D\u0433, \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0443 \u0442\u0430 digital-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0432\u0456\u0434 \u0435\u043A\u0441\u043F\u0435\u0440\u0442\u0456\u0432 Targetsy." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-8 pb-16 px-4"> <div class="max-w-7xl mx-auto text-center"> <span class="inline-block px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-medium mb-6">
📚 База знань
</span> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
Блог <span class="text-accent-400">Targetsy</span> </h1> <p class="text-xl text-gray-300 max-w-3xl mx-auto">
Корисні статті, кейси та інсайти з digital-маркетингу від нашої команди експертів
</p> </div> </section>  <section class="pb-8 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex flex-wrap justify-center gap-3"> ${categories.map((category, index) => renderTemplate`<button${addAttribute(`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${index === 0 ? "bg-accent-500 text-white" : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"}`, "class")}> ${category} </button>`)} </div> </div> </section>  <section class="py-12 px-4"> <div class="max-w-7xl mx-auto"> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${blogPosts.map((post) => renderTemplate`<article class="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-500/50 transition-all duration-300"> <!-- Image Placeholder --> <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"> <div class="absolute inset-0 flex items-center justify-center"> <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div> <div class="absolute top-4 left-4"> <span class="px-3 py-1 bg-accent-500/90 text-white text-xs font-medium rounded-full"> ${post.category} </span> </div> </div> <!-- Content --> <div class="p-6"> <div class="flex items-center gap-4 text-sm text-gray-400 mb-3"> <span>${post.date}</span> <span>•</span> <span>${post.readTime} читання</span> </div> <h2 class="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="hover:underline"> ${post.title} </a> </h2> <p class="text-gray-400 mb-4 line-clamp-2"> ${post.excerpt} </p> <a${addAttribute(`/blog/${post.slug}`, "href")} class="inline-flex items-center gap-2 text-accent-400 font-medium hover:text-accent-300 transition-colors">
Читати далі
<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </article>`)} </div> </div> </section>  ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
