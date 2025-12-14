
import { Mail, Linkedin, Github } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function Contact() {
    const profile = await prisma.profile.findFirst()

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Get In Touch</h1>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-lg mb-12">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Contact Details</h2>

                        <div className="space-y-6">
                            <a href={`mailto:${profile?.email}`} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                                    <p className="font-medium">{profile?.email}</p>
                                </div>
                            </a>

                            {profile?.linkedinUrl && (
                                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <Linkedin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">LinkedIn</p>
                                        <p className="font-medium">Connect with me</p>
                                    </div>
                                </a>
                            )}

                            {profile?.githubUrl && (
                                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                                        <Github size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">GitHub</p>
                                        <p className="font-medium">Follow my work</p>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Form - Placeholder functionality for now or server action later */}
                <form className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                        <input type="text" id="name" className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                        <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 transition-colors" placeholder="Hello..." />
                    </div>
                    <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md">
                        Send Message
                    </button>
                </form>
            </div>

            <div className="mt-20 text-center">
                <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white underline">Back Home</a>
            </div>
        </div>
    )
}
