
import { prisma } from '@/lib/prisma'
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react'

export default async function Journey() {
    const jobs = await prisma.job.findMany({
        orderBy: { startDate: 'desc' },
    })

    const certs = await prisma.certification.findMany({
        orderBy: { issueDate: 'desc' },
    })

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center">My Professional Journey</h1>

            <section className="mb-20">
                <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 border-b pb-4 border-gray-200 dark:border-gray-800">
                    <Briefcase className="text-blue-600" />
                    Experience
                </h2>

                <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 sm:ml-6 space-y-12">
                    {jobs.map((job) => (
                        <div key={job.id} className="ml-8 sm:ml-12 relative">
                            <span className="absolute -left-[41px] sm:-left-[59px] top-1 bg-blue-600 w-6 h-6 rounded-full border-4 border-white dark:border-black shadow-sm"></span>

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.position}</h3>
                                <span className="text-sm font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0 w-fit">
                                    {new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                                    {job.endDate ? new Date(job.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ' Present'}
                                </span>
                            </div>

                            <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                                {job.company}
                                {job.location && <span className="text-xs text-gray-400 font-normal flex items-center"><MapPin size={12} className="mr-1" />{job.location}</span>}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line leading-relaxed">
                                {job.description}
                            </p>

                            {job.technologies && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {job.technologies.split(/,|;/).map((tech, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md border border-blue-100 dark:border-blue-800/50">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 border-b pb-4 border-gray-200 dark:border-gray-800">
                    <Award className="text-amber-500" />
                    Certifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certs.map((cert) => (
                        <div key={cert.id} className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-500">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{cert.issuer}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Calendar size={14} />
                                    <span>Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="mt-20 text-center">
                <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white underline">Back Home</a>
            </div>
        </div>
    )
}
