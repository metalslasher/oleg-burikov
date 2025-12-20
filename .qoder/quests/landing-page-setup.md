# Landing Page Setup Design

## Project Overview

Create a modern, high-performance single-page landing site for Targetsy.agency – a digital advertising agency specializing in Google Ads, Meta Ads, analytics, and consulting. The landing page must effectively present services, demonstrate expertise through case studies, build trust via testimonials, and drive conversions through strategic calls-to-action.

## Strategic Goals

- Present agency value proposition clearly within first 5 seconds of visit
- Demonstrate credibility through real case studies and client testimonials
- Achieve conversion action: consultation request form submission
- Deliver optimal performance: Lighthouse score ≥90 on mobile devices
- Ensure mobile-first experience given 98% of users access web via mobile
- Maintain fast load time: under 3 seconds to prevent 40% abandonment rate

## Technology Stack Selection

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Astro | Static site framework | Zero JavaScript by default, optimal performance, built-in image optimization |
| TypeScript | Type safety | Catches errors during development, improves maintainability |
| Tailwind CSS | Styling framework | Utility-first approach, minimal CSS footprint, responsive design patterns |
| WebP + SVG | Image formats | WebP for photos (superior compression), SVG for icons/logos (scalable, tiny) |

## Architecture Approach

### Site Structure

Single-page application with anchor-based navigation. All content sections exist on one HTML page, navigation triggers smooth scrolling to section anchors.

**Rationale**: Simplifies user journey, reduces server requests, enables instant navigation, better for conversion-focused landing pages compared to multi-page sites.

### Content Management Strategy

All Ukrainian language content stored in structured JSON file at `src/content/home-uk.json`. This separation enables:

- Easy content updates without touching component code
- Future internationalization (add `home-en.json` for English version)
- Content review by non-technical stakeholders
- Consistent content structure across all sections

**JSON Content Structure**:

| Section | Content Elements |
|---------|------------------|
| metadata | Page title, meta description, Open Graph tags |
| header | Logo text, navigation menu items, contact details |
| hero | Main headline, subheadline, CTA button text |
| services | Four service cards (title, description, icon identifier) |
| about | Agency intro text, four competitive advantages |
| cases | Three case studies (client, challenge, solution, metrics) |
| testimonials | Three client reviews (quote, name, role, company) |
| cta | Final call-to-action headline, subheadline, form labels |
| footer | Contact information, menu links, social media, legal links |

### Performance Optimization Strategy

#### Lighthouse Score Target: ≥90 (Mobile)

**Performance Budget**:

- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Speed Index: < 3.4s

**Implementation Tactics**:

1. **Zero JavaScript to Interactive Content**: Astro renders to static HTML; JavaScript only loads for interactive elements (form validation, smooth scroll)

2. **Image Optimization Protocol**:
   - All photography converted to WebP format
   - Implement responsive image sizes using `srcset` attribute
   - Apply lazy loading to all images below fold (intersection observer)
   - Serve icons as inline SVG to eliminate additional requests
   - Compress images: target quality 80-85 for WebP
   - Define explicit width/height attributes to prevent layout shift

3. **CSS Optimization**:
   - Tailwind purges unused styles during build
   - Critical above-fold CSS inlined in document head
   - Remaining styles loaded asynchronously
   - Minimize custom CSS; leverage Tailwind utilities

4. **Font Loading Strategy**:
   - Use system font stack as fallback
   - If custom fonts required: preload font files, use `font-display: swap`
   - Subset fonts to Latin + Cyrillic characters only

5. **Third-Party Script Management**:
   - Google Analytics 4 and Facebook Pixel loaded asynchronously
   - Scripts initialize after page interactive (requestIdleCallback)
   - Configuration via environment variables (no hardcoded IDs)

### Responsive Design Strategy

**Mobile-First Approach**: Design and build starting from smallest viewport (320px), progressively enhance for larger screens.

| Breakpoint | Target Devices | Layout Adjustments |
|------------|---------------|-------------------|
| Base (< 640px) | Mobile phones | Single column, stacked sections, hamburger menu |
| sm (≥ 640px) | Large phones | Two-column grids where appropriate |
| md (≥ 768px) | Tablets | Three-column grids, horizontal navigation |
| lg (≥ 1024px) | Desktops | Four-column grids, expanded white space |
| xl (≥ 1280px) | Large displays | Max-width container (1280px), centered layout |

