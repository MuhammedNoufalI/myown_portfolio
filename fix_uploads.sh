#!/bin/bash
# Fix uploads directory structure for CloudPanel/Nginx

echo "--- STARTING UPLOAD FIX ---"

# 1. Ensure public/uploads exists (Next.js standard)
if [ ! -d "public/uploads" ]; then
    mkdir -p public/uploads
    echo "Created public/uploads directory."
fi

# 2. Check the 'uploads' alias in the root
if [ -L "uploads" ]; then
    echo "OK: 'uploads' is already a symlink."
    ls -l uploads
elif [ -d "uploads" ]; then
    echo "WARNING: 'uploads' is a real directory, not a symlink."
    echo "Moving files from root 'uploads' to 'public/uploads'..."
    mv uploads/* public/uploads/ 2>/dev/null
    rmdir uploads
    echo "Removed root 'uploads' directory."
    
    ln -s public/uploads uploads
    echo "FIXED: Created symlink uploads -> public/uploads"
elif [ -e "uploads" ]; then
    echo "ERROR: 'uploads' exists but is not a directory or symlink."
else
    ln -s public/uploads uploads
    echo "FIXED: Created symlink uploads -> public/uploads"
fi

echo "--- VERIFICATION ---"
echo "Public Uploads items:"
ls public/uploads | head -n 3
echo "Symlink Check:"
ls -ld uploads

echo "--- DONE ---"
