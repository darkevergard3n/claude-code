# IT Vendor Solutions - Company Profile Website

A high-performance, SEO-optimized company profile website built with Astro, TypeScript, and Tailwind CSS. Designed for IT service providers specializing in security, infrastructure, implementation, and maintenance.

## 🚀 Tech Stack

### Framework & Language
- **Astro 4.x** - Static Site Generator
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Why This Stack?

#### Astro
- **Ultra-fast performance**: Ships zero JavaScript by default, only loads what's needed
- **Perfect for content sites**: Designed specifically for company profiles and marketing sites
- **Built-in optimizations**: Automatic image optimization, CSS minification, and HTML compression
- **Excellent SEO**: Pre-rendered static HTML is crawler-friendly
- **Sub-second load times**: Typically loads in under 1 second

#### TypeScript
- **Type safety**: Catch errors during development, not production
- **Better developer experience**: IntelliSense, autocomplete, and refactoring support
- **Maintainability**: Easier to maintain and scale as the project grows

#### Tailwind CSS
- **Minimal bundle size**: Only includes CSS that's actually used
- **Responsive design**: Built-in responsive utilities
- **Fast development**: Utility classes speed up development
- **Consistent design**: Design system built into the framework

## ✨ Features

### Performance
- ⚡ **<3 second load time** (typically <1s)
- 🗜️ **Optimized images** with WebP/AVIF support
- 📦 **Minified CSS and JS**
- 🚀 **Static site generation** for maximum speed
- 💾 **Browser caching strategy** via HTTP headers

### SEO & Analytics
- 🔍 **Meta tags** for all pages
- 📊 **Structured data** (JSON-LD schema.org)
- 🖼️ **Open Graph** and Twitter Card support
- 🗺️ **XML sitemap** (auto-generated)
- 🤖 **robots.txt** configuration
- 📈 **Google Analytics 4** integration
- 🎯 **Page indexing strategy**

### Design
- 📱 **Fully responsive** (mobile, tablet, desktop)
- ♿ **Accessible** (semantic HTML, ARIA labels)
- 🎨 **Modern UI** with gradient accents
- 🌙 **Professional color scheme**

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your values
# - Update PUBLIC_SITE_URL with your domain
# - Add your Google Analytics Measurement ID
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Server runs at http://localhost:4321
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
/
├── public/              # Static assets
│   ├── images/         # Images (add your images here)
│   ├── favicon.svg     # Site favicon
│   └── robots.txt      # Search engine crawler rules
├── src/
│   ├── components/     # Reusable components
│   │   ├── Analytics.astro    # GA4 integration
│   │   ├── SEO.astro          # SEO meta tags & structured data
│   │   ├── Header.astro       # Site header & navigation
│   │   └── Footer.astro       # Site footer
│   ├── layouts/
│   │   └── Layout.astro       # Base page layout
│   ├── pages/          # Page routes
│   │   ├── index.astro        # Homepage
│   │   ├── services.astro     # Services page
│   │   ├── about.astro        # About page
│   │   └── contact.astro      # Contact page
│   └── styles/
│       └── global.css         # Global styles & Tailwind
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🖼️ Image Optimization Strategy

### Built-in Astro Image Optimization

Astro automatically optimizes images for you:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Description"
  width={1200}
  height={630}
  loading="lazy"
  format="webp"
/>
```

### Image Best Practices

1. **Use modern formats**: WebP, AVIF for smaller file sizes
2. **Lazy loading**: Images load as user scrolls
3. **Responsive images**: Different sizes for different screens
4. **Proper dimensions**: Specify width and height to prevent layout shift
5. **Optimize before upload**: Use tools like ImageOptim, Squoosh

### Recommended Image Sizes

- **Hero images**: 1920x1080px (16:9)
- **Service cards**: 800x600px (4:3)
- **Team photos**: 400x400px (1:1)
- **Icons/logos**: SVG (scalable, small file size)

### Adding Images

```bash
# Place images in public/images/
public/images/hero.jpg
public/images/services/security.jpg
public/images/team/john-doe.jpg
```

Then reference in your code:
```astro
<img src="/images/hero.jpg" alt="Hero" loading="lazy" />
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (automatic)

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Deploy (automatic)

