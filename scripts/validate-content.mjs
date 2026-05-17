import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

function countWords(value) {
  return value.trim().split(/\s+/).filter(Boolean).length
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const contentPath = path.resolve(__dirname, '../src/data/content.json')

let checkedProjects = 0
let warnings = 0

try {
  const raw = await readFile(contentPath, 'utf8')
  const content = JSON.parse(raw)
  const projects = Array.isArray(content.projects) ? content.projects : []

  checkedProjects = projects.length

  const hasExtendedDescriptions = projects.some(project =>
    typeof project.cvDescription === 'string' || typeof project.labDescription === 'string',
  )

  if (!hasExtendedDescriptions) {
    console.log(
      'INFO: validate-content.mjs running in warn-only mode; cvDescription/labDescription not yet present in content.json',
    )
  }

  for (const project of projects) {
    const projectLabel = project.slug ?? project.name ?? 'unknown-project'

    for (const fieldName of ['cvDescription', 'labDescription']) {
      const value = project[fieldName]
      if (typeof value !== 'string') continue

      const wordCount = countWords(value)

      if (wordCount < 134) {
        warnings += 1
        console.log(
          `WARNING: ${projectLabel} ${fieldName} has ${wordCount} words; minimum target is 134.`,
        )
      }
    }
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.log(`WARNING: validate-content.mjs could not fully validate content.json: ${message}`)
}

console.log(`validate-content: ${checkedProjects} projects checked, ${warnings} warnings.`)
