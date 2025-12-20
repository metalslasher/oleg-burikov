/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$PageLayout } from '../chunks/PageLayout_CwL1Xdm9.mjs';
import { $ as $$ContactCTA } from '../chunks/ContactCTA_o2dcuXkY.mjs';
import { c as content } from '../chunks/Footer_CdAScm9i.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const { header, footer } = content;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438 | Targetsy Agency", "description": "\u0417\u0432'\u044F\u0436\u0456\u0442\u044C\u0441\u044F \u0437 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E\u0457 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u0457 \u0437 Google Ads \u0442\u0430 Meta Ads. \u0422\u0435\u043B\u0435\u0444\u043E\u043D, email, \u043C\u0435\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0438." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-8 pb-16 px-4"> <div class="max-w-7xl mx-auto text-center"> <span class="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-400 text-sm font-medium mb-6">
Контакти
</span> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
Давайте
<span class="block text-accent-400">
поспілкуємось
</span> </h1> <p class="text-xl text-gray-400 max-w-3xl mx-auto">
Залиште заявку або зв'яжіться з нами напряму. Ми відповідаємо протягом 1 робочого дня.
</p> </div> </section>  <section class="py-8 px-4"> <div class="max-w-4xl mx-auto"> <div class="grid md:grid-cols-3 gap-6"> <!-- Phone --> <a${addAttribute(`tel:${header.phone.replace(/\s/g, "")}`, "href")} class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-accent-500/50 transition-all group"> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center"> <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> </div> <h3 class="text-xl font-bold text-white mb-2">Телефон</h3> <p class="text-accent-400 group-hover:text-accent-300">${header.phone}</p> </a> <!-- Email --> <a${addAttribute(`mailto:${header.email}`, "href")} class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-accent-500/50 transition-all group"> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center"> <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </div> <h3 class="text-xl font-bold text-white mb-2">Email</h3> <p class="text-accent-400 group-hover:text-accent-300">${header.email}</p> </a> <!-- Location --> <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center"> <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <h3 class="text-xl font-bold text-white mb-2">Локація</h3> <p class="text-gray-400">${footer.contact.address}</p> </div> </div> </div> </section>  <section class="py-8 px-4"> <div class="max-w-4xl mx-auto text-center"> <h2 class="text-2xl font-bold text-white mb-6">Пишіть у месенджери</h2> <div class="flex flex-wrap justify-center gap-4"> <a href="https://t.me/+380962290400" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc]/20 border border-[#0088cc]/50 rounded-xl text-[#0088cc] hover:bg-[#0088cc]/30 transition-colors"> <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"></path> </svg>
Telegram
</a> <a href="viber://chat?number=380962290400" class="inline-flex items-center gap-2 px-6 py-3 bg-[#7360f2]/20 border border-[#7360f2]/50 rounded-xl text-[#7360f2] hover:bg-[#7360f2]/30 transition-colors"> <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.14 15.86c-1.06 0-2.05-.28-2.9-.77l-3.02.79.81-2.95c-.54-.88-.85-1.91-.85-3.01 0-3.23 2.63-5.86 5.86-5.86 3.23 0 5.86 2.63 5.86 5.86s-2.55 5.94-5.76 5.94z"></path> </svg>
Viber
</a> <a href="https://wa.me/380962290400" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/20 border border-[#25D366]/50 rounded-xl text-[#25D366] hover:bg-[#25D366]/30 transition-colors"> <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path> </svg>
WhatsApp
</a> </div> </div> </section>  ${renderComponent($$result2, "ContactCTA", $$ContactCTA, {})} ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/contact.astro", void 0);

const $$file = "C:/Users/olegb/Documents/Targetsy Agency/Site/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
