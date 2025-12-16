import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ExternalLink, Globe, Lock } from 'lucide-react'

// Helper to check if site is embeddable and fetch metadata
async function checkUrlInfo(url: string) {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0;)'
            },
            signal: controller.signal
        })
        clearTimeout(timeoutId)

        const xFrame = res.headers.get('x-frame-options')?.toLowerCase()
        const csp = res.headers.get('content-security-policy')?.toLowerCase()

        const isBlocked =
            xFrame === 'deny' ||
            xFrame === 'sameorigin' ||
            (csp && csp.includes('frame-ancestors') && !csp.includes('*'))

        // Try to get OG data if we have the body
        let ogImage = null
        let ogTitle = null
        let ogDesc = null

        if (res.ok) {
            try {
                const html = await res.text()
                const imgMatch = html.match(/property="og:image"\s+content="([^"]+)"/) || html.match(/name="twitter:image"\s+content="([^"]+)"/)
                const titleMatch = html.match(/property="og:title"\s+content="([^"]+)"/) || html.match(/<title>([^<]+)<\/title>/)
                const descMatch = html.match(/property="og:description"\s+content="([^"]+)"/) || html.match(/name="description"\s+content="([^"]+)"/)

                if (imgMatch) ogImage = imgMatch[1]
                if (titleMatch) ogTitle = titleMatch[1]
                if (descMatch) ogDesc = descMatch[1]
            } catch (e) {
                // Ignore parsing errors
            }
        }

        return { isEmbeddable: !isBlocked, ogImage, ogTitle, ogDesc }

    } catch (error) {
        console.error('Error fetching external site:', error)
        // If fetch fails, assume non-embeddable to be safe and show the nice card
        return { isEmbeddable: false, ogImage: null, ogTitle: null, ogDesc: null }
    }
}

export default async function DynamicShowcasePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const page = await prisma.externalPage.findUnique({
        where: { id }
    })

    if (!page) notFound()

    const { isEmbeddable, ogImage, ogTitle, ogDesc } = await checkUrlInfo(page.url)

    // Use fetched metadata or fallbacks
    const displayTitle = ogTitle || page.title
    const displayDesc = ogDesc || "Click below to visit the external website."

    return (
        <div className="min-h-screen bg-[#05010d] pt-24 flex flex-col items-center">
            <div className="w-full max-w-6xl px-4 sm:px-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">{page.title}</h1>
                        <a href={page.url} target="_blank" className="text-sm text-gray-500 hover:text-blue-400 flex items-center gap-1">
                            {page.url} <ExternalLink size={12} />
                        </a>
                    </div>
                </div>

                {isEmbeddable ? (
                    <div className="flex-1 w-full bg-[#120822] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 w-full h-8 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        </div>
                        <iframe
                            src={page.url}
                            className="w-full h-[calc(100%-2rem)] mt-8 bg-white"
                            title={page.title}
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                    </div>
                ) : (
                    <div className="flex-1 w-full flex items-center justify-center p-8">
                        <div className="max-w-xl w-full bg-[#120822] rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
                            {/* Background Glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 blur-[100px] group-hover:bg-blue-500/30 transition-all"></div>

                            {/* Preview Image if available */}
                            {ogImage && (
                                <div className="w-full h-48 mb-6 rounded-xl overflow-hidden relative">
                                    <img src={ogImage} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#120822] to-transparent"></div>
                                </div>
                            )}

                            <div className="relative z-10 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all">
                                    <Lock size={32} />
                                </div>

                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400 mb-2">
                                    {displayTitle}
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {displayDesc}
                                    <br />
                                    <span className="text-xs text-gray-600 mt-2 block">(This site prevents embedding in other portfolios)</span>
                                </p>

                                <a
                                    href={page.url}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all text-lg"
                                >
                                    Visit Website <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
