import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, o as renderSlot } from './astro/server_axkPhgby.mjs';
import 'piccolore';
import { $ as $$Header, a as $$Footer, b as $$BaseLayout } from './Footer_CdAScm9i.mjs';

const $$Astro = createAstro("https://targetsy.agency");
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { title, description, ogTitle, ogDescription, ogImage } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "ogTitle": ogTitle, "ogDescription": ogDescription, "ogImage": ogImage }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main" class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" style="padding-top: 120px;"> ${renderSlot($$result2, $$slots["default"])} ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })}`;
}, "C:/Users/olegb/Documents/Targetsy Agency/Site/src/layouts/PageLayout.astro", void 0);

export { $$PageLayout as $ };