```bash
# Or use Netlify CLI
npm i -g netlify-cli
netlify deploy --prod
```

### Other Platforms

Works on any static hosting:
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront
- DigitalOcean App Platform

## ⚙️ Configuration

### Update Site Information

1. **Site URL**: Edit `astro.config.mjs`
```js
site: 'https://your-domain.com'
```

2. **Company Details**: Edit components and pages:
   - `src/components/Footer.astro` - Contact info
   - `src/components/SEO.astro` - Default structured data
   - `src/pages/about.astro` - Team and company info

3. **Analytics**: Add your GA4 Measurement ID to `.env`
```
PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ID-HERE
```

### Caching Strategy

The website uses aggressive caching for performance:

- **Static assets** (JS, CSS, images): 1 year cache
- **HTML**: No cache (always fresh)
- **Fonts**: 1 year cache

Configured in:
- `vercel.json` for Vercel deployments
- `netlify.toml` for Netlify deployments

### SEO Configuration

Each page has SEO metadata:

```astro
<Layout
  title="Page Title - IT Vendor Solutions"
  description="Page description for search engines"
  ogImage="/images/og-image.jpg"
/>
```

### Contact Form

The contact form currently simulates submission. To make it functional:

1. **Option 1: Formspree**
```astro
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

2. **Option 2: Netlify Forms**
```astro
<form name="contact" netlify>
```

3. **Option 3: Custom API**
Update the fetch call in `contact.astro` to your endpoint

## 📊 Performance Metrics

Expected performance (tested with Lighthouse):

- ⚡ **Performance**: 95-100
- ♿ **Accessibility**: 95-100
- 🔍 **SEO**: 100
- ✅ **Best Practices**: 95-100

### Optimization Features

1. **Browser Caching**: Static assets cached for 1 year
2. **Image Optimization**: WebP/AVIF with lazy loading
3. **CSS Minification**: Tailwind purges unused CSS
4. **HTML Compression**: Astro compresses HTML output
5. **Preconnect**: DNS prefetch for external resources
6. **No JavaScript**: Zero JS shipped for static content

## 🔒 Security Headers

Security headers configured in `vercel.json` and `netlify.toml`:

- `X-Frame-Options`: Prevent clickjacking
- `X-Content-Type-Options`: Prevent MIME sniffing
- `X-XSS-Protection`: XSS protection
- `Referrer-Policy`: Control referrer information
- `Permissions-Policy`: Disable unnecessary browser features

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs` to change the color scheme:

```js
colors: {
  primary: { /* Your brand colors */ },
  secondary: { /* Your secondary colors */ },
}
```

### Fonts

Edit `src/layouts/Layout.astro` to change fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet" />
```

Then update `tailwind.config.mjs`:

```js
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
}
```

## 📝 Content Management

To update content:

1. **Homepage**: Edit `src/pages/index.astro`
2. **Services**: Edit `src/pages/services.astro`
3. **About**: Edit `src/pages/about.astro`
4. **Contact**: Edit `src/pages/contact.astro`

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear Astro cache
rm -rf .astro node_modules
npm install
npm run build
```

### Images Not Optimizing

- Ensure images are in `public/` or imported from `src/`
- Check file extensions (.jpg, .png, .webp)
- Verify Astro version is 4.x+

### Slow Build Times

- Optimize large images before upload
- Use `.astro` files for static content
- Minimize JavaScript usage

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

MIT License - feel free to use this template for your projects.

## 🤝 Support

For issues or questions:
- Check [Astro Discord](https://astro.build/chat)
- Review [Astro GitHub Issues](https://github.com/withastro/astro/issues)

---

Built with ❤️ using Astro, TypeScript, and Tailwind CSS
