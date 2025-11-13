# Deployment Guide

This guide covers deploying your IT Vendor website to various hosting platforms with optimal performance and caching configurations.

## 🚀 Quick Deploy Options

### Vercel (Recommended - Easiest)

**Why Vercel?**
- Built by the creators of Next.js, optimized for modern frameworks
- Automatic HTTPS and CDN
- Zero configuration needed for Astro
- Free tier is generous
- Excellent performance

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/it-vendor-website.git
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Astro
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add `PUBLIC_SITE_URL=https://your-domain.vercel.app`
   - Add `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - Redeploy

4. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your domain
   - Update DNS records as instructed

**Done!** Your site is live with:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Caching headers from `vercel.json`
- ✅ Automatic rebuilds on git push

---

### Netlify (Alternative - Also Great)

**Why Netlify?**
- Excellent static site hosting
- Built-in form handling
- Free tier with generous limits
- Great developer experience

**Steps:**

1. **Push to GitHub** (same as Vercel)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add `PUBLIC_SITE_URL`
   - Add `PUBLIC_GA_MEASUREMENT_ID`
   - Redeploy

4. **Enable Contact Form (Optional)**
   - Netlify has built-in form handling
   - No backend needed!
   - See form integration section below

**Done!** Your site is live with:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Caching headers from `netlify.toml`
- ✅ Form handling built-in

---

### Cloudflare Pages

**Why Cloudflare Pages?**
- Fastest global CDN
- Unlimited bandwidth
- Free tier is very generous
- Best for high-traffic sites

**Steps:**

1. **Push to GitHub** (same as above)

2. **Deploy to Cloudflare Pages**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect to GitHub
   - Select your repository
   - Build settings:
     - Framework preset: Astro
     - Build command: `npm run build`
     - Build output: `dist`
   - Click "Save and Deploy"

3. **Add Environment Variables**
   - Go to Settings > Environment variables
   - Add your variables
   - Redeploy

---

## ⚙️ Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

### 1. Update Site Configuration

**File: `astro.config.mjs`**
```js
export default defineConfig({
  site: 'https://your-actual-domain.com', // ⚠️ UPDATE THIS
  // ...
});
```

### 2. Set Environment Variables

**File: `.env`** (don't commit this!)
```bash
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Update Company Information

- [ ] Company name in `src/components/Footer.astro`
- [ ] Contact email and phone in `src/components/Footer.astro`
- [ ] Social media links in `src/components/Footer.astro`
- [ ] Team members in `src/pages/about.astro`
- [ ] Service descriptions in `src/pages/services.astro`

### 4. Add Images

- [ ] Add company logo to `public/images/logo.png`
- [ ] Add OG image (1200x630) to `public/images/og-default.jpg`
- [ ] Add team photos to `public/images/team/`
- [ ] Add service images to `public/images/services/`

### 5. SEO & Analytics

- [ ] Update structured data in `src/components/SEO.astro`
- [ ] Set up Google Analytics and add Measurement ID
- [ ] Verify `robots.txt` allows indexing
- [ ] Update meta descriptions for all pages

### 6. Test Build Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4321` and test:
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Forms submit (if connected)
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔧 Post-Deployment Configuration

### 1. Verify Deployment

**Check these:**
- [ ] Site loads at your domain
- [ ] HTTPS is working (green lock icon)
- [ ] All pages are accessible
- [ ] Images load correctly
- [ ] No 404 errors

### 2. Test Performance

Use these tools:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

**Expected scores:**
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

### 3. Verify Caching

**Check HTTP headers:**

```bash
# Check cache headers
curl -I https://your-domain.com/assets/main.css

# Should see:
# Cache-Control: public, max-age=31536000, immutable
```

**Test with browser DevTools:**
1. Open DevTools > Network tab
2. Refresh page
3. Check "Size" column - should show "(disk cache)" on second load

### 4. Submit to Search Engines

**Google Search Console:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership (HTML tag method)
4. Submit sitemap: `https://your-domain.com/sitemap-index.xml`

**Bing Webmaster Tools:**
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

### 5. Set Up Analytics

**Google Analytics 4:**
1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Redeploy
5. Verify tracking with Real-time reports

---

## 🎯 Custom Domain Setup

### Vercel

1. **Add Domain**
   - Project Settings > Domains
   - Enter your domain
   - Click "Add"

2. **Update DNS**
   - Point A record to Vercel's IP: `76.76.21.21`
   - Or add CNAME: `cname.vercel-dns.com`
   - Wait for DNS propagation (up to 48 hours)

### Netlify

1. **Add Domain**
   - Site settings > Domain management
   - Add custom domain

2. **Update DNS**
   - Use Netlify's nameservers (recommended)
   - Or point A record to Netlify's load balancer

### Cloudflare Pages

