/**
 * Tailwind CSS Configuration
 *
 * PURPOSE: Configures Tailwind's utility-first CSS framework for the VEXOIT website
 *
 * LEARNING: Tailwind CSS is different from traditional CSS. Instead of writing CSS rules,
 * you use pre-defined utility classes directly in your HTML:
 *
 * Traditional CSS:
 *   .button { background: blue; padding: 12px; border-radius: 8px; }
 *   <button class="button">Click me</button>
 *
 * Tailwind CSS:
 *   <button class="bg-blue-500 px-3 py-2 rounded-lg">Click me</button>
 *
 * Benefits:
 * - No CSS file to maintain
 * - Smaller bundle size (only ships classes you use)
 * - Consistent design system
 * - Faster development
 *
 * Learn more: https://tailwindcss.com/docs
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * CONTENT PATHS
   * Purpose: Tells Tailwind which files to scan for class names
   *
   * HOW IT WORKS:
   * 1. Tailwind scans these files during build
   * 2. Extracts all class names used (e.g., "bg-blue-500", "p-4")
   * 3. Generates CSS only for those classes
   * 4. Purges unused classes (this is why Tailwind CSS is so small!)
   *
   * Pattern breakdown:
   * - './src/**/*' = all files in src/ and subdirectories
   * - '{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}' = file extensions to scan
   *
   * IMPORTANT: If you add class names dynamically (e.g., from a CMS), they won't be detected!
   * Use safelist configuration for dynamic classes.
   *
   * Example impact:
   * - Without purging: 3.5 MB of CSS
   * - With purging: 10-15 KB of CSS (99.5% reduction!)
   */
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  /**
   * THEME CONFIGURATION
   * Purpose: Customize Tailwind's default design system
   */
  theme: {
    /**
     * EXTEND
     * Purpose: Add custom values while keeping Tailwind's defaults
     * Note: Using 'extend' means we keep all default Tailwind utilities
     * (like text-sm, p-4, etc.) and add our custom ones on top
     */
    extend: {
      /**
       * COLORS
       * Purpose: Define your brand color palette
       *
       * HOW TO USE:
       * - bg-primary-500    → background: #3b82f6
       * - text-primary-700  → color: #1d4ed8
       * - border-secondary-200 → border-color: #e2e8f0
       *
       * COLOR SCALE EXPLANATION:
       * - 50:  Lightest shade (backgrounds, hover states)
       * - 100-400: Light to medium shades
       * - 500: Base/default shade (your main brand color)
       * - 600-900: Dark to darkest shades (text, accents)
       * - 950: Extremely dark (almost black)
       *
       * WHY NUMBERED SCALES?
       * Provides consistency across your design. Instead of inventing names like
       * "light-blue", "medium-blue", "dark-blue", you have a predictable scale.
       */
      colors: {
        /**
         * PRIMARY COLORS
         * Purpose: Main brand colors (blues in this case)
         * Used for: Buttons, links, highlights, call-to-actions
         *
         * Examples:
         * - bg-primary-500: Main button background
         * - bg-primary-600: Button hover state
         * - text-primary-700: Headings
         */
        primary: {
          50: '#eff6ff',    // Very light blue (hover backgrounds)
          100: '#dbeafe',   // Light blue
          200: '#bfdbfe',   // Lighter blue
          300: '#93c5fd',   // Medium-light blue
          400: '#60a5fa',   // Medium blue
          500: '#3b82f6',   // Base blue (main brand color) ← Most commonly used
          600: '#2563eb',   // Darker blue (hover states)
          700: '#1d4ed8',   // Dark blue (active states)
          800: '#1e40af',   // Very dark blue
          900: '#1e3a8a',   // Almost black-blue
          950: '#172554',   // Darkest blue
        },

        /**
         * SECONDARY COLORS
         * Purpose: Neutral/gray scale
         * Used for: Text, backgrounds, borders, subtle UI elements
         *
         * Examples:
         * - text-secondary-900: Dark text (body copy)
         * - bg-secondary-50: Light backgrounds
         * - border-secondary-200: Light borders
         *
         * NAMING: Called "secondary" but these are actually your grays/neutrals
         */
        secondary: {
          50: '#f8fafc',    // Almost white (light backgrounds)
          100: '#f1f5f9',   // Very light gray
          200: '#e2e8f0',   // Light gray (borders)
          300: '#cbd5e1',   // Medium-light gray
          400: '#94a3b8',   // Medium gray (disabled states)
          500: '#64748b',   // Base gray
          600: '#475569',   // Dark gray (secondary text)
          700: '#334155',   // Darker gray
          800: '#1e293b',   // Very dark gray
          900: '#0f172a',   // Almost black (main text) ← Most commonly used for text
          950: '#020617',   // Pure black
        },
      },

      /**
       * FONT FAMILIES
       * Purpose: Define typography hierarchy
       *
       * HOW TO USE:
       * - font-sans    → Applied to body text (Inter font)
       * - font-display → Applied to headings (Poppins font)
       *
       * FALLBACK STRATEGY:
       * Each font has fallbacks in case the main font fails to load:
       * 1. Try to load 'Inter' from Google Fonts
       * 2. If that fails, use 'system-ui' (device's system font)
       * 3. If that fails, use generic 'sans-serif'
       *
       * WHY MULTIPLE FONTS?
       * - 'sans': Clean, readable font for body text
       * - 'display': Bolder, more impactful font for headings
       * This creates visual hierarchy and improves readability
       *
       * PERFORMANCE NOTE:
       * Loading custom fonts adds ~100ms to page load. We use:
       * - font-display: swap (shows system font first, then swaps to custom)
       * - Preconnect to fonts.googleapis.com (saves DNS lookup time)
       */
      fontFamily: {
        // Body text font
        sans: ['Inter', 'system-ui', 'sans-serif'],

        // Heading font (H1, H2, H3, etc.)
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      /**
       * OTHER CUSTOMIZATIONS
       * You can extend other properties too:
       *
       * spacing: { '128': '32rem' }  → p-128, m-128
       * borderRadius: { '4xl': '2rem' } → rounded-4xl
       * fontSize: { 'xxs': '0.65rem' } → text-xxs
       * screens: { '3xl': '1920px' } → 3xl:text-lg (breakpoint)
       *
       * Example:
       * extend: {
       *   spacing: {
       *     '128': '32rem',  // For extra-large padding/margins
       *   }
       * }
       */
    },
  },

  /**
   * PLUGINS
   * Purpose: Add additional Tailwind functionality via plugins
   *
   * Popular plugins:
   * - @tailwindcss/forms      → Better form styling
   * - @tailwindcss/typography → Prose styles for blog content
   * - @tailwindcss/aspect-ratio → Aspect ratio utilities
   *
   * Example:
   * plugins: [
   *   require('@tailwindcss/forms'),
   * ]
   *
   * For now, we don't need any plugins. Tailwind's built-in utilities are sufficient.
   */
  plugins: [],

  /**
   * HOW TAILWIND PROCESSES THIS CONFIG:
   *
   * 1. Development (npm run dev):
   *    ├─ Generates ALL Tailwind classes
   *    ├─ Hot reload on file changes
   *    ├─ Large CSS file (~3.5 MB) but only in dev
   *    └─ Fast rebuild (~50ms)
   *
   * 2. Production (npm run build):
   *    ├─ Scans content files for class names
   *    ├─ Generates only used classes
   *    ├─ Minifies CSS
   *    ├─ Result: 10-15 KB CSS file
   *    └─ Build time: ~2-3 seconds
   *
   * EXAMPLE OUTPUT:
   * Your code:     <div class="bg-primary-500 p-4">
   * Generated CSS: .bg-primary-500 { background-color: #3b82f6; }
   *                .p-4 { padding: 1rem; }
   */
};

/**
 * LEARNING TAILWIND:
 *
 * Common patterns:
 * - Spacing: p-4 (padding), m-4 (margin), gap-4 (grid/flex gap)
 * - Colors: bg-primary-500 (background), text-white (text color)
 * - Typography: text-lg (size), font-bold (weight)
 * - Layout: flex (flexbox), grid (grid), container
 * - Responsive: md:text-lg (medium screens and up)
 * - States: hover:bg-blue-600 (on hover)
 *
 * Responsive breakpoints (mobile-first):
 * - sm: 640px   → sm:text-lg  (tablets)
 * - md: 768px   → md:text-xl  (small laptops)
 * - lg: 1024px  → lg:text-2xl (desktops)
 * - xl: 1280px  → xl:text-3xl (large screens)
 * - 2xl: 1536px → 2xl:text-4xl (extra large)
 *
 * Example responsive design:
 * <div class="text-sm md:text-base lg:text-lg">
 *   Mobile: small text
 *   Tablet:  medium text
 *   Desktop: large text
 * </div>
 */
