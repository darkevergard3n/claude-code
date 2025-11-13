# Quick Start Guide

Get your IT Vendor website up and running in 5 minutes.

## 🚀 Installation (2 minutes)

```bash
# 1. Navigate to project directory
cd it-vendor-website

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start development server
npm run dev
```

Visit: http://localhost:4321

**Done!** Your website is running locally.

---

## ✏️ Customize Content (5 minutes)

### 1. Update Company Information

**File: `src/components/Footer.astro`**

```astro
// Update these lines:
- Email: info@itvendor.com → your-email@company.com
- Phone: +1 (234) 567-890 → your-phone-number
- Address: 123 Tech Street... → your-address
- Social links: Update LinkedIn, Twitter, GitHub URLs
```

### 2. Update Homepage

**File: `src/pages/index.astro`**

```astro
// Update hero section:
- Company name
- Tagline
- Description
- Call-to-action text
```

### 3. Update Services

**File: `src/pages/services.astro`**

- Modify service descriptions
- Add/remove service offerings
- Update pricing (if applicable)

### 4. Update About Page

**File: `src/pages/about.astro`**

- Company story
- Team members
- Years in business
- Certifications

### 5. Add Your Logo

```bash
# Add logo to:
public/images/logo.png

# Then update references in:
src/components/Header.astro
src/components/Footer.astro
```

---

## 🖼️ Add Images (3 minutes)

### Required Images

1. **Logo** - `public/images/logo.png` (400x400px)
2. **OG Image** - `public/images/og-default.jpg` (1200x630px)
3. **Favicon** - Already included as SVG

### Optional Images

```bash
public/images/
  ├── team/           # Team member photos
  ├── services/       # Service illustrations
  └── hero.jpg        # Homepage hero image
```

**Image Guidelines:**
- Format: WebP or JPG
- Max size: 200KB per image
- Use descriptive filenames
- Optimize before uploading (use Squoosh.app)

---

## 🎨 Change Colors (2 minutes)

**File: `tailwind.config.mjs`**

```js
colors: {
  primary: {
    // Change these hex values to your brand colors
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',  // Darker shade
    700: '#1d4ed8',  // Even darker
  },
}
```

**Preview changes:**
Your dev server auto-refreshes - just save and see changes instantly.

---

## 📝 Update SEO (3 minutes)

### 1. Set Your Domain

**File: `astro.config.mjs`**

```js
export default defineConfig({
  site: 'https://your-domain.com', // ⚠️ Change this
});
```

### 2. Update Metadata

**File: `src/components/SEO.astro`**

```astro
// Update default values:
- Company name
- Default description
- Contact information
- Social media profiles
```

### 3. Add Google Analytics

**File: `.env`**

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Get your ID from: https://analytics.google.com

---

## 🚀 Deploy (2 minutes)

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# Done! Your site is live.
```

### Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Deploy
netlify deploy --prod

# Done! Your site is live.
```

### Option 3: GitHub + Vercel/Netlify

1. Push code to GitHub
2. Connect repository in Vercel/Netlify
3. Deploy automatically

**Total time: 2 minutes**

---

## ✅ Post-Launch Checklist

After deploying:

- [ ] Verify site loads at your domain
- [ ] Test all pages (Home, Services, About, Contact)
- [ ] Check mobile responsiveness
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics tracking
- [ ] Test contact form
- [ ] Run Lighthouse test (target: 95+ score)

---

## 🆘 Common Issues

### Port 4321 already in use

```bash
# Kill process on port 4321
npx kill-port 4321

# Or use different port
npm run dev -- --port 3000
```

### Images not showing

```bash
# Check images are in public/ folder
ls public/images/

# Verify path in code (must start with /)
<img src="/images/logo.png" alt="Logo" />
```

### Build errors

```bash
# Clear cache and rebuild
rm -rf node_modules .astro dist
npm install
npm run build
```

### Slow local development

```bash
# Disable file watching for node_modules
# Add to .gitignore:
node_modules/
```

---

## 📚 Next Steps

1. **Read full documentation**: Check `README.md`
2. **Optimize performance**: See `PERFORMANCE.md`
3. **Deploy guide**: Read `DEPLOYMENT.md`
4. **Customize further**: Explore Astro docs

---

## 🎯 Time Breakdown

- **Setup**: 2 minutes
- **Customize content**: 5 minutes
- **Add images**: 3 minutes
- **Update colors**: 2 minutes
- **Update SEO**: 3 minutes
- **Deploy**: 2 minutes

**Total: ~15-20 minutes to launch**

---

## 🤝 Need Help?

- **Astro Docs**: https://docs.astro.build
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Deployment Issues**: Check `DEPLOYMENT.md`
- **Performance Issues**: Check `PERFORMANCE.md`

---

**You're all set! 🎉**

Your website is:
- ✅ Fast (<3 second load time)
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Analytics ready
- ✅ Production ready

Enjoy your new website!
