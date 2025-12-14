
import { prisma } from '@/lib/prisma'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

export default async function Home() {
  const profile = await prisma.profile.findFirst()
  const certs = await prisma.certification.findMany({
    orderBy: { issueDate: 'desc' },
    take: 4
  })

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-blue-500 animate-pulse">Initializing System...</div>
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] pt-24">
      <main className="flex flex-col gap-12 items-center text-center max-w-4xl w-full">

        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt={profile.fullName}
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-2xl"
              />
            ) : (
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gray-800/50 flex items-center justify-center text-5xl font-bold text-gray-500">
                {profile.fullName.charAt(0)}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
              Hi, I'm <span className="">{profile.fullName}</span>
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-300 font-light">
              {profile.headline}
            </p>


            <div className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed text-left markdown-bio prose prose-invert prose-p:my-2 prose-a:text-blue-400 prose-strong:text-white">
              <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {profile.bio}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Link
            href="/journey"
            className="group relative px-8 py-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 flex items-center gap-2 transition-all"
          >
            View Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 rounded-full bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            Read Blog
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-linear-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            Contact
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mt-4 opacity-80 hover:opacity-100 transition-opacity">
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors transform hover:-translate-y-1">
              <Linkedin size={28} />
            </a>
          )}
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1">
              <Github size={28} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-red-400 transition-colors transform hover:-translate-y-1">
            <Mail size={28} />
          </a>
        </div>

        {/* Certifications Preview */}
        {certs.length > 0 && (
          <div className="w-full mt-16 pt-16 border-t border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-2xl font-bold mb-8 text-gray-200">Latest Certifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {certs.map(cert => (
                <div key={cert.id} className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-[#161b22] border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                  {cert.imageUrl ? (
                    <img src={cert.imageUrl} alt={cert.name} className="w-16 h-16 object-contain drop-shadow-md" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                      <span className="text-xs">No Img</span>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-semibold text-sm text-gray-200 group-hover:text-blue-400 transition-colors line-clamp-2">{cert.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="mt-24 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} {profile.fullName}. <span className="text-gray-700 mx-2">|</span> Built for the Cloud.</p>
      </footer>
    </div>
  );
}
