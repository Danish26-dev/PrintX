# 🚀 Local Setup Guide for PrintX

This guide will help you run the PrintX app on your local machine.

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

---

## 🎯 Current Setup: Create React App (CRA)

The project is currently configured with **Create React App**. Follow these steps:

### 1. Download the Code

Download the `/app/frontend` folder from Emergent to your local machine.

### 2. Install Dependencies

```bash
cd frontend
yarn install
# or
npm install
```

### 3. Update index.html (Optional)

Replace `public/index.html` with `index-local.html` for a cleaner version:

```bash
cp index-local.html public/index.html
```

This removes Emergent-specific scripts and badges.

### 4. Run Development Server

```bash
yarn start
# or
npm start
```

The app will open at `http://localhost:3000`

### 5. Build for Production

```bash
yarn build
# or
npm run build
```

---

## ⚡ Alternative: Migrate to Vite (Recommended)

Vite is faster than CRA. If you want to switch:

### 1. Install Vite

```bash
yarn add -D vite @vitejs/plugin-react
# or
npm install -D vite @vitejs/plugin-react
```

### 2. Create vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
```

### 3. Update package.json Scripts

Replace the `scripts` section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 4. Rename Entry File

If you have `src/index.js`, rename it to `src/main.jsx`:

```bash
mv src/index.js src/main.jsx
```

### 5. Update index.html

Move `public/index.html` to root and add the script tag:

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PrintX | Autonomous Printing</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
    </body>
</html>
```

### 6. Run with Vite

```bash
yarn dev
# or
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file in the frontend folder:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

For Vite, use:

```env
VITE_BACKEND_URL=http://localhost:8001
```

And update your code to use `import.meta.env.VITE_BACKEND_URL` instead of `process.env.REACT_APP_BACKEND_URL`.

---

## 🎨 Features Included

✅ Landing page with Spline 3D animation
✅ Workspace with chat interface
✅ Shopkeeper login & dashboard
✅ Document editing with PDF preview
✅ LLM-style streaming responses
✅ Print flow with confirmation
✅ Indian rupee pricing (₹35)
✅ Premium dark theme UI

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors

```bash
# Clear build cache
rm -rf build .next
yarn build
```

---

## 📦 Production Deployment

### Using Vercel

```bash
vercel deploy
```

### Using Netlify

```bash
netlify deploy --prod
```

### Manual Deployment

```bash
yarn build
# Upload the 'build' folder to your hosting
```

---

## 🎯 Quick Start Summary

**For CRA (Current Setup):**
```bash
cd frontend
yarn install
yarn start
```

**For Vite (After Migration):**
```bash
cd frontend
yarn add -D vite @vitejs/plugin-react
# Follow migration steps above
yarn dev
```

---

## 📞 Need Help?

- Check the React documentation: https://react.dev
- Vite documentation: https://vitejs.dev
- CRA documentation: https://create-react-app.dev

---

**Happy Coding! 🚀**