1. **Add Custom Domain**
   - Pages project > Custom domains
   - Add your domain

2. **Update DNS** (if domain is on Cloudflare)
   - Automatic CNAME record created
   - If external, point to Cloudflare's provided address

---

## 📧 Contact Form Integration

### Option 1: Netlify Forms (Easiest if using Netlify)

**Update `src/pages/contact.astro`:**

```astro
<form name="contact" method="POST" netlify>
  <input type="hidden" name="form-name" value="contact" />
  <!-- rest of form fields -->
</form>
```

**That's it!** Netlify handles the rest.
- Submissions appear in Netlify dashboard
- Can set up email notifications
- Optional spam protection with reCAPTCHA

### Option 2: Formspree (Works Anywhere)

1. **Sign up** at [formspree.io](https://formspree.io)
2. **Create form**, get endpoint URL
3. **Update form action:**

```astro
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Free tier:** 50 submissions/month

### Option 3: Custom API (Advanced)

Create a serverless function (Vercel/Netlify Functions):

```js
// api/contact.js
export default async function handler(req, res) {
  // Handle form submission
  // Send email via SendGrid, AWS SES, etc.
}
```

Update fetch in `contact.astro` to call your API.

---

## 🔒 Security Best Practices

### 1. Environment Variables

**Never commit:**
- `.env` file
- API keys
- Secrets

**Always:**
- Use `.env.example` as template
- Add `.env` to `.gitignore`
- Set variables in hosting platform

### 2. Security Headers

Already configured in `vercel.json` and `netlify.toml`:
- ✅ X-Frame-Options (prevents clickjacking)
- ✅ X-Content-Type-Options (prevents MIME sniffing)
- ✅ X-XSS-Protection (XSS protection)
- ✅ Referrer-Policy (privacy)
- ✅ Permissions-Policy (feature restrictions)

### 3. HTTPS

- ✅ Automatic on Vercel, Netlify, Cloudflare
- Always enforce HTTPS (automatic on these platforms)

---

## 📊 Monitoring & Analytics

### Google Analytics 4

**Track:**
- Page views
- User behavior
- Traffic sources
- Conversions (form submissions)

**Set up Goals:**
1. GA4 > Configure > Events
2. Create custom events for:
   - Form submissions
   - Button clicks
   - Downloads

### Uptime Monitoring

**Free options:**
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://www.pingdom.com
- **Freshping**: https://www.freshworks.com/website-monitoring/

**Set up:**
1. Add your domain
2. Set check interval (5 minutes)
3. Configure email alerts

### Performance Monitoring

**Lighthouse CI** (automated performance testing):

```bash
npm install -g @lhci/cli

# Run Lighthouse
lhci autorun --upload.target=temporary-public-storage
```

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
- Node version (18+ required)
- Dependencies installed: `npm install`
- Build command: `npm run build`
- TypeScript errors: `npm run astro check`

**Common fixes:**
```bash
# Clear cache and reinstall
rm -rf node_modules .astro dist
npm install
npm run build
```

### Images Not Loading

**Check:**
- Images in `public/` folder
- Correct paths (e.g., `/images/logo.png`)
- File extensions (.jpg, .png, .svg)
- Case sensitivity (logo.PNG vs logo.png)

### Slow Performance

**Check:**
- Image sizes (compress large images)
- Caching headers enabled
- CDN working
- No render-blocking resources

**Optimize:**
- Compress images before upload
- Use WebP format
- Enable lazy loading
- Minimize custom JavaScript

### Forms Not Working

**Check:**
- Form action URL correct
- CORS headers (if using API)
- Network tab for errors
- Form service configured

---

## 📈 Scaling & Performance

### CDN & Caching

**Already configured:**
- Static assets: 1-year cache
- HTML: No cache (fresh content)
- Images: Optimized and cached

### Image Optimization

**Use Astro's built-in optimizer:**

```astro
---
import { Image } from 'astro:assets';
import hero from '../images/hero.jpg';
---

<Image src={hero} alt="Hero" format="webp" />
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Responsive images
- Lazy loading
- Proper sizing

### Load Testing

**Test with:**
- Apache Bench: `ab -n 1000 -c 10 https://your-domain.com/`
- k6: https://k6.io/
- Artillery: https://artillery.io/

---

## 🎉 You're Live!

Your website is now deployed with:
- ✅ <3 second load times
- ✅ SEO optimized
- ✅ Analytics tracking
- ✅ Responsive design
- ✅ Browser caching
- ✅ Image optimization
- ✅ Security headers
- ✅ Global CDN

**Next steps:**
1. Monitor analytics
2. Track performance metrics
3. Update content regularly
4. Test on different devices
5. Gather user feedback

**Need help?** Check the main README.md or platform documentation.
