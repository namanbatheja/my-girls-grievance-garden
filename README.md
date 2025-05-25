# Our Little Garden - A Love Communication Portal

A beautiful, neon-themed web application for sharing thoughts, feelings, and little moments of love. This project was created to improve communication and strengthen relationships through a fun, interactive interface.

## Features

- 💭 Share thoughts and feelings in a safe, private space
- 🌱 Get immediate comforting responses
- 😊 Track mood changes over time
- 💝 Send quick, loving pick-me-ups
- 📧 Automatic email notifications

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an EmailJS account at https://www.emailjs.com/
4. Create a new email service and template in EmailJS
5. Copy your credentials and update them in `src/App.tsx`:
   ```typescript
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```

6. Add your photo:
   - Place your photo in `src/assets/gf-photo.jpg`
   - The photo should be square-shaped for best results

7. Start the development server:
   ```bash
   npm start
   ```

8. Build for production:
   ```bash
   npm run build
   ```

## Deployment

You can deploy this application to any static hosting service like Netlify, Vercel, or GitHub Pages.

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `build` directory to your chosen hosting service.

## Customization

You can customize the application by:
- Modifying the remedies and comfort messages in `src/App.tsx`
- Adjusting the color scheme in `tailwind.config.js`
- Updating the mood emojis in `src/App.tsx`

## Made with Love ❤️

This project was created with React, TypeScript, TailwindCSS, and lots of love. Remember, good communication is the key to any strong relationship! 