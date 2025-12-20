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

    console.log('--- DIAGNOSTIC END ---')
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
