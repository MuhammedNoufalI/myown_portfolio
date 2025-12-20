#!/bin/bash

echo "--- 1. Backing up Database ---"
mv prisma/dev.db prisma/dev.db.bak 2>/dev/null || echo "No DB to backup or already moved"

echo "--- 2. Pulling Latest Code ---"
git pull

echo "--- 3. Restoring Database ---"
mv prisma/dev.db.bak prisma/dev.db 2>/dev/null || echo "No backup to restore"

echo "--- 4. Installing Dependencies ---"
npm install --production=false

echo "--- 5. Fixing Uploads Permission & Symlink ---"
# Create uploads folder if missing
mkdir -p public/uploads
# Set permissions so Nginx/Nextjs can read/write
chmod -R 777 public/uploads
# Create symlink for Nginx (tries both directions just in case)
ln -sf public/uploads uploads
ln -sf public/uploads .next/static/uploads

echo "--- 6. Building App ---"
npm run build

echo "--- 7. Restarting Server (Apply Middleware Fix) ---"
pm2 restart portfolio1

echo "--- DONE! Try the PDF link now. ---"