**Touch Target Sizing**: Minimum 44×44px for all interactive elements (buttons, links, form fields) per accessibility guidelines.

**Typography Scaling**:

- Minimum body text: 16px on mobile (prevents zoom on iOS)
- Headings scale proportionally: use `clamp()` for fluid typography
- Line height: 1.5 for body text, 1.2 for headings (readability)

## Page Structure & Content Strategy

### 1. Header Section

**Purpose**: Provide persistent navigation and immediate access to contact action.

**Components**:

- Brand logo (text-based "Targetsy" initially, replaceable with image logo)
- Primary navigation menu: Services | Cases | Testimonials | About | Contact
- Optional: Contact phone/email displayed on desktop viewports
- CTA button: "Book Consultation" (optional, space permitting)

**Behavior**:

- Sticky positioning: header remains visible during scroll
- Background becomes opaque on scroll (initially transparent over hero)
- Mobile: Hamburger icon triggers slide-in navigation panel
- All navigation links scroll smoothly to corresponding section anchor
- Active section highlighted in navigation (scroll spy)

**Accessibility**:

- Semantic `<nav>` element with `aria-label="Primary navigation"`
- Skip-to-content link for keyboard users
- Focus visible states on all interactive elements

### 2. Hero Section (Above Fold)

**Purpose**: Immediately communicate value proposition and capture visitor's attention within 5 seconds.

**Strategic Messaging**:

Primary headline must answer three questions:

1. What does the agency do?
2. For whom?
3. What benefit does it provide?

**Content Elements**:

| Element | Specifications |
|---------|----------------|
| H1 Headline | 5-8 words, benefit-focused, includes primary keyword (e.g., "More Clients Through Effective Advertising") |
| Subheadline | 2-3 sentences expanding on services (Google Ads, Meta Ads, analytics, consulting), mentioning 4+ years experience and expertise across niches |
| Primary CTA Button | "Get Free Consultation" - contrasting color, minimum 48px height, prominent placement |
| Supporting Visual | Right-side or background: modern illustration or photo related to digital marketing/growth graphs (optimized WebP, lazy-loaded if below fold) |
| Trust Indicators | Optional row of client logos or certifications directly below hero (Google Partner badge, etc.) |

**Design Considerations**:

- Ample white space around headline (not cluttered)
- Headline text contrast ratio ≥4.5:1 against background
- If background image used: ensure text remains readable (overlay/gradient)
- CTA button stands out visually: use accent color distinct from brand palette

**Conversion Optimization**:

- CTA button scrolls to contact form (anchor link to `#contact`)
- Optional secondary text near CTA: "< 30 seconds to complete" to reduce friction
- If photo includes person: ensure gaze direction toward headline or CTA

### 3. Services Section

**Purpose**: Clearly articulate what the agency offers, enabling visitors to quickly understand service scope and relevance to their needs.

**Structure**: Grid of four service cards

| Service | Key Message Focus |
|---------|------------------|
| Google Ads | Brings targeted traffic ready to purchase; full management from keyword selection to budget optimization |
| Meta (Facebook/Instagram) Ads | Reaches social media audiences; increases brand awareness and generates leads; regular optimization to reduce cost-per-result |
| Web Analytics | Implements GA4, Pixel, conversion tracking; provides clear data on traffic sources and conversion costs |
| Advertising Consulting | Analyzes current advertising strategy; delivers step-by-step improvement plan including budget optimization and new channels |

**Card Components**:

- Icon or logo representing service (Google "G", Facebook/Instagram icon, analytics chart icon, lightbulb for consulting)
- Service title (H3 heading)
- Benefit-oriented description (30-40 words): emphasize client outcomes, not just features
- Optional: "Learn More" link (if dedicated service pages planned)

**Content Writing Principle**: Frame descriptions around client benefits rather than agency capabilities.

Example transformation:
- Avoid: "We set up Google Ads campaigns"
- Prefer: "Attract ready-to-buy customers through targeted Google search and display campaigns"

**Visual Design**:

- Four-column grid on desktop (≥1024px)
- Two-column on tablet (≥768px)
- Single column stack on mobile (<768px)
- Consistent card height (use flexbox or grid auto-fit)
- Sufficient padding between cards (minimum 24px gap)
- Light neutral background or white with subtle borders

### 4. About / Why Choose Targetsy Section

**Purpose**: Build credibility and differentiate from competitors by highlighting expertise, approach, and unique advantages.

**Layout**: Two-column split on desktop (single column on mobile)

