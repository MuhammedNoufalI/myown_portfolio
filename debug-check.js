const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    console.log('--- DIAGNOSTIC START ---')
    console.log('CWD:', process.cwd())

    // 1. Check Database
    const profile = await prisma.profile.findFirst()
    console.log('Profile Found:', profile ? 'Yes' : 'No')
    if (profile) {
        console.log('Profile ID:', profile.id)
        console.log('cvUrl:', profile.cvUrl)
        console.log('cvDisplayName:', profile.cvDisplayName)
        console.log('imageUrl:', profile.imageUrl)
    }

    // 1.5 Check Root 'uploads' symlink (Critical for Nginx)
    const rootUploads = path.join(process.cwd(), 'uploads')
    console.log('Root uploads path:', rootUploads)
    try {
        const stats = fs.lstatSync(rootUploads)
        console.log('Root uploads exists?', 'Yes')
        console.log('Is Symlink?', stats.isSymbolicLink() ? 'Yes' : 'No')
        console.log('Is Directory?', stats.isDirectory() ? 'Yes' : 'No')
        if (stats.isSymbolicLink()) {
            console.log('Symlink points to:', fs.readlinkSync(rootUploads))
        }
    } catch (e) {
        console.log('Root uploads exists?', 'NO (This is the problem!)')
    }

    // 2. Check Uploads Directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    console.log('Uploads Dir:', uploadsDir)

    if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir)
        console.log('Files in uploads:', files.length)
        console.log('Recent files:', files.slice(-5))
    } else {
        console.log('Uploads directory DOES NOT exist!')
    }

    if (profile && profile.cvUrl) {
        const fileUrl = `http://localhost:3021${profile.cvUrl}`
        console.log(`Checking HTTP access: ${fileUrl}`)
        try {
            const res = await fetch(fileUrl)
            console.log(`HTTP Status: ${res.status}`)
            console.log(`Content-Type: ${res.headers.get('content-type')}`)
        } catch (err) {
            console.error('HTTP Check Failed:', err.message)
        }
    }

    console.log('--- DIAGNOSTIC END ---')
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
