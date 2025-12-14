This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 Deployment (Ubuntu Server)

Follow these steps to deploy this portfolio on a dedicated Ubuntu server.

### 1. Prerequisites
Ensure your server has **Node.js 18+** installed.
```bash
# Update and install curl
sudo apt update && sudo apt install -y curl

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node -v
npm -v
```

### 2. Setup Project
```bash
# Clone your repository (or upload files)
git clone <your-repo-url>
cd myown_portfolio

# Install dependencies
npm install

# Setup Environment Variables
# Create a .env file and paste your keys (generated in development)
nano .env
# Paste: DATABASE_URL="file:./dev.db", SESSION_SECRET=..., TELEGRAM_BOT_TOKEN=..., etc.
```

### 3. Build for Production
```bash
# Initialize database (since we use SQLite)
npx prisma generate
npx prisma db push

# Build the Next.js app
npm run build
```

### 4. Run Permanently (PM2)
Use **PM2** to keep your site running in the background, even if you disconnect.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application
# --name "portfolio": Gives it a friendly name
# -- start: Tells npm to run the 'start' script
pm2 start npm --name "portfolio" -- start

# Check status
pm2 status

# Configure PM2 to auto-start on server reboot
pm2 startup
# (Run the command outputted by the previous step)
pm2 save
```

### 5. Updates
When you push new code to GitHub:
```bash
git pull origin main
npm install
npx prisma db push
npm run build
pm2 restart portfolio
```