**Left Column**: Brief agency introduction

- 2-3 sentences covering: years of experience (4+), team expertise, mission statement
- Mention certifications: Google Ads certified, Facebook Ads certified
- Reference market knowledge and diverse industry experience (eCommerce, education, services)
- Tone: professional yet approachable, focus on how expertise benefits client

**Right Column**: Four key differentiators with icons

| Differentiator | Content Focus |
|----------------|---------------|
| Experience Across Niches | 4+ years, 50+ projects across eCommerce, education, services sectors - understand various business specifics |
| ROI-Oriented | Optimize campaigns for key metrics (ROI, CPA, LTV) ensuring advertising generates profit, not just clicks |
| Transparency & Analytics | Provide detailed monthly reports; client knows exactly where budget went and results achieved; data-driven decisions |
| Individual Approach | Tailor advertising strategy to specific goals and budget; 24/7 support availability for questions and ideas |

**Icon Suggestions**:

- Medal/trophy for experience
- Upward arrow/growth chart for ROI focus
- Magnifying glass/dashboard for analytics
- Handshake/heart for individual approach

**Value Proposition Statement**: If agency has clear tagline/motto (e.g., "We Target Results"), feature prominently in this section.

### 5. Case Studies Section

**Purpose**: Provide concrete proof of results through real client examples, building trust and demonstrating capability.

**Presentation**: Showcase 1-3 strongest case studies

**Selection Criteria**:

- Choose cases with impressive quantifiable results
- Prefer diverse industries (shows versatility)
- Include cases potential clients can relate to

**Case Study Card Structure**:

| Component | Content Requirements |
|-----------|---------------------|
| Client Identifier | Company name (if permitted) or industry/type ("Electronics eCommerce store") |
| Challenge | 1-2 sentences: what problem client faced, why they approached agency |
| Solution | 1-2 sentences: what strategies/tactics were implemented |
| Results | Specific metrics in before/after or achievement format |
| Visual | Screenshot of growth chart, ad creative, or product image (WebP format) |
| Call-to-Action | Optional "Read Full Case Study" link (if detailed case study pages exist) |

**Metrics Presentation**:

Display numbers prominently:

- Use large font size for percentage increases or key figures
- Highlight with accent color
- Format examples: "+150% sales growth", "ROI increased 320%", "CPA reduced by 35%", "500 leads in 2 weeks"

**Example Case Structure**:

```
Case: "XYZ Shop" (Home goods eCommerce)

Challenge: Increase online sales and advertising profitability

Solution: Comprehensive Google Ads setup (Search + Remarketing) and Facebook Ads campaigns. Landing page optimization and complete analytics configuration for conversion tracking.

Results: In 4 months - sales grew +150%, advertising ROI reached 320% (vs 150% before), customer acquisition cost decreased 35%.

[Read Full Case →]
```

**Alternative Format**: If multiple cases available but space limited, present aggregate statistics:

- "50+ successful projects"
- "$1M+ in managed advertising budget"
- "Average ROI: 3x"

However, specific case narratives prove more persuasive than abstract statistics.

**Design**:

- Cards arranged in row (horizontal scroll on mobile if needed) or grid
- Visual hierarchy: numbers/metrics most prominent
- Consistent card styling matching overall site design
- Background variation (light gray) to differentiate from adjacent sections

### 6. Testimonials Section

**Purpose**: Provide social proof through authentic client feedback, building trust in service quality and partnership experience.

**Format**: 2-3 testimonial quotes

**Presentation Options**:

- Carousel/slider with automatic rotation
- Static grid displaying all simultaneously
- Single featured testimonial with navigation to others

**Testimonial Components**:

| Element | Specifications |
|---------|----------------|
| Quote Text | 1-3 sentences highlighting specific positive outcome or experience aspect |
| Client Name | Full name of person providing testimonial |
| Role & Company | Position/title and business name or industry (e.g., "Founder, Electronics.ua" or "CMO of educational platform X") |
| Photo | Headshot of client (significantly increases credibility); if unavailable, use company logo or initial avatar |
| Optional Rating | 5-star visual if collected from Google/Facebook reviews |

**Content Characteristics**:

- Authentic tone: avoid overly marketing-heavy language
- Specific rather than generic: mention concrete results or aspects of service
- Credible: real names, real companies (verifiable)

**Example Testimonials**:

