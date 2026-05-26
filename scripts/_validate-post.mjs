export function validatePost(data, filename) {
  const fail = (field, reason) => {
    throw new Error(`${filename}:${field} — ${reason}`)
  }

  if (typeof data.title !== 'string' || data.title.trim() === '') {
    fail('title', 'must be a non-empty string')
  }

  if (typeof data.date !== 'string') {
    fail('date', 'must be a YYYY-MM-DD string')
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data.date)
  if (!dateMatch) {
    fail('date', 'must match YYYY-MM-DD')
  }

  const parsedDate = new Date(`${data.date}T00:00:00Z`)
  const [, year, month, day] = dateMatch
  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getUTCFullYear() !== Number(year) ||
    parsedDate.getUTCMonth() + 1 !== Number(month) ||
    parsedDate.getUTCDate() !== Number(day)
  ) {
    fail('date', 'must be a real calendar date')
  }

  const expectedSlug = filename.replace(/\.mdx$/, '')
  if (data.slug !== expectedSlug) {
    fail('slug', `must equal "${expectedSlug}"`)
  }

  if (typeof data.description !== 'string' || data.description.trim() === '') {
    fail('description', 'is required')
  }

  if (data.description.length > 160) {
    fail('description', 'must be 160 characters or fewer')
  }

  if (data.description.length < 50 || data.description.length > 155) {
    console.warn(
      `${filename}:description — recommended length is 50-155 characters (current: ${data.description.length})`,
    )
  }

  if (!Array.isArray(data.tags) || data.tags.length < 1 || data.tags.length > 5) {
    fail('tags', 'must be an array of 1-5 lowercase strings')
  }

  const hasInvalidTag = data.tags.some((tag) => (
    typeof tag !== 'string' ||
    tag.trim() === '' ||
    tag !== tag.toLowerCase()
  ))
  if (hasInvalidTag) {
    fail('tags', 'must be an array of 1-5 lowercase strings')
  }

  if (typeof data.draft !== 'boolean') {
    fail('draft', 'must be a boolean')
  }

  if (data.series !== undefined) {
    if (
      typeof data.series !== 'object' ||
      data.series === null ||
      Array.isArray(data.series)
    ) {
      fail('series', 'must be an object with name and order')
    }

    if (typeof data.series.name !== 'string' || data.series.name.trim() === '') {
      fail('series', 'name must be a non-empty string')
    }

    if (typeof data.series.order !== 'number' || Number.isNaN(data.series.order)) {
      fail('series', 'order must be a number')
    }
  }
}
