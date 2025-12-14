
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// --- Jobs ---

export async function createJob(formData: FormData) {
    const company = formData.get('company') as string
    const position = formData.get('position') as string
    const startDate = new Date(formData.get('startDate') as string)
    const endDateRaw = formData.get('endDate') as string
    const endDate = endDateRaw ? new Date(endDateRaw) : null
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const technologies = formData.get('technologies') as string

    await prisma.job.create({
        data: {
            company,
            position,
            startDate,
            endDate,
            description,
            location,
            technologies,
        },
    })

    revalidatePath('/journey')
    revalidatePath('/admin/jobs')
    redirect('/admin/jobs')
}

export async function updateJob(id: string, formData: FormData) {
    const company = formData.get('company') as string
    const position = formData.get('position') as string
    const startDate = new Date(formData.get('startDate') as string)
    const endDateRaw = formData.get('endDate') as string
    const endDate = endDateRaw ? new Date(endDateRaw) : null
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const technologies = formData.get('technologies') as string

    await prisma.job.update({
        where: { id },
        data: {
            company,
            position,
            startDate,
            endDate,
            description,
            location,
            technologies,
        },
    })

    revalidatePath('/journey')
    revalidatePath('/admin/jobs')
    redirect('/admin/jobs')
}

export async function deleteJob(id: string) {
    await prisma.job.delete({ where: { id } })
    revalidatePath('/journey')
    revalidatePath('/admin/jobs')
}

// --- Blogs ---

export async function createBlog(formData: FormData) {
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string // Markdown
    const excerpt = formData.get('excerpt') as string
    const tags = formData.get('tags') as string

    await prisma.blog.create({
        data: {
            title,
            slug,
            content,
            excerpt,
            tags,
            published: true // auto publish for now
        }
    })

    revalidatePath('/blog')
    revalidatePath('/admin/blogs')
    redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string
    const tags = formData.get('tags') as string

    await prisma.blog.update({
        where: { id },
        data: {
            title,
            slug,
            content,
            excerpt,
            tags,
        }
    })

    revalidatePath('/blog')
    revalidatePath('/admin/blogs')
    redirect('/admin/blogs')
}

export async function deleteBlog(id: string) {
    await prisma.blog.delete({ where: { id } })
    revalidatePath('/blog')
    revalidatePath('/admin/blogs')
}