> "Targetsy helped us double our lead volume in just one month! The team is very detail-oriented and provided detailed weekly reports. Highly recommend as reliable advertising partners."
> 
> **Olga Shevchenko**, Founder of online school

> "We approached them for Google Ads setup. Results exceeded expectations – advertising sales grew 60% while our budget actually decreased. Very satisfied with Targetsy collaboration!"
> 
> **Ivan Kovalenko**, Marketing Director at TechStore

**Visual Design**:

- Distinct background color (subtle brand color tint) to separate from other sections
- Quotation mark graphic or quote icon
- Each testimonial in bordered card or speech bubble style
- Client photo circular, positioned near name

**Integration with Cases**: If possible, link testimonial to corresponding case study (e.g., testimonial from client whose case is shown above, with "View Case Study" link).

### 7. Final CTA / Contact Form Section

**Purpose**: Convert informed visitors into leads by providing clear conversion path with minimal friction.

**Section Components**:

**Motivational Headline**: Direct question or statement engaging visitor

- Examples: "Ready to Increase Your Sales Through Online Advertising?"
- "Have Questions? Let's Discuss Your Project"

**Supporting Copy**: Clarify what visitor receives upon form submission

- "Submit request for free consultation, and we'll prepare an individual advertising campaign strategy for you."
- Emphasize no-obligation nature: "No spam, only business proposal"

**Contact Form**:

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| Name | Text input | Yes | Personalization |
| Email | Email input | Yes | Primary contact method |
| Phone | Tel input | Optional | Alternative contact (some prefer calls) |
| Service Interest | Select dropdown | Optional | Google Ads / Meta Ads / Analytics / Consulting / Comprehensive |
| Message | Textarea | Optional | Project details (keep optional to reduce friction) |

**Form Behavior**:

- Client-side validation: check email format, required field completion
- Visual feedback: highlight invalid fields, show checkmarks for valid entries
- Submit button: "Send Request" or "Get Consultation"
- Submission handling (initial implementation): display success message without backend integration
- Success message: "Thank you! We received your request. Our manager will contact you within 1 business day."
- Form accessibility: proper labels, error announcements for screen readers

**Alternative Contact Methods**:

Below form, provide direct contact options for users who prefer not to use forms:

- Email address (mailto: link)
- Phone number (tel: link with country code)
- Optional: Messenger app links (Telegram, Viber, Facebook Messenger) with icons - only if agency actively monitors these channels

**Design Approach**:

- Contrasting background color to draw attention (dark background with white text, or vibrant gradient)
- Large, prominent submit button in accent color
- Sufficient white space around form fields
- Visual cues directing attention to form (arrows, person gazing toward form)

**Conversion Psychology**:

- Minimize perceived effort: "< 30 seconds to complete"
- Highlight value: "Free", "No obligation", "Individual approach"
- Privacy assurance: "Your data is secure and won't be shared" + link to Privacy Policy

### 8. Footer Section

**Purpose**: Provide comprehensive site information, enable easy navigation, meet legal requirements, support SEO through internal linking.

**Footer Layout**: Multi-column structure (collapses to single column on mobile)

| Column | Content |
|--------|---------|
| Brand & Tagline | Targetsy logo/text, brief tagline or mission statement |
| Navigation | Text links to all main sections: Services, Cases, About, Contact, Privacy Policy, Terms of Use |
| Contact Information | Email (clickable mailto:), Phone (clickable tel:), Physical address if available (builds trust) |
| Social Media | Icon links to Facebook, Instagram, LinkedIn profiles (if active) |

**Legal & Trust Elements**:

- Privacy Policy link (required due to data collection via forms; must create separate page)
- Terms of Use link (optional but recommended)
- Copyright notice: "© 2025 Targetsy Agency. All rights reserved."
- Optional: Business registration details (sole proprietor number, etc.) if legally required

**Additional Features**:

- Optional newsletter signup: minimal email capture form for content updates
- Language switcher placeholder (for future English version): flag icons for UA/EN
- Optional: "Back to Top" link or button

**SEO Considerations**:

- All footer links use descriptive anchor text
- Internal links to all major sections improve site crawlability
- Contact information in footer helps local SEO (if applicable)

**Visual Design**:

- Darker background (dark gray or brand color) with light text for contrast
- Sufficient padding between columns and from edges
- Footer height responsive to content (no fixed height)
- Social media icons: consistent size, hover states
- Typography: smaller font size acceptable (14px minimum)

## Technical Requirements

### SEO Implementation

