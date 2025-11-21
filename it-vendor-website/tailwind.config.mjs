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

/**
 * CONTENT PATHS
 * Tells Tailwind which files to scan for class names.


/**
 * THEME CONFIGURATION
 * Customizes Tailwind's default design system with brand colors and fonts.
 *
 * PRIMARY COLORS (Blues):
 * - 500: #3b82f6 - Main brand color
 * - 600: #2563eb - Hover states
 * - 700: #1d4ed8 - Active states
 *
 * SECONDARY COLORS (Grays):
 * - 900: #0f172a - Main text color
 * - 200: #e2e8f0 - Light borders
 * - 50: #f8fafc - Light backgrounds
 *
 * FONTS:
 * - sans: Inter - Body text
 * - display: Poppins - Headings
 */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },

  plugins: [],
};

/**
 * LEARNING TAILWIND:
 *
 * Common utility classes:
 * - Spacing: p-4 (padding), m-4 (margin), gap-4 (grid/flex gap)
 * - Colors: bg-primary-500 (background), text-white (text)
 * - Typography: text-lg (size), font-bold (weight)
 * - Layout: flex (flexbox), grid (grid), container
 * - Responsive: md:text-lg (medium screens and up)
 * - States: hover:bg-blue-600 (on hover)
 *
 * Responsive breakpoints (mobile-first):
 * - sm: 640px   - Tablets
 * - md: 768px   - Small laptops
 * - lg: 1024px  - Desktops
 * - xl: 1280px  - Large screens
 * - 2xl: 1536px - Extra large
 *
 * Example:
 * <div class="text-sm md:text-base lg:text-lg">
 *   Responsive text that grows with screen size
 * </div>
 *
 * HOW IT WORKS:
 * 1. Development: Generates all classes, large file but fast rebuild
 * 2. Production: Scans files, generates only used classes (10-15 KB)
 * 3. Result: 99.5% size reduction from development to production
 */