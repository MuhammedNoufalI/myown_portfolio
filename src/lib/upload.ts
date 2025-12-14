
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    try {
        await mkdir(uploadDir, { recursive: true })
    } catch (error) {
        // Ignore error if directory already exists
    }

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.name.split('.').pop()
    const filename = `${uniqueSuffix}.${ext}`
    const filepath = join(uploadDir, filename)

    // Write file
    await writeFile(filepath, buffer)

    // Return public URL
    return `/uploads/${filename}`
}