| Requirement | Implementation Details |
|-------------|------------------------|
| Title Tag | Format: "Targeted Advertising Google Facebook – Targetsy Agency" (under 60 characters, includes primary keywords) |
| Meta Description | 150-160 characters summarizing unique value proposition and services; compelling for search result clicks |
| Open Graph Tags | og:title, og:description, og:image (1200×630px), og:url, og:type for social media sharing |
| Twitter Card | twitter:card, twitter:title, twitter:description, twitter:image for Twitter/X sharing |
| Semantic HTML | H1 for hero headline (one per page), H2 for section titles, H3 for subsections; logical hierarchy |
| Image Alt Text | Descriptive alternative text for all images (e.g., "Google Ads dashboard showing campaign performance growth") |
| Sitemap | XML sitemap listing all pages (initially just homepage; expand as site grows) |
| Robots.txt | Allow all crawlers; reference sitemap location |
| Canonical URL | Specify canonical version to prevent duplicate content issues |
| Schema Markup | Optional: Organization schema with agency name, logo, contact info, social profiles |

### Accessibility Standards (WCAG 2.1 Level AA)

**Color & Contrast**:

- Text contrast ratio ≥4.5:1 for normal text, ≥3:1 for large text
- Do not rely on color alone to convey information
- Ensure accent colors meet contrast requirements against backgrounds

**Keyboard Navigation**:

- All interactive elements accessible via keyboard (Tab, Enter, Space)
- Visible focus indicators (outline or highlight) on focused elements
- Logical tab order matching visual layout
- Skip navigation link to jump to main content

**Screen Reader Support**:

- Semantic HTML5 elements (nav, main, section, article, aside, footer)
- ARIA labels where semantic HTML insufficient
- Alt text for images; empty alt for decorative images
- Form labels properly associated with inputs
- Error messages announced to screen readers

**Responsive & Zoom**:

- Content readable and functional at 200% zoom
- No horizontal scrolling on mobile viewports
- Text resizable without breaking layout

### Analytics & Tracking Integration

**Google Analytics 4**:

- Script loaded asynchronously after page interactive
- Measurement ID configured via environment variable `PUBLIC_GA4_ID`
- Track custom events: form submission, CTA clicks, phone number clicks
- Page view tracking automatic

**Facebook Pixel**:

- Script loaded asynchronously after page interactive
- Pixel ID configured via environment variable `PUBLIC_FB_PIXEL_ID`
- Track PageView event on load
- Track Lead event on form submission
- Track ViewContent events for section visibility (optional)

**Environment Variable Strategy**:

