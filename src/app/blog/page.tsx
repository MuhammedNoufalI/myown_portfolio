
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'

export default async function BlogList() {
    const posts = await prisma.blog.findMany({
        where: { published: true }, // Only show published
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>

            {posts.length === 0 ? (
                <div className="text-center text-gray-500 py-20 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-lg">No posts yet. Check back soon!</p>
                    <p className="text-sm mt-2">Admin needs to publish some content.</p>
                </div>
            ) : (
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                            <article className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all bg-white dark:bg-gray-900 h-full flex flex-col">
                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                    <Calendar size={14} />
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>

                                {post.excerpt && (
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-grow">
                                        {post.excerpt}
                                    </p>
                                )}

                                {post.tags && (
                                    <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                        {post.tags.split(',').map(tag => (
                                            <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400">
                                                <Tag size={10} /> {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        </Link>
                    ))}
                </div>
            )}

            <div className="mt-20 text-center">
                <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white underline">Back Home</a>
            </div>
        </div>
    )
}
