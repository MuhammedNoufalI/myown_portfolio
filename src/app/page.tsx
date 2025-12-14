
import { prisma } from '@/lib/prisma'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const profile = await prisma.profile.findFirst()

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Loading... or No Profile Found. Seed the DB!</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center max-w-2xl">
        <div className="flex flex-col items-center gap-4">
          {/* Placeholder for Image - use a nice avatar style */}
          <div className="w-32 h-32 rounded-full bg-linear-to-tr from-blue-500 to-teal-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {profile.fullName.charAt(0)}
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">{profile.fullName}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            {profile.headline}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
            {profile.bio.substring(0, 150)}...
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center flex-wrap">
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-600 transition-colors">
              <Linkedin size={24} />
            </a>
          )}
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github size={24} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} className="p-2 hover:text-red-500 transition-colors">
            <Mail size={24} />
          </a>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row mt-4">
          <Link
            href="/journey"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 font-semibold shadow-md"
          >
            View My Journey
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-solid border-gray-300 dark:border-gray-700 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
          >
            Contact Me
          </Link>
        </div>
      </main>

      <footer className="mt-24 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} {profile.fullName}. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}