Configuration in `.env` file (not committed to version control):

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX
```

Development mode: scripts disabled or use test IDs
Production mode: actual tracking IDs loaded from environment

**Privacy Compliance**:

- Cookie consent mechanism (simple banner or opt-in before scripts load)
- Privacy Policy page explaining data collection practices
- GDPR compliance: clear information about what data is collected and why

### Form Handling Strategy

**Phase 1 - Client-Side Only** (Initial Implementation):

- Form validation entirely in browser using JavaScript
- No backend submission
- On submit: display success message, optionally email data to client using mailto: or store locally
- Purpose: demonstrate interface and user flow without backend infrastructure

**Validation Rules**:

| Field | Validation |
|-------|-----------|
| Name | Required, minimum 2 characters, letters and spaces only |
| Email | Required, valid email format (regex: RFC 5322 compliant) |
| Phone | Optional, validate format if provided (international format with country code) |
| Message | Optional, maximum length (e.g., 500 characters) |

**Error Handling**:

- Real-time validation on field blur or form submit
- Display error message below invalid field
- Prevent form submission until all required fields valid
- Highlight invalid fields with red border
- Show checkmark or green border for valid fields

**Phase 2 - Backend Integration** (Future Enhancement):

Documentation in README should explain:

- How to connect form to backend API endpoint
- Expected request format (JSON with form field data)
- Recommended backend solutions (Netlify Forms, Formspree, custom API)
- Where to modify submission handler in code

### Performance Optimization Details

**Image Optimization Workflow**:

1. Source images provided in any format (JPEG, PNG)
2. Convert to WebP using build tool or manual converter
3. Generate multiple sizes for responsive loading: small (mobile), medium (tablet), large (desktop)
4. Store in `public/images/` directory with descriptive names
5. Reference using Astro Image component with automatic optimization

**Lazy Loading Implementation**:

- Native browser lazy loading: `loading="lazy"` attribute on img tags below fold
- Intersection Observer polyfill for older browsers (if needed)
- Eager load only hero image and critical above-fold visuals
- Lazy load all service icons, case study images, testimonial photos, footer elements

**Font Strategy**:

Option 1 - System Fonts (Recommended for maximum performance):

```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
```

Option 2 - Custom Fonts (if brand requires):

- Use variable font to reduce requests
- Preload font files in document head
- Subset to Latin and Cyrillic characters only
- Apply `font-display: swap` to prevent FOIT (flash of invisible text)

**CSS Loading**:

- Critical CSS (above-fold styles) inlined in `<head>`
- Non-critical CSS loaded asynchronously
- Tailwind automatically purges unused styles during production build
- Target final CSS bundle: < 20KB gzipped

**JavaScript Loading**:

- No JavaScript required for initial page render
- Interactive features loaded as separate chunks
- Smooth scroll behavior can use CSS `scroll-behavior: smooth` (fallback JS for older browsers)
- Form validation script loads only if form in viewport
- Analytics scripts deferred until after page load complete

**Third-Party Script Loading**:

```javascript
// Load after page interactive
if ('requestIdleCallback' in window) {
  requestIdleCallback(loadAnalytics);
} else {
  setTimeout(loadAnalytics, 2000);
}
```

**Performance Monitoring**:

After deployment, measure with:

- Google PageSpeed Insights (mobile and desktop)
- WebPageTest (test from multiple locations)
- Chrome DevTools Lighthouse
- Chrome DevTools Performance panel

Target metrics:

- Mobile Lighthouse Performance: ≥90
- Desktop Lighthouse Performance: ≥95
- Cumulative Layout Shift: <0.1
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s

## Design System Specifications

### Color Palette

Designer to define final palette; recommendations:

| Color Type | Purpose | Suggestions |
|------------|---------|-------------|
| Primary Brand | Main brand identity, headers, accents | Calm blue (#2563EB) or green (#059669) to convey trust |
| Secondary Brand | Supporting elements, backgrounds | Lighter tint of primary (20% opacity) |
| Accent CTA | Buttons, important calls-to-action | High contrast orange (#EA580C) or red (#DC2626) |
| Neutral Dark | Body text, dark backgrounds | Near-black (#1F2937) for text readability |
| Neutral Light | Page backgrounds, white space | White (#FFFFFF) or very light gray (#F9FAFB) |
| Success | Form validation, positive indicators | Green (#10B981) |
| Error | Form errors, warnings | Red (#EF4444) |

**Contrast Requirements**: All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large).

### Typography Scale

| Element | Desktop Size | Mobile Size | Weight | Line Height |
|---------|-------------|-------------|--------|-------------|
| H1 (Hero headline) | 48-56px | 32-40px | Bold (700) | 1.1 |
| H2 (Section titles) | 36-42px | 28-32px | Bold (700) | 1.2 |
| H3 (Subsection titles) | 24-28px | 20-24px | Semibold (600) | 1.3 |
| Body text | 18px | 16px | Regular (400) | 1.5 |
| Small text (footer) | 14px | 14px | Regular (400) | 1.4 |
| Button text | 16-18px | 16px | Medium (500) | 1 |

**Fluid Typography**: Use `clamp()` function for smooth scaling between breakpoints.

Example: `font-size: clamp(2rem, 5vw, 3.5rem);` for H1

### Spacing System

Based on 4px base unit (Tailwind default):

- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)

**Section Padding**: Vertical padding between major sections: 64-96px (desktop), 48-64px (mobile)

**White Space Philosophy**: Generous spacing between elements to prevent overwhelmed appearance; every section should "breathe."

### Component Specifications

**Buttons**:

| State | Specifications |
|-------|----------------|
| Default | Min height 48px, padding 12px 32px, rounded corners 6px, solid background in accent color |
| Hover | Darken background 10%, subtle scale transform (1.02), transition 200ms |
| Focus | Visible outline 2px offset, meets accessibility standards |
| Active | Slightly darken further, scale down (0.98) |
| Disabled | 50% opacity, cursor not-allowed, no hover effects |

**Form Fields**:

- Height: 48px (tap target size)
- Border: 1px solid neutral gray, 2px on focus in primary color
- Border radius: 4px
- Padding: 12px 16px
- Font size: 16px (prevents zoom on iOS)
- Label above field, error message below field in red

**Cards** (services, cases, testimonials):

- Background: white or light gray
- Border: 1px solid light gray or subtle shadow
- Border radius: 8px
- Padding: 24px
- Hover effect (optional): lift with shadow, transition 300ms

### Animation Guidelines

**Principle**: Subtle, purposeful animations that enhance UX without distracting.

Permitted animations:

- Smooth scroll to anchors (800ms duration, ease-in-out)
- Button hover states (200ms transition)
- Card hover lifts (300ms transition)
- Form field focus states (150ms transition)
- Fade-in on scroll for sections (optional, using Intersection Observer)

Prohibited:

- Autoplaying videos with sound
- Excessive parallax effects
- Spinning or bouncing elements without user initiation
- Animations longer than 500ms without user control

**Reduced Motion**: Respect `prefers-reduced-motion` media query; disable decorative animations for users who prefer reduced motion.

## Content Migration Strategy

All Ukrainian text from technical specification PDF must be extracted and organized into `src/content/home-uk.json`.

**JSON Structure**:

```
{
  "metadata": {
    "title": "...",
    "description": "...",
    "ogTitle": "...",
    "ogDescription": "..."
  },
  "header": {
    "logo": "Targetsy",
    "nav": [...],
    "cta": "..."
  },
  "hero": {
    "headline": "...",
    "subheadline": "...",
    "cta": "..."
  },
  "services": {
    "title": "...",
    "items": [
      {
        "title": "...",
        "description": "...",
        "icon": "..."
      }
    ]
  },
  "about": {
    "title": "...",
    "intro": "...",
    "advantages": [...]
  },
  "cases": {
    "title": "...",
    "items": [...]
  },
  "testimonials": {
    "title": "...",
    "items": [...]
  },
  "cta": {
    "headline": "...",
    "subheadline": "...",
    "form": {...}
  },
  "footer": {...}
}
```

**Content Extraction Guidelines**:

- Maintain original Ukrainian language exactly as specified
- Preserve all brand messaging, value propositions, service descriptions
- Ensure numbers, metrics, and case study data transferred accurately
- Review for grammar and absence of Russian language influences (as per spec requirement)

## Project Deliverables

### File Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── About.astro
│   │   ├── Cases.astro
│   │   ├── Testimonials.astro
│   │   ├── ContactCTA.astro
│   │   └── Footer.astro
│   ├── content/
│   │   └── home-uk.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── scripts/
│   │   ├── smoothScroll.ts
│   │   ├── formValidation.ts
│   │   └── analytics.ts
│   ├── styles/
│   │   └── global.css
│   └── pages/
│       └── index.astro
├── public/
│   ├── images/
│   ├── icons/
│   ├── robots.txt
│   └── sitemap.xml
├── .env.example
├── .gitignore
├── astro.config.mjs
├── package.json
├── tailwind.config.cjs
├── tsconfig.json
└── README.md
```

