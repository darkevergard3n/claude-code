/**
 * Astro Configuration File
 *
 * PURPOSE: This file configures how Astro builds your website. It controls:
 * - Site URL (used for sitemap and canonical URLs)
 * - Integrations (plugins that add features)
 * - Build optimizations (compression, minification)
 * - Vite configuration (the build tool Astro uses)
 *
 * LEARNING: Think of this as the "settings" file for your entire website build process.
 * Changes here affect how your website is generated, optimized, and deployed.
 *
 * Learn more: https://docs.astro.build/en/reference/configuration-reference/
 */

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Export default configuration
// https://astro.build/config
export default defineConfig({
  /**
   * SITE URL
   * Purpose: Your website's production URL
   * Used for:
   * - Generating absolute URLs in sitemap
   * - Creating canonical URLs for SEO
   * - Open Graph and Twitter Card URLs
   *
   * IMPORTANT: Update this with your actual domain before deployment
   */
  site: 'https://your-domain.com',

  /**
   * INTEGRATIONS
   * Purpose: Plugins that add functionality to Astro
   * Think of these as "power-ups" for your website
   */
  integrations: [
    /**
     * TAILWIND CSS INTEGRATION
     * Purpose: Enables Tailwind utility-first CSS framework
     * Benefits:
     * - Rapid development with utility classes
     * - Automatic CSS purging (only ships CSS you use)
     * - Consistent design system
     * - No need to write custom CSS files
     */
    tailwind(),

    /**
     * SITEMAP INTEGRATION
     * Purpose: Automatically generates XML sitemap for search engines
     * The sitemap tells search engines:
     * - What pages exist on your site
     * - How often they change
     * - How important each page is
     *
     * Configuration:
     * - changefreq: How often pages change ('weekly' for business sites)
     * - priority: Page importance (0.0 to 1.0, 0.7 is good default)
     * - lastmod: Last modification date (set to build time)
     *
     * Generated file: /sitemap-index.xml
     * Submit to: Google Search Console and Bing Webmaster Tools
     */
    sitemap({
      changefreq: 'weekly',      // Pages change weekly (reasonable for business sites)
      priority: 0.7,             // Default priority (0.5-0.8 is typical)
      lastmod: new Date(),       // Set to current build time
    }),
  ],

  /**
   * BUILD CONFIGURATION
   * Purpose: Controls how Astro builds your production site
   */
  build: {
    /**
     * INLINE STYLESHEETS
     * Purpose: Determines when to inline CSS vs external file
     * Options:
     * - 'auto': Astro decides based on size (best option)
     * - 'always': Always inline (fewer HTTP requests)
     * - 'never': Always external (better caching)
     *
     * 'auto' is optimal: inlines small CSS, externalizes large files
     */
    inlineStylesheets: 'auto',
  },

  /**
   * COMPRESS HTML
   * Purpose: Removes whitespace and comments from HTML output
   * Benefits:
   * - Smaller file sizes (typically 10-30% reduction)
   * - Faster page loads
   * - Reduced bandwidth usage
   *
   * Example: '<div>  <h1>Title</h1>  </div>' becomes '<div><h1>Title</h1></div>'
   */
  compressHTML: true,

  /**
   * VITE CONFIGURATION
   * Purpose: Configures Vite, the build tool that Astro uses under the hood
   * Vite is responsible for:
   * - Bundling JavaScript
   * - Minifying code
   * - Optimizing assets
   *
   * Learn more: https://vitejs.dev/config/
   */
  vite: {
    build: {
      /**
       * CSS MINIFICATION
       * Purpose: Removes unnecessary characters from CSS
       * Example: 'color: blue;' might become 'color:#00f'
       * Result: Smaller CSS files, faster loading
       */
      cssMinify: true,

      /**
       * JAVASCRIPT MINIFICATION
       * Purpose: Compresses JavaScript code
       * Terser is the minifier used (industry standard)
       * Benefits:
       * - Removes comments and whitespace
       * - Shortens variable names
       * - Optimizes code structure
       * - Typically reduces JS size by 50-70%
       */
      minify: 'terser',

      /**
       * ROLLUP OPTIONS
       * Purpose: Configure Rollup, the bundler Vite uses
       */
      rollupOptions: {
        output: {
          /**
           * MANUAL CHUNKS
           * Purpose: Controls how JavaScript is split into files
           * Setting to undefined lets Vite decide automatically
           *
           * Why?: For small sites, one bundle is optimal
           * Large sites might benefit from code splitting (vendor chunks, etc.)
           */
          manualChunks: undefined,
        },
      },
    },
  },
});
