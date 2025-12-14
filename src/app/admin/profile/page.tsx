import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { saveFile } from '@/lib/upload'

async function updateProfile(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const fullName = formData.get('fullName') as string
    const headline = formData.get('headline') as string
    const bio = formData.get('bio') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const linkedinUrl = formData.get('linkedinUrl') as string
    const githubUrl = formData.get('githubUrl') as string
    const themeColor = formData.get('themeColor') as string
    const imageFile = formData.get('image') as File | null
    const logoFile = formData.get('logo') as File | null

    let imageUrl = undefined
    if (imageFile && imageFile.size > 0) {
        imageUrl = await saveFile(imageFile)
    }

    let logoUrl = undefined
    if (logoFile && logoFile.size > 0) {
        logoUrl = await saveFile(logoFile)
    }

    await (prisma as any).profile.update({
        where: { id },
        data: {
            fullName,
            headline,
            bio,
            email,
            phone,
            linkedinUrl,
            githubUrl,
            themeColor,
            imageUrl,
            logoUrl,
        },
    })

    revalidatePath('/', 'layout') // Revalidate layout to apply theme color
    revalidatePath('/contact')
    revalidatePath('/admin/profile')
}

import ProfileForm from '@/components/ProfileForm'

export default async function AdminProfile() {
    const profile = await prisma.profile.findFirst()

    if (!profile) return <div>No profile found. Seed DB first.</div>

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Profile</h1>
            <ProfileForm profile={profile} updateProfileAction={updateProfile} />
        </div>
    )
}