### README Documentation Content

Must include:

1. **Quick Start Instructions**:
   - Prerequisites (Node.js version)
   - Installation commands (npm install)
   - Development server command (npm run dev)
   - Build command (npm run build)
   - Preview production build (npm run preview)

2. **Content Editing Guide**:
   - How to update Ukrainian text (edit `src/content/home-uk.json`)
   - How to replace images (location in `public/images/`)
   - How to modify color scheme (edit `tailwind.config.cjs`)
   - How to adjust typography (edit Tailwind theme)

3. **Analytics Integration**:
   - Copy `.env.example` to `.env`
   - Add Google Analytics 4 Measurement ID
   - Add Facebook Pixel ID
   - Where to find these IDs in respective platforms

4. **Form Backend Integration**:
   - Current behavior (client-side validation only)
   - How to connect to backend API
   - Code file location to modify (`src/components/ContactCTA.astro`)
   - Example API endpoint configuration
   - Recommended services (Netlify Forms, Formspree, custom)

5. **Deployment Guide**:
   - Recommended hosting platforms (Netlify, Vercel, Cloudflare Pages)
   - Environment variable configuration in hosting dashboard
   - Build settings (build command, publish directory)
   - Custom domain setup

6. **Performance Checklist**:
   - How to test Lighthouse score
   - Image optimization recommendations
   - When to regenerate sitemap

7. **Future Enhancements**:
   - Adding English language version (create `home-en.json`, implement language switcher)
   - Creating dedicated service pages
   - Implementing blog section
   - Advanced analytics event tracking

## Quality Assurance Checklist

### Pre-Launch Testing

**Performance**:

- [ ] Lighthouse mobile score ≥90
- [ ] Lighthouse desktop score ≥95
- [ ] Cumulative Layout Shift <0.1
- [ ] All images optimized to WebP
- [ ] Images lazy-loaded except above-fold
- [ ] No render-blocking resources
- [ ] Total page size <2MB

**Functionality**:

- [ ] All navigation links scroll to correct sections
- [ ] Smooth scrolling works on all browsers
- [ ] Form validation works for all fields
- [ ] Form displays success message on submit
- [ ] All external links open in new tab
- [ ] Phone/email links work correctly (tel:, mailto:)
- [ ] No console errors in browser

**Responsive Design**:

- [ ] Test on iPhone SE (375px)
- [ ] Test on iPhone 12 Pro (390px)
- [ ] Test on iPad (768px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] No horizontal scroll on any viewport
- [ ] All text readable at minimum size
- [ ] Touch targets ≥44px on mobile

**Accessibility**:

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Screen reader navigation logical
- [ ] Form labels properly associated
- [ ] No reliance on color alone for info

**SEO**:

- [ ] Title tag present and optimized
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] H1 tag present (only one)
- [ ] Heading hierarchy logical (H1→H2→H3)
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] Canonical URL set

**Browser Compatibility**:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Content**:

- [ ] All Ukrainian text reviewed for accuracy
- [ ] No Russian language remnants
- [ ] Contact information correct
- [ ] Social media links active
- [ ] Privacy policy page exists
- [ ] Copyright year current

### Post-Launch Monitoring

- Monitor Google Analytics for traffic patterns
- Review Lighthouse scores weekly
- Check form submission success rate
- Monitor console for JavaScript errors
- Review Core Web Vitals in Google Search Console
- Gather user feedback on experience
- A/B test different CTA copy variations

## Risk Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|-------------------|
| Poor mobile performance | High | Strict image optimization, minimal JavaScript, mobile-first testing throughout development |
| High CLS score | High | Define explicit dimensions for all images, reserve space for late-loading content, avoid injected ads |
| Form spam submissions | Medium | Add honeypot field (hidden from users, bots fill it), implement rate limiting when backend connected |
| Analytics not tracking | Medium | Test in production environment, verify events in Analytics dashboard, document setup clearly |
| Accessibility violations | Medium | Use automated tools (axe DevTools, WAVE), manual keyboard testing, screen reader testing |
| Content management difficulty | Low | Clear documentation in README, structured JSON content file, component abstraction |
| Slow time-to-interactive | Medium | Defer all non-critical JavaScript, lazy-load analytics, minimize third-party scripts |

## Success Metrics

**Performance Benchmarks**:

- Lighthouse Performance Score: ≥90 (mobile), ≥95 (desktop)
- Cumulative Layout Shift: <0.1
- Largest Contentful Paint: <2.5s
- First Input Delay: <100ms
- Total Blocking Time: <200ms

**User Engagement**:

- Average time on page: >2 minutes (indicates content engagement)
- Scroll depth: >70% of users scroll past hero section
- Bounce rate: <50%
- Form submission rate: >3% of total visitors

**Technical Quality**:

- Zero console errors in production
- All accessibility audits pass
- 100% of images in WebP format
- HTML validates without errors
- Cross-browser compatibility confirmed

## Future Expansion Considerations

**Multi-language Support**:

- Create `home-en.json` for English content
- Implement language detection and switcher component
- Add language prefix to URLs or use subdomain strategy
- Duplicate meta tags for each language

**Blog Integration**:

- Add `/blog` route with Astro content collections
- Create blog post layout template
- Implement article listing and pagination
- Add RSS feed for subscribers

**Dedicated Service Pages**:

- Create individual pages for each service (/services/google-ads, etc.)
- Expand service descriptions with detailed processes
- Add specific case studies per service
- Include service-specific FAQ sections

**Advanced Analytics**:

- Heat mapping integration (Hotjar, Clarity)
- Enhanced event tracking (scroll depth, video plays, etc.)
- Conversion funnel analysis
- User session recording for UX insights

**CMS Integration**:

- Evaluate headless CMS options (Sanity, ContentfulDatoCMS)
- Migrate JSON content to CMS for non-technical editing
- Implement webhook-based rebuilds on content changes

This design provides a comprehensive strategic blueprint for building the Targetsy.agency landing page that balances performance, conversion optimization, and user experience while maintaining technical excellence and future scalability.
