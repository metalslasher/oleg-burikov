# Targetsy Agency Landing Page

Modern, high-performance landing page for Targetsy.agency – a digital advertising agency specializing in Google Ads, Meta Ads, analytics, and consulting.

## 🚀 Tech Stack

- **Astro** - Static site framework optimized for performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling framework
- **Mobile-First** - Optimized for all devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (comes with Node.js)

Download Node.js from: https://nodejs.org/

To verify installation, run:
```bash
node --version
npm --version
```

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 📝 Content Editing

All Ukrainian content is centralized in a single JSON file for easy editing.

### Edit Text Content

1. Open `src/content/home-uk.json`
2. Find the section you want to edit (hero, services, about, cases, testimonials, cta, footer)
3. Update the text directly in the JSON file
4. Save the file - changes will appear automatically in development mode

**Example - Updating Hero Headline:**

```json
{
  "hero": {
    "headline": "Your New Headline Here",
    "subheadline": "Your new description..."
  }
}
```

### Adding or Editing Case Studies

In `src/content/home-uk.json`, find the `cases` section:

```json
{
  "cases": {
    "items": [
      {
        "client": "Client Name",
        "industry": "Industry Type",
        "challenge": "What problem needed solving",
        "solution": "How you solved it",
        "results": [
          { "metric": "Sales", "value": "+150%", "period": "in 4 months" }
        ],
        "image": "case-image.jpg"
      }
    ]
  }
}
```

Add new items to the array or edit existing ones.

### Adding Testimonials

In `src/content/home-uk.json`, find the `testimonials` section:

```json
{
  "testimonials": {
    "items": [
      {
        "quote": "Client testimonial text",
        "author": "Client Name",
        "role": "Position",
        "company": "Company Name",
        "image": "testimonial-photo.jpg"
      }
    ]
  }
}
```

## 🎨 Design Customization

### Changing Colors

Edit `tailwind.config.cjs` to customize the color scheme:

```javascript
colors: {
  primary: {
    600: '#2563eb', // Main brand color
  },
  accent: {
    600: '#ea580c', // CTA button color
  },
}
```

**Primary Color** - Used for navigation, headings, icons (default: blue)
**Accent Color** - Used for call-to-action buttons (default: orange)

After changing colors, the entire site will update automatically.

### Changing Typography

In `tailwind.config.cjs`, modify the `fontFamily`:

```javascript
fontFamily: {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    // Add your custom font here
  ],
},
```

For custom fonts:
1. Add font files to `public/fonts/`
2. Import in `src/styles/global.css`
3. Update `tailwind.config.cjs` fontFamily

### Adjusting Spacing

Modify spacing scale in `tailwind.config.cjs`:

```javascript
spacing: {
  '18': '4.5rem', // Custom spacing values
}
```

## 🖼️ Managing Images

### Image Locations

- **Hero image**: `public/images/hero-image.webp`
- **Case study images**: `public/images/case-*.webp`
- **Testimonial photos**: `public/images/testimonial-*.webp`
- **Icons**: `public/icons/*.svg`

### Image Optimization Guidelines

1. **Convert to WebP format** for best compression
   - Use online tools like https://squoosh.app/
   - Or command line: `cwebp input.jpg -q 85 -o output.webp`

2. **Recommended dimensions**:
   - Hero image: 1200×1200px
   - Case study images: 800×600px
   - Testimonial photos: 400×400px

3. **File naming**:
   - Use descriptive names: `case-ecommerce-store.webp`
   - Match filename in `home-uk.json`

4. **Lazy loading**: All images below the fold are automatically lazy-loaded

### Replacing Placeholder Images

1. Save your optimized WebP image to `public/images/`
2. Update the filename in `src/content/home-uk.json`:

```json
{
  "cases": {
    "items": [
      {
        "image": "your-new-image.webp"
      }
    ]
  }
}
```

## 📊 Analytics Integration

### Google Analytics 4 Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your GA4 Measurement ID:
   - Go to https://analytics.google.com/
   - Navigate to **Admin** → **Data Streams**
   - Select your web stream
   - Copy the **Measurement ID** (format: G-XXXXXXXXXX)

