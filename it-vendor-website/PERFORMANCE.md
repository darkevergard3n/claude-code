# Performance Optimization Guide

This guide ensures your IT Vendor website achieves **<3 second load times** and optimal performance scores.

## 🎯 Performance Goals

- **Load Time**: <3 seconds (target: <1 second)
- **Lighthouse Performance**: 95-100
- **First Contentful Paint (FCP)**: <1.8s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **Time to Interactive (TTI)**: <3.8s

---

## ✅ Performance Checklist

### 🖼️ Image Optimization

#### **Pre-Upload Optimization**
- [ ] Compress images with ImageOptim, Squoosh, or TinyPNG
- [ ] Target file sizes:
  - Hero images: <200KB
  - Service cards: <100KB
  - Icons: <20KB (or use SVG)
- [ ] Remove EXIF data
- [ ] Use correct dimensions (don't upload 4K images for 400px displays)

#### **Format Selection**
- [ ] Use **WebP** or **AVIF** for photos (70-80% smaller than JPEG)
- [ ] Use **SVG** for logos, icons, and illustrations
- [ ] Use **PNG** only for images requiring transparency (if no WebP support)
- [ ] Avoid **GIF** (use video or WebP instead)

#### **Implementation**
```astro
<!-- ✅ Good: Modern format with lazy loading -->
<img
  src="/images/hero.webp"
  alt="Description"
  width="1200"
  height="630"
  loading="lazy"
/>

<!-- ✅ Better: Astro Image component (auto-optimization) -->
---
import { Image } from 'astro:assets';
import hero from '../images/hero.jpg';
---
<Image
  src={hero}
  alt="Description"
  format="webp"
  quality={80}
  loading="lazy"
/>

<!-- ❌ Bad: Large JPEG, no lazy loading -->
<img src="/images/huge-photo.jpg" alt="Description" />
```

#### **Lazy Loading**
```astro
<!-- Lazy load all images except above-the-fold -->
<img loading="lazy" ... />

<!-- Eager load hero image (above-the-fold) -->
<img loading="eager" ... />
```

#### **Responsive Images**
```astro
<img
  srcset="
    /images/hero-400.webp 400w,
    /images/hero-800.webp 800w,
    /images/hero-1200.webp 1200w
  "
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  src="/images/hero-1200.webp"
  alt="Hero"
  loading="lazy"
/>
```

---

### 🗜️ Caching Strategy

#### **Browser Caching** (Already Configured)

**Configured in `vercel.json` and `netlify.toml`:**

| Resource Type | Cache Duration | Why |
|---------------|----------------|-----|
| HTML | 0 (no cache) | Always fresh content |
| CSS/JS | 1 year | Immutable, versioned files |
| Images | 1 year | Static, rarely change |
| Fonts | 1 year | Static |

#### **Verify Caching**

```bash
# Check cache headers
curl -I https://your-domain.com/assets/main.css

# Should see:
Cache-Control: public, max-age=31536000, immutable
```

#### **CDN Caching**

Vercel, Netlify, and Cloudflare automatically cache at edge locations:
- ✅ Global distribution
- ✅ Fast response times worldwide
- ✅ Automatic cache invalidation on deploy

---

### 📦 Asset Optimization

#### **CSS Optimization**

**Tailwind CSS auto-purges unused styles:**

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Only includes CSS actually used in these files
}
```

**Result:**
- Without purge: ~3MB CSS
- With purge: <10KB CSS

#### **JavaScript Optimization**

**Astro ships zero JS by default:**
```astro
<!-- ✅ This generates pure HTML, no JS -->
<div class="card">
  <h2>{title}</h2>
  <p>{description}</p>
</div>
```

**Only add JS when needed:**
```astro
<!-- Only this button gets JS -->
<button id="menu-toggle">Menu</button>

<script>
  // This JS is bundled, minified, and only loaded once
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    // ...
  });
</script>
```

#### **Font Optimization**

**Preconnect to Google Fonts:**
```html
<!-- Already in Layout.astro -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Use `font-display: swap`:**
```css
/* Prevent invisible text during font load */
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
```

**Or use system fonts (fastest):**
```js
// tailwind.config.mjs
fontFamily: {
  sans: ['system-ui', '-apple-system', 'sans-serif'],
}
```

---

### ⚡ Code Optimization

#### **HTML Compression**

**Already enabled in `astro.config.mjs`:**
```js
export default defineConfig({
  compressHTML: true,
});
```

#### **CSS Minification**

**Automatic via Vite:**
```js
vite: {
  build: {
    cssMinify: true,
  },
}
```

#### **Remove Unused Code**

```bash
# Check bundle size
npm run build

# Analyze what's in your bundle
npx astro build --analyze
```

---

### 🚀 Loading Strategy

#### **Resource Hints**

```html
<!-- DNS Prefetch (early DNS resolution) -->
<link rel="dns-prefetch" href="https://www.google-analytics.com" />

<!-- Preconnect (early connection) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- Prefetch (load for next page) -->
<link rel="prefetch" href="/services" />
```

#### **Lazy Loading**

**Images:**
```astro
<img loading="lazy" src="/image.jpg" alt="..." />
```

**Scripts:**
```astro
<script async src="https://analytics.com/script.js"></script>
```

**Iframes:**
```astro
<iframe loading="lazy" src="https://youtube.com/embed/..."></iframe>
```

#### **Critical CSS**

