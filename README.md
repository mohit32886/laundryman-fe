# Laundryman - Premium Laundry & Dry Cleaning Service Website

A modern, responsive React-based website for Laundryman, a premium laundry and dry cleaning service in Ranchi, India. Built with React, Vite, Tailwind CSS, and Framer Motion for smooth animations and excellent user experience.

## 🎯 Overview

Laundryman is a professional laundry and dry cleaning service offering world-class German eco-friendly solutions with Lagoon technology. This website provides customers with an easy way to book services, view pricing, learn about services, and get in touch.

**Live Website:** [laundryman.pro](https://laundryman.pro)

## ✨ Features

### Core Features
- **Service Booking**: Schedule laundry and dry cleaning pickups with a user-friendly form
- **B2B Services**: Dedicated section for corporate laundry solutions
- **Pricing Information**: Transparent pricing for all services
- **Store Locator**: Find nearby service locations
- **Blog Section**: Educational content about laundry care and services
- **Franchise Opportunities**: Information and inquiry form for franchise partnerships
- **Contact Forms**: Multiple contact options including callback requests

### User Experience
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **Accessibility**: WCAG-compliant components and semantic HTML
- **SEO Optimized**: Meta tags, structured data, and semantic markup

### Interactive Components
- **Floating Action Buttons**: Quick access to WhatsApp and phone calls
- **Modal Forms**: Pickup scheduling, B2B quotes, callback requests, and more
- **Testimonial Carousel**: Showcase customer reviews and ratings
- **Media Carousel**: Display service images and before/after photos
- **FAQ Section**: Expandable accordion for common questions

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Modern UI library
- **Vite 7.1.7** - Next-generation frontend tooling
- **React Router DOM 7.9.5** - Client-side routing
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
laundryman-fe/
├── public/                 # Static assets
│   ├── logo.png
│   ├── laundryman2.png
│   └── *.png              # Service images
├── src/
│   ├── components/        # Reusable React components
│   │   ├── B2BQuoteModal.jsx
│   │   ├── BlogModal.jsx
│   │   ├── CallbackModal.jsx
│   │   ├── FloatingActionButtons.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── MediaCarousel.jsx
│   │   ├── Navbar.jsx
│   │   ├── PickupModal.jsx
│   │   ├── TermsModal.jsx
│   │   └── TestimonialCarousel.jsx
│   ├── config/            # Configuration files
│   │   ├── colors.js       # Brand color definitions
│   │   ├── contact.js      # Contact information
│   │   ├── fonts.js        # Typography configuration
│   │   └── README.md       # Config documentation
│   ├── pages/              # Page components
│   │   ├── AboutUs.jsx
│   │   ├── B2BServices.jsx
│   │   ├── Blogs.jsx
│   │   ├── ContactUs.jsx
│   │   ├── GetFranchise.jsx
│   │   ├── Home.jsx
│   │   ├── Pricing.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Services.jsx
│   │   ├── StoreLocator.jsx
│   │   └── TermsAndConditions.jsx
│   ├── services/           # API and external services
│   │   ├── callbackService.js
│   │   └── googleSheetsService.js
│   ├── utils/              # Utility functions
│   │   ├── classNames.js   # Tailwind class generators
│   │   └── fonts.js        # Font utility functions
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global app styles
│   ├── index.css           # Global styles and CSS variables
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn**/**pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laundryman-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_SCRIPT_URL=your_google_apps_script_url_here
   ```
   
   > **Note**: The Google Apps Script URL is optional. If not provided, form submissions will log to console in development mode. See `GOOGLE_APPS_SCRIPT.md` for setup instructions.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot module replacement |
| `npm run build` | Build production-ready optimized bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## ⚙️ Configuration

### Color Configuration

All brand colors are centralized in `src/config/colors.js`. To change colors across the entire website:

1. Edit `src/config/colors.js`
2. Update corresponding CSS variables in `src/index.css`
3. Use utility functions from `src/utils/classNames.js` in components

**Example:**
```javascript
import { bgColor, textColor } from '../utils/classNames'

<button className={`${bgColor('primary')} ${textColor('white')}`}>
  Click me
</button>
```

### Font Configuration

Typography is configured in `src/config/fonts.js`. To change fonts:

1. Edit `src/config/fonts.js`
2. Update Google Fonts link in `index.html` (if using web fonts)
3. Update CSS variables in `src/index.css`
4. Use utility functions from `src/utils/fonts.js`

**Example:**
```javascript
import { headingClasses } from '../utils/fonts'

<h1 className={headingClasses('h1')}>
  Main Heading
</h1>
```

### Contact Information

Contact details are centralized in `src/config/contact.js`. Update phone numbers and WhatsApp links in one place:

```javascript
export const contactInfo = {
  whatsapp: {
    order: '919006468666',
  },
  phone: {
    support: '+919006463666',
  },
  // ...
}
```

See `src/config/README.md` for detailed configuration documentation.

## 🔌 Google Sheets Integration

The website integrates with Google Sheets for form submissions using Google Apps Script. Forms submit data to:
- Callback requests
- B2B quote inquiries
- Pickup scheduling
- Franchise inquiries
- Contact form submissions

**Setup Instructions:**
1. See `GOOGLE_APPS_SCRIPT.md` for detailed setup
2. Deploy Google Apps Script as a web app
3. Add the web app URL to `.env` as `VITE_GOOGLE_SCRIPT_URL`

## 🎨 Styling Guidelines

### Tailwind CSS

This project uses Tailwind CSS 4.x with a custom configuration. Key principles:

- **Use utility classes** for styling
- **Use color utilities** from `src/utils/classNames.js` instead of hardcoding colors
- **Use font utilities** from `src/utils/fonts.js` for typography
- **Follow mobile-first** responsive design patterns

### CSS Variables

Global CSS variables are defined in `src/index.css` and synced with config files:
- Color variables (e.g., `--color-primary`)
- Font variables (e.g., `--font-primary`)

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with hero, services overview, testimonials |
| `/services` | `Services` | Detailed service offerings |
| `/b2b-services` | `B2BServices` | Corporate laundry solutions |
| `/pricing` | `Pricing` | Service pricing information |
| `/store-locator` | `StoreLocator` | Find nearby locations |
| `/blogs` | `Blogs` | Blog posts and articles |
| `/get-franchise` | `GetFranchise` | Franchise opportunity information |
| `/contact-us` | `ContactUs` | Contact form and information |
| `/about-us` | `AboutUs` | Company information and story |
| `/privacy-policy` | `PrivacyPolicy` | Privacy policy page |
| `/terms-and-conditions` | `TermsAndConditions` | Terms and conditions page |

## 🧩 Key Components

### Layout Components
- **`Layout.jsx`**: Main layout wrapper with Navbar, Footer, and FloatingActionButtons
- **`Navbar.jsx`**: Responsive navigation bar
- **`Footer.jsx`**: Site footer with links and contact info

### Modal Components
- **`PickupModal.jsx`**: Schedule a pickup form
- **`B2BQuoteModal.jsx`**: Request B2B service quote
- **`CallbackModal.jsx`**: Request callback form
- **`BlogModal.jsx`**: Blog post detail modal
- **`TermsModal.jsx`**: Terms and conditions modal

### Feature Components
- **`FloatingActionButtons.jsx`**: WhatsApp and phone call buttons
- **`TestimonialCarousel.jsx`**: Customer testimonials slider
- **`MediaCarousel.jsx`**: Image carousel for galleries

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

The `dist/` folder can be deployed to:
- **Vercel** (recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any static hosting service**

### Environment Variables

Make sure to set `VITE_GOOGLE_SCRIPT_URL` in your hosting platform's environment variables.

## 🔍 SEO & Performance

### SEO Features
- Semantic HTML structure
- Meta tags for social sharing
- Structured data (JSON-LD) ready
- Sitemap generation ready
- Mobile-responsive design

### Performance Optimizations
- Code splitting with React Router
- Image optimization (use WebP format)
- Lazy loading for images
- Minified production builds
- Fast Vite build times

## 🐛 Troubleshooting

### Common Issues

**Issue**: Forms not submitting
- **Solution**: Check that `VITE_GOOGLE_SCRIPT_URL` is set correctly in `.env`

**Issue**: Colors not updating
- **Solution**: Ensure both `src/config/colors.js` and `src/index.css` CSS variables are updated

**Issue**: Build fails
- **Solution**: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Issue**: Port already in use
- **Solution**: Vite will automatically use the next available port, or specify: `npm run dev -- --port 3000`

## 📝 Code Style

- Use functional components with hooks
- Follow React best practices
- Use ESLint for code quality
- Write descriptive component and variable names
- Add comments for complex logic

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions or issues:
- **Website**: [laundryman.pro](https://laundryman.pro)
- **WhatsApp**: +91 9006468666
- **Phone**: +91 9006463666

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for optimal user experience
- Optimized for Indian market preferences (WhatsApp integration, mobile-first)

---

**Made with ❤️ for Laundryman**