3. Add to `.env`:
   ```
   PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

### Facebook Pixel Setup

1. Get your Pixel ID:
   - Go to https://business.facebook.com/events_manager/
   - Navigate to **Data Sources** → **Pixels**
   - Copy your **Pixel ID** (numeric value)

2. Add to `.env`:
   ```
   PUBLIC_FB_PIXEL_ID=1234567890123456
   ```

### Testing Analytics

After adding IDs:
1. Restart development server (`npm run dev`)
2. Open browser developer console
3. Check for analytics initialization messages
4. Use browser extensions to verify:
   - **GA Debugger** for Google Analytics
   - **Facebook Pixel Helper** for FB Pixel

**Note**: Analytics scripts load after page interactive to maintain performance.

## 📧 Form Backend Integration

### Current Behavior

The contact form currently:
- ✅ Validates inputs client-side
- ✅ Shows success message
- ❌ Does NOT send data to a backend (no backend configured)

### Connecting to a Backend

#### Option 1: Netlify Forms (Easiest)

1. Deploy to Netlify
2. Edit `src/components/ContactCTA.astro`
3. Add `netlify` attribute to form:
   ```html
   <form id="contact-form" netlify>
   ```
4. Netlify automatically handles submissions

#### Option 2: Formspree

1. Sign up at https://formspree.io/
2. Get your form endpoint
3. Edit `src/components/ContactCTA.astro`
4. Update form action:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option 3: Custom API

Edit `src/scripts/formValidation.ts`, find the `handleSubmit` method:

```typescript
private handleSubmit(e: Event) {
  e.preventDefault();

  const validation = this.validateForm();
  if (!validation.isValid) {
    return;
  }

  // Get form data
  const formData = new FormData(this.form);
  const data: any = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // REPLACE THIS SECTION with your API call
  fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(() => {
      this.showMessage(this.successMessage, 'success');
      this.form.reset();
    })
    .catch(() => {
      this.showMessage(this.errorMessage, 'error');
    });
}
```

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. Push code to GitHub/GitLab
2. Go to https://netlify.com/
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables in Netlify dashboard:
   - `PUBLIC_GA4_ID`
   - `PUBLIC_FB_PIXEL_ID`
7. Deploy!

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/
3. Import your repository
4. Build settings (auto-detected for Astro):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables
6. Deploy!

### Deploy to Cloudflare Pages

1. Push code to GitHub
2. Go to https://dash.cloudflare.com/
3. Pages → Create a project
4. Connect repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
6. Add environment variables
7. Deploy!

### Custom Domain Setup

After deploying:
1. In your hosting dashboard, go to Domain settings
2. Add your custom domain: `targetsy.agency`
3. Update DNS records as instructed
4. Enable HTTPS (usually automatic)
5. Update `public/sitemap.xml` with your domain

## ⚡ Performance Optimization

### Lighthouse Score Goals

- **Performance**: ≥90 (mobile), ≥95 (desktop)
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Testing Performance

1. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

2. Open Chrome DevTools
3. Go to **Lighthouse** tab
4. Run audit for **Mobile** and **Desktop**

### Performance Checklist

- ✅ Images optimized to WebP
- ✅ Images lazy-loaded below fold
- ✅ CSS minimized and purged
- ✅ JavaScript deferred
- ✅ Analytics loaded after page interactive
- ✅ Fonts use system stack (no external font loading)
- ✅ No render-blocking resources

### If Performance is Low

1. **Check image sizes**: Ensure all images are under 200KB
2. **Verify WebP format**: Convert any remaining JPG/PNG
3. **Minimize custom CSS**: Use Tailwind utilities instead
4. **Limit third-party scripts**: Each script impacts performance

## 🎯 SEO Configuration

### Meta Tags

Edit in `src/content/home-uk.json`:

```json
{
  "metadata": {
    "title": "Your Page Title - Up to 60 characters",
    "description": "Page description - up to 160 characters for search results",
    "ogTitle": "Social media share title",
    "ogDescription": "Social media share description"
  }
}
```

### Updating Sitemap

After adding new pages, edit `public/sitemap.xml`:

```xml
<url>
  <loc>https://targetsy.agency/new-page/</loc>
  <lastmod>2025-01-01</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Testing SEO

1. Use Google Search Console: https://search.google.com/search-console/
2. Submit your sitemap
3. Check for indexing issues
4. Monitor search performance

## 🌐 Adding English Version (Future)

1. Create `src/content/home-en.json` (copy from home-uk.json and translate)
2. Add language switcher to header
3. Create route for English version:
   - Option A: `/en/` subdirectory
   - Option B: Use subdomain `en.targetsy.agency`
4. Update `BaseLayout.astro` to accept language prop
5. Load content dynamically based on language

## 🛠️ Troubleshooting

### Node.js Not Found

**Error**: `'node' is not recognized as a command`

**Solution**: 
1. Download and install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify: `node --version`

### Port Already in Use

**Error**: `Port 4321 is already in use`

**Solution**:
```bash
# Use different port
npm run dev -- --port 3000
```

### Build Errors

**Error**: TypeScript compilation errors

**Solution**:
1. Delete `node_modules` and `.astro` directories
2. Reinstall:
   ```bash
   npm install
   ```
3. Rebuild:
   ```bash
   npm run build
   ```

### Styling Not Applied

**Issue**: Tailwind classes not working

**Solution**:
1. Ensure file is saved
2. Check for typos in class names
3. Restart dev server
4. Clear browser cache (Ctrl+Shift+R)

## 📚 Project Structure

```
targetsy-agency/
├── public/              # Static assets
│   ├── images/          # Image files (WebP)
│   ├── icons/           # SVG icons
│   ├── favicon.svg      # Site favicon
│   ├── robots.txt       # Search engine directives
│   └── sitemap.xml      # Site structure for SEO
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── About.astro
│   │   ├── Cases.astro
│   │   ├── Testimonials.astro
│   │   ├── ContactCTA.astro
│   │   └── Footer.astro
│   ├── content/         # Content files
│   │   └── home-uk.json # Ukrainian content
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/           # Route pages
│   │   └── index.astro  # Homepage
│   ├── scripts/         # TypeScript modules
│   │   ├── smoothScroll.ts
│   │   ├── formValidation.ts
│   │   └── analytics.ts
│   └── styles/          # Global styles
│       └── global.css
├── .env                 # Environment variables (create from .env.example)
├── .env.example         # Environment template
├── astro.config.mjs     # Astro configuration
├── tailwind.config.cjs  # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 📞 Support

For questions or issues:
- **Email**: info@targetsy.agency
- **Documentation**: https://docs.astro.build/

## 🔄 Updates and Maintenance

### Updating Dependencies

Check for updates:
```bash
npm outdated
```

Update all packages:
```bash
npm update
```

### Monthly Checklist

- [ ] Update case studies with latest client results
- [ ] Add new testimonials
- [ ] Check analytics data
- [ ] Run Lighthouse audit
- [ ] Update sitemap lastmod dates
- [ ] Review and respond to form submissions

## 📄 License

Copyright © 2025 Targetsy Agency. All rights reserved.

---

**Built with** ❤️ **using Astro + TypeScript + Tailwind CSS**
