
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params

    const post = await prisma.blog.findUnique({
        where: { slug },
    })

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-1" /> Back to Blog
            </Link>

            <header className="mb-10">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <Calendar size={14} />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
                    {post.title}
                </h1>

                {post.tags && (
                    <div className="flex gap-2">
                        {post.tags.split(',').map(tag => (
                            <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800/50">
                                <Tag size={12} /> {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Blog Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:underline">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    )
}
