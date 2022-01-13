import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { PostBase } from '../@types/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug<T>(slug: string, fields: (keyof T)[] = []): T {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key in keyof T]?: string
  }

  const item: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field.toString() === 'slug') {
      item[field] = realSlug
    }
    if (field.toString() === 'content') {
      item[field] = content
    }

    if (typeof data[field.toString()] !== 'undefined') {
      item[field] = data[field.toString()]
    }
  })

  return item as unknown as T
}

export function getAllPosts<T extends PostBase>(wantedFields: (keyof T)[]): T[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, wantedFields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    return posts
}