Astro automatically inlines critical CSS:
```js
// astro.config.mjs
build: {
  inlineStylesheets: 'auto', // Inlines small stylesheets
}
```

---

## 🧪 Testing Performance

### **Lighthouse (Chrome DevTools)**

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" + "Mobile"
4. Click "Analyze page load"

**Target Scores:**
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

### **PageSpeed Insights**

1. Go to https://pagespeed.web.dev/
2. Enter your URL
3. Analyze both Mobile and Desktop

**Key Metrics:**
- **FCP** (First Contentful Paint): <1.8s
- **LCP** (Largest Contentful Paint): <2.5s
- **TBT** (Total Blocking Time): <200ms
- **CLS** (Cumulative Layout Shift): <0.1
- **Speed Index**: <3.4s

### **WebPageTest**

1. Go to https://www.webpagetest.org/
2. Enter URL
3. Select location close to your target audience
4. Run test

**Check:**
- Time to First Byte (TTFB): <600ms
- Start Render: <1.5s
- Fully Loaded: <3s
- Total Requests: <50
- Total Size: <1MB

### **Real User Monitoring (RUM)**

**Google Analytics 4:**
```js
// Already tracking Core Web Vitals
gtag('config', 'GA_MEASUREMENT_ID', {
  // Automatically tracks FCP, LCP, CLS, FID
});
```

**Vercel Analytics:**
- Automatic for Vercel deployments
- Real user performance data
- Core Web Vitals tracking

---

## 📊 Performance Monitoring

### **Continuous Monitoring**

**1. Lighthouse CI** (automated testing)

```bash
npm install -g @lhci/cli

# Create config
# lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://your-domain.com'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};

# Run
lhci autorun
```

**2. Google Search Console**

- Monitor Core Web Vitals
- Get real-world performance data
- Track mobile usability

**3. Uptime Monitoring**

- UptimeRobot (free)
- Pingdom
- Monitor response times

---

## 🔧 Common Performance Issues & Fixes

### **Issue: Slow Image Loading**

**Solution:**
```bash
# Compress images
npm install -g imagemin-cli

imagemin public/images/*.jpg --out-dir=public/images/optimized --plugin=mozjpeg

# Or use online tools:
# - Squoosh.app
# - TinyPNG.com
# - ImageOptim (Mac)
```

### **Issue: Large Bundle Size**

**Check bundle:**
```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

**Reduce size:**
- Remove unused dependencies
- Use dynamic imports for heavy components
- Minimize custom JavaScript

### **Issue: Slow TTFB (Time to First Byte)**

**Solutions:**
- Use CDN (automatic on Vercel/Netlify)
- Enable edge caching
- Optimize server response (if using SSR)

### **Issue: Layout Shift (CLS)**

**Fix: Always specify image dimensions:**
```astro
<!-- ❌ Bad: No dimensions -->
<img src="/hero.jpg" alt="Hero" />

<!-- ✅ Good: Dimensions specified -->
<img src="/hero.jpg" alt="Hero" width="1200" height="630" />
```

**Fix: Reserve space for dynamic content:**
```css
/* Reserve space for content that loads later */
.skeleton {
  min-height: 200px;
}
```

### **Issue: Blocking Resources**

**Fix: Async/defer scripts:**
```html
<!-- ❌ Bad: Blocks rendering -->
<script src="analytics.js"></script>

<!-- ✅ Good: Doesn't block -->
<script async src="analytics.js"></script>
```

---

## 🎯 Optimization Priorities

### **High Priority (Do First)**

1. ✅ Optimize images (biggest impact)
2. ✅ Enable caching (already done)
3. ✅ Minimize JavaScript (Astro does this)
4. ✅ Use CDN (automatic on hosting platforms)

### **Medium Priority**

1. Optimize fonts (use font-display: swap)
2. Lazy load below-the-fold content
3. Preconnect to external domains
4. Compress HTML/CSS (already done)

### **Low Priority**

1. Optimize third-party scripts
2. Implement service worker (PWA)
3. Use resource hints (prefetch/preload)

---

## 📈 Expected Performance

With all optimizations:

**Desktop:**
- Load time: 0.5-1.5s
- Performance score: 98-100
- FCP: <0.8s
- LCP: <1.2s

**Mobile (4G):**
- Load time: 1.5-2.5s
- Performance score: 95-100
- FCP: <1.8s
- LCP: <2.5s

---

## 🛠️ Performance Toolkit

### **Compression Tools**
- **ImageOptim** (Mac): https://imageoptim.com/
- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/
- **SVGOMG**: https://jakearchibald.github.io/svgomg/

### **Testing Tools**
- **Lighthouse**: Chrome DevTools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/

### **Monitoring Tools**
- **Google Analytics 4**: Real user metrics
- **Vercel Analytics**: Performance monitoring
- **Lighthouse CI**: Automated testing
- **UptimeRobot**: Uptime monitoring

---

## 🎉 Summary

Your website is optimized for performance with:

✅ **Static Site Generation** - Pre-rendered HTML for instant loads
✅ **Zero JavaScript** - Only loads JS where needed
✅ **Image Optimization** - WebP format with lazy loading
✅ **Browser Caching** - 1-year cache for static assets
✅ **CDN Distribution** - Global edge caching
✅ **CSS Purging** - Only ships CSS you use
✅ **HTML Compression** - Minified output
✅ **Security Headers** - Performance + security

**Result: <3 second load times with 95+ Lighthouse scores**

Need help? Check README.md or DEPLOYMENT.md for more details.
