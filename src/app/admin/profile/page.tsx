
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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
    const imageUrl = formData.get('imageUrl') as string

    await prisma.profile.update({
        where: { id },
        data: {
            fullName,
            headline,
            bio,
            email,
            phone,
            linkedinUrl,
            githubUrl,
            imageUrl,
        },
    })

    revalidatePath('/')
    revalidatePath('/contact')
    revalidatePath('/admin/profile')
}

export default async function AdminProfile() {
    const profile = await prisma.profile.findFirst()

    if (!profile) return <div>No profile found. Seed DB first.</div>

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

            <form action={updateProfile} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <input type="hidden" name="id" value={profile.id} />

                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                    <input name="imageUrl" type="url" defaultValue={profile.imageUrl || ''} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" placeholder="https://example.com/me.jpg" />
                    <p className="text-xs text-gray-500 mt-1">Provide a direct link to your photo.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input name="fullName" type="text" defaultValue={profile.fullName} required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Headline</label>
                    <input name="headline" type="text" defaultValue={profile.headline} required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea name="bio" defaultValue={profile.bio} required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input name="email" type="email" defaultValue={profile.email} required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input name="phone" type="text" defaultValue={profile.phone || ''} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                        <input name="linkedinUrl" type="url" defaultValue={profile.linkedinUrl || ''} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                        <input name="githubUrl" type="url" defaultValue={profile.githubUrl || ''} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Save Profile</button>
                </div>
            </form>
        </div>
    )
}
